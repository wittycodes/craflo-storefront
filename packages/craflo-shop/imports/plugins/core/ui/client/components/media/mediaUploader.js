import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";
import decodeOpaqueId from "@reactioncommerce/api-utils/decodeOpaqueId.js";
import { useMutation } from "@apollo/react-hooks";
import Button from "@reactioncommerce/catalyst/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { FileRecord } from "@reactioncommerce/file-collections";
import { registerComponent } from "@reactioncommerce/reaction-components";
import _ from "lodash";
import { i18next, Logger } from "/client/api";
import { styled } from 'baseui';
import { UploadIcon } from '/imports/client/ui/pb/assets/icons/UploadIcon';

const Text = styled('span', ({ $theme }) => ({
  ...$theme.typography.font14,
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.textDark,
  marginTop: '15px',
  textAlign: 'center',
}));

const TextHighlighted = styled('span', ({ $theme }) => ({
  color: $theme.colors.primary,
  fontWeight: 'bold',
}));

const Container = styled('div', ({ props }) => ({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px',
  borderWidth: '2px',
  borderRadius: '2px',
  borderColor: '#E6E6E6',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border 0.24s ease-in-out',
  cursor: 'pointer',
}));

const ThumbsContainer = styled('aside', () => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: '16px',
}));

const Thumb = styled('div', ({ $theme }) => ({
  ...$theme.borders.borderEA,
  display: 'inline-flex',
  borderRadius: '2px',
  marginBottom: '8px',
  marginRight: '8px',
  width: '100px',
  height: '100px',
  padding: '4px',
  boxSizing: 'border-box',
}));

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

// function Uploader({ onChange, imageURL }: any) {
//   const [files, setFiles] = useState(
//     imageURL ? [{ name: 'demo', preview: imageURL }] : []
//   );
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: 'image/*',
//     multiple: false,
//     onDrop: useCallback(
//       (acceptedFiles) => {
//         setFiles(
//           acceptedFiles.map((file) =>
//             Object.assign(file, {
//               preview: URL.createObjectURL(file),
//             })
//           )
//         );
//         onChange(acceptedFiles);
//       },
//       [onChange]
//     ),
//   });
//
//   const thumbs = files.map((file) => (
//     <Thumb key={file.name}>
//       <div style={thumbInner}>
//         <img src={file.preview} style={img} alt={file.name} />
//       </div>
//     </Thumb>
//   ));
//
//   useEffect(
//     () => () => {
//       // Make sure to revoke the data uris to avoid memory leaks
//       files.forEach((file) => URL.revokeObjectURL(file.preview));
//     },
//     [files]
//   );
//
//   return (
//     <section className='container uploader'>
//       <Container {...getRootProps()}>
//         <input {...getInputProps()} />
//         <UploadIcon />
//         <Text>
//           <TextHighlighted>Drag/Upload</TextHighlighted> your image here.
//         </Text>
//       </Container>
//       {thumbs && <ThumbsContainer>{thumbs}</ThumbsContainer>}
//     </section>
//   );
// }
//
// export default Uploader;





const createMediaRecordMutation = gql`
  mutation CreateMediaRecord($input: CreateMediaRecordInput!) {
    createMediaRecord(input: $input) {
      mediaRecord {
        _id
      }
    }
  }
`;

/**
 * MediaUploader
 * @param {Object} props Component props
 * @returns {Node} React component
 */
function MediaUploader(props) {
  const { canUploadMultiple, metadata, onError, onFiles, refetchProduct, shopId } = props;

  const [isUploading, setIsUploading] = useState(false);
  const [createMediaRecord] = useMutation(createMediaRecordMutation, { ignoreResults: true });

  const uploadFiles = (acceptedFiles) => {
    const filesArray = Array.from(acceptedFiles);
    setIsUploading(true);

    const promises = filesArray.map(async (browserFile) => {
      const fileRecord = FileRecord.fromFile(browserFile);

      if (metadata) {
        if (typeof metadata === "function") {
          fileRecord.metadata = metadata();
        } else {
          fileRecord.metadata = metadata;
        }
      }

      await fileRecord.upload();

      // We insert only AFTER the server has confirmed that all chunks were uploaded
      return createMediaRecord({
        variables: {
          input: {
            mediaRecord: fileRecord.document,
            shopId
          }
        }
      });
    });


    Promise.all(promises)
      .then((responses) => {
        // NOTE: This is a temporary workaround due to the fact that on the server,
        // the sharp library generates product images in an async manner.
        // A better solution would be to use subscriptions
        const uploadedMediaIds = responses.map((response) => response.data.createMediaRecord.mediaRecord._id);

        // Poll server every two seconds to determine if all media has been successfully processed
        let isAllMediaProcessed = false;
        const timerId = setInterval(async () => {
          const { data: { product } } = await refetchProduct();

          // Get media for product, variants and options
          let allMedia = [product.media];
          if (product.variants) {
            product.variants.forEach((variant) => {
              // Add variant media if set
              if (variant.media) {
                allMedia.push(variant.media);
              }

              // Add option media if set
              if (variant.options) {
                variant.options.forEach((option) => {
                  allMedia.push(option.media);
                });
              }
            });
          }

          allMedia = _.flatten(allMedia);

          const mediaItems = [];
          allMedia.forEach((media) => {
            const { id } = decodeOpaqueId(media._id);
            mediaItems.push({ id, thumbnailUrl: media.URLs.small });
          });

          isAllMediaProcessed = uploadedMediaIds.every((uploadedMediaId) => {
            const mediaItem = mediaItems.find((item) => item.id === uploadedMediaId);

            // If a url has been generated, then these media items has been processed successfully.
            return mediaItem && mediaItem.thumbnailUrl !== String(null);
          });

          if (isAllMediaProcessed) {
            setIsUploading(false);
            clearTimeout(timerId);
          }
        }, 2000);

        // Stop polling after 30 seconds
        setTimeout(() => {
          clearTimeout(timerId);
          setIsUploading(false);
        }, 30000);

        return null;
      })
      .catch((error) => {
        setIsUploading(false);
        if (onError) {
          onError(error);
        } else {
          Logger.error(error);
        }
      });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpg, image/png, image/jpeg",
    disableClick: true,
    disablePreview: true,
    multiple: canUploadMultiple,
    onDrop(files) {
      if (files.length === 0) return;

      // Pass onFiles func to circumvent default uploader
      if (onFiles) {
        onFiles(files);
      } else {
        uploadFiles(files);
      }
    }
  });

  return (
    <section>
      <Container {...getRootProps()}>
        <input {...getInputProps()} />
        <UploadIcon />
        <Text>
          <TextHighlighted>Drag/Upload</TextHighlighted> your image here.
        </Text>
      </Container>
      {isUploading ?
        <LinearProgress />: null}
      {/*{thumbs && <ThumbsContainer>{thumbs}</ThumbsContainer>}*/}
    </section>
  );
}

MediaUploader.propTypes = {
  canUploadMultiple: PropTypes.bool,
  metadata: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  onError: PropTypes.func,
  onFiles: PropTypes.func,
  refetchProduct: PropTypes.func,
  shopId: PropTypes.string
};

MediaUploader.defaultProps = {
  canUploadMultiple: false
};

registerComponent("MediaUploader", MediaUploader);

export default MediaUploader;
