import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Box,
  Image,
  Content,
  Title,
  Description,
  SearchWrapper,
  AlertNotice
} from './banner.style';

import { Waypoint } from 'react-waypoint';
import { useAppDispatch } from 'contexts/app/app.provider';
import Search from 'features/search/search';

interface Props {
  imageUrl: string;
  intlTitleId: string;
  intlDescriptionId: string;
  isAvailable: boolean;
}

export const Banner: React.FC<Props> = ({
                                          imageUrl,
                                          intlTitleId,
                                          intlDescriptionId,
                                          isAvailable
                                        }) => {
  const dispatch = useAppDispatch();
  const setSticky = useCallback(() => dispatch({ type: 'SET_STICKY' }), [
    dispatch,
  ]);
  const removeSticky = useCallback(() => dispatch({ type: 'REMOVE_STICKY' }), [
    dispatch,
  ]);
  const onWaypointPositionChange = ({ currentPosition }) => {
    if (!currentPosition || currentPosition === 'above') {
      setSticky();
    }
  };

  return (
    <Box>
      <Image backgroundImage={`url(${imageUrl})`} />
      <Content>
        { !isAvailable && <AlertNotice>
          <FormattedMessage
            id={'sss'}
            defaultMessage="Sorry, Our Services are currently not available in your region"
          />
        </AlertNotice>}
        <Title>
          <FormattedMessage
            id={intlTitleId}
            defaultMessage="Set Your Title Through Language File"
            values={{ minute: 90 }}
          />
        </Title>
        <Description>
          <FormattedMessage
            id={intlDescriptionId}
            defaultMessage="Set Your Description Through Language File"
          />
        </Description>
        <SearchWrapper>
          <Search
            className="banner-search"
            shadow="0 21px 36px rgba(0,0,0,0.05)"
          />
        </SearchWrapper>
        <Waypoint
          onEnter={removeSticky}
          onLeave={setSticky}
          onPositionChange={onWaypointPositionChange}
        />
      </Content>
    </Box>
  );
};
