import React, { useContext, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/auth';
import {
  FormFields,
  FormLabel,
  FormTitle,
  Error,
} from '../../components/FormFields/FormFields';
import { Wrapper, FormWrapper, LogoImage, LogoWrapper } from './Login.style';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
const Logoimage = 'https://raw.githubusercontent.com/wittycodes/craflo-storefront/master/src/assets/images/logo.png';

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Logger from "/client/modules/logger";

const getLoginValidationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required('Username is Required!')
  });
};

const MyInput = ({ field, form, ...props }) => {
  return <Input {...field} {...props} />;
};




const createShopMutation = gql`
  mutation createShop($input: CreateShopInput!) {
    createShop(input: $input) {
      shop {
        _id
      }
    }
  }
`;
// /**
//  * CreateShopForm
//  * @returns {Node} React component
//  */
// export default function CreateShopFormContainer() {
//   const history = useHistory();
//
//   return (
//     <CreateShopForm
//       onSubmit={async (input) => {
//         const { data } = await createShop({
//           variables: {
//             input
//           },
//           onError(error) {
//             Logger.error(error);
//             Alerts.toast("Unable to create shop", "error", { autoHide: 10000 });
//           }
//         });
//
//         if (data?.createShop?.shop?._id) history.push(`/${data.createShop.shop._id}`);
//       }}
//     />
//   );
// }
//
//


export default () => {
  let history = useHistory();
  let location = useLocation();
  const { authenticate, isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) return <Redirect to={{ pathname: '/' }} />;
  const [createShop] = useMutation(createShopMutation, { ignoreResults: true });


  // const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (input) => {
    console.log(input, "pulkit")
    const { data } = await createShop({
      variables: {
        input
      },
      onError(error) {
        Logger.error(error);
        Alerts.toast("Unable to create shop", "error", { autoHide: 10000 });
      }
    });

    if (data?.createShop?.shop?._id) history.push(`/${data.createShop.shop._id}`);
  }

    // let { from } = (location.state as any) || { from: { pathname: '/' } };
  // let login = ({ username, password }) => {
  //   authenticate({ username, password }, () => {
  //     history.replace(from);
  //   });
  // };


  return (
    <Wrapper>
      <FormWrapper>
        <Formik
          initialValues={{
            name: ''
          }}
          onSubmit={onSubmit}
          validationSchema={getLoginValidationSchema}
          >
          {({ errors, status, touched, isSubmitting }) => (
            <Form>
              <FormFields>
                <LogoWrapper>
                  <LogoImage src={Logoimage} alt='pickbazar-admin' />
                </LogoWrapper>
                <FormTitle>Give Business Name to your Shop</FormTitle>
              </FormFields>

              <FormFields>
                {/*<FormLabel>GYour Shop Name</FormLabel>*/}
                 <Field
                  name='name'
                  type={'text'}
                  component={MyInput}
                  placeholder='For eg. JohnCreations'
                />
                {errors.username && touched.username && (
                  <Error>Business Name is Required*</Error>
                )}
              </FormFields>
              {/*<FormFields>*/}
              {/*  <FormLabel>Password</FormLabel>*/}
              {/*  <Field*/}
              {/*    type='password'*/}
              {/*    name='password'*/}
              {/*    component={MyInput}*/}
              {/*    placeholder='Ex: demo'*/}
              {/*  />*/}
              {/*  {errors.password && touched.password && (*/}
              {/*    <Error>{errors.password}</Error>*/}
              {/*  )}*/}
              {/*</FormFields>*/}
              <Button
                type='submit'
                disabled={isSubmitting}
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => ({
                      width: '100%',
                      marginLeft: 'auto',
                      borderTopLeftRadius: '3px',
                      borderTopRightRadius: '3px',
                      borderBottomLeftRadius: '3px',
                      borderBottomRightRadius: '3px',
                    }),
                  },
                }}
              >
                {isSubmitting ? "Creating Shop..." : "Create"}
              </Button>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </Wrapper>
  );
};
