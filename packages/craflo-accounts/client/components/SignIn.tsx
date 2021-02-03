import React, { useMemo, useState, useContext } from "react";
import { Meteor } from "meteor/meteor";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import SimpleSchema from "simpl-schema";
import useReactoForm from "reacto-form/cjs/useReactoForm";
import Random from "@reactioncommerce/random";
import ErrorsBlock from "@reactioncommerce/components/ErrorsBlock/v1";
import Field from "@reactioncommerce/components/Field/v1";
import InlineAlert from "@reactioncommerce/components/InlineAlert/v1";
import TextInput from "@reactioncommerce/components/TextInput/v1";
import {
  LinkButton,
  Button,
  IconWrapper,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  OfferSection,
  Offer,
  Input,
  Divider,
} from './authentication-form.style';
// import { Facebook } from '../assets/icons/Facebook';
import { Google } from '../assets/icons/Google';
import { AuthContext } from '../contexts/auth/auth.context';
import { FormattedMessage, useIntl } from 'react-intl';
import { closeModal } from '@redq/reuse-modal';


window.onload = (e) => {
  parent.postMessage("GuestAuthPageLoad","https://craflo.com");
};

/**
 * @summary Does `Meteor.loginWithPassword` followed by
 *   calling the "oauth/login" method.
 * @param {Object} input Input
 * @param {String} [input.challenge] Challenge to pass to the "oauth/login" method
 *   after logging in.
 * @param {String} input.email Email address to pass to `Meteor.loginWithPassword`
 * @param {String} input.password Password to pass to `Meteor.loginWithPassword`
 * @return {Promise<String|undefined>} Redirect URL or `undefined` if no
 *   `challenge` argument was passed.
 */
function callSignIn({ challenge, phone }) {
  return new Promise((resolve, reject) => {
    Meteor.loginWithPhone(phone, (meteorLoginError) => {
      if (meteorLoginError) {
        reject(meteorLoginError);
      } else {
        if (!challenge) {
          resolve();
          return;
        }
        Meteor.call("sendOtpForLogin", { phone }, (err) => {
          console.log(err)
        });
      }
    });
  });
}



export default function SignInModal() {
  const formSchema = new SimpleSchema({
    email: {
      type: String,
      min: 3
    },
    password: {
      type: String
    }
  });

  const uniqueId = useMemo(() => Random.id(), []);
  const history = useHistory();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { login_challenge: challenge } = queryString.parse(location.search);
  const validator = formSchema.getFormValidator();

  const {
    getErrors,
    getInputProps,
    submitForm
  } = useReactoForm({
    async onSubmit(formData) {
      // console.log("submitting hehh")
      // setIsSubmitting(true);
      let redirectUrl;
      try {
        redirectUrl = await callSignIn({ challenge, ...formData });
      } catch (error) {
        setSubmitError(error.message);
        setIsSubmitting(false);
        console.log(error.message, "failed")
        return { ok: false };
      }
      // setIsSubmitting(false);
      // parent.postMessage("GuestAuthSuccess","https://craflo.com");
      // if (redirectUrl) window.location.href = redirectUrl;
      // console.log("wow success inside modal  ")
      return { ok: true };
    },
    validator
  });



  const { authDispatch } = useContext<any>(AuthContext);
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');


  async function SigninWithGoogle() {
      console.log("submitting hehh")
      setIsSubmitting(true);
      let redirectUrl;
      try {


        let loginWithGoogleCB = new Promise((resolve, reject) => {Meteor.loginWithGoogle((meteorLoginError) => {
          if (meteorLoginError) {
            reject(meteorLoginError);
          } else {
            if (!challenge) {
              resolve();
              return;
            }
            console.log("here is jnnt")
            Meteor.call("oauth/login", { challenge }, (oauthLoginError, redirectUrl) => {
              if (oauthLoginError) {
                reject(oauthLoginError);
                console.log("here is mnnt")

              } else {
                resolve(redirectUrl);
                console.log("here is jnnt agains")

              }
            });
          }
        })})

        redirectUrl = await loginWithGoogleCB

      }
        catch (error) {
        setSubmitError(error.message);
        setIsSubmitting(false);
        console.log(error.message, "failed")
        return { ok: false };
      }

      setIsSubmitting(false);
      parent.postMessage("GuestAuthSuccess","https://craflo.com");
      if (redirectUrl) window.location.href = redirectUrl;
      console.log("wow success inside modal  ")
      return { ok: true };
  }





  async function SigninWithOTP() {
    console.log("submitting hehh")
    setIsSubmitting(true);
    let redirectUrl;
    try {


      let loginWithGoogleCB = new Promise((resolve, reject) => {Meteor.loginWithGoogle((meteorLoginError) => {
        if (meteorLoginError) {
          reject(meteorLoginError);
        } else {
          if (!challenge) {
            resolve();
            return;
          }
          Meteor.call("oauth/login", { challenge }, (oauthLoginError, redirectUrl) => {
            if (oauthLoginError) {
              reject(oauthLoginError);
            } else {
              resolve(redirectUrl);
            }
          });
        }
      })})

      redirectUrl = await loginWithGoogleCB

    }
    catch (error) {
      setSubmitError(error.message);
      setIsSubmitting(false);
      console.log(error.message, "failed")
      return { ok: false };
    }

    setIsSubmitting(false);
    parent.postMessage("GuestAuthSuccess","https://craflo.com");
    if (redirectUrl) window.location.href = redirectUrl;
    console.log("wow success inside modal  ")
    return { ok: true };
  }




  const toggleSignUpForm = () => {
    authDispatch({
      type: 'SIGNUP',
    });
  };


  const toggleForgotPassForm = () => {
    authDispatch({
      type: 'FORGOTPASS',
    });
  };

  const loginCallback = (type) => {
    if (type == "otp"){
      submitForm()
    }
    else if(type == "google"){
      SigninWithGoogle()
    }
    else if(type == "facebook"){

    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', `${email}.${password}`);
      authDispatch({ type: 'SIGNIN_SUCCESS' });
      closeModal();
    }
  };


  return (
    <Wrapper>
      <Container>
        <Heading style={{ padding: '20px 20px' }}>
          <FormattedMessage id="welcomseaBack" defaultMessage="Log In" />
        </Heading>
        <form onSubmit={()=>loginCallback("password")}>
          <Input
            type="number"
            placeholder={"Enter your mobile number"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            {...getInputProps("phone")}
          />

          {/*<Input*/}
          {/*  type="password"*/}
          {/*  placeholder={"Password (min 6 characters)"}*/}
          {/*  value={password}*/}
          {/*  onChange={(e) => setPassword(e.target.value)}*/}
          {/*  required*/}
          {/*  {...getInputProps("password")}*/}
          {/*/>*/}

          <Button
            disabled={isSubmitting}
            variant="primary"
            size="big"
            style={{ width: '100%', backgroundColor: '#009e7f',}}
            type="submit"
            onClick={()=>loginCallback("otp")}
          >
            <FormattedMessage id="sendBtn" defaultMessage="Send OTP" />
          </Button>
        </form>
        <Divider>
          <span>
            <FormattedMessage id="orText" defaultMessage="or" />
          </span>
        </Divider>
        {
          submitError &&
          <InlineAlert
            alertType="error"
            message={submitError}
          />
        }

        {/*<Button*/}
        {/*  disabled={isSubmitting}*/}
        {/*  variant="primary"*/}
        {/*  size="big"*/}
        {/*  style={{*/}
        {/*    width: '100%',*/}
        {/*    backgroundColor: '#4267b2',*/}
        {/*    marginBottom: 10,*/}
        {/*  }}*/}
        {/*  onClick={loginCallback}*/}
        {/*>*/}
        {/*  <IconWrapper>*/}
        {/*    <Facebook />*/}
        {/*  </IconWrapper>*/}
        {/*  <FormattedMessage*/}
        {/*    id="continueFacebookBtn"*/}
        {/*    defaultMessage="Continue with Facebook"*/}
        {/*  />*/}
        {/*</Button>*/}

        <Button
          disabled={isSubmitting}
          variant="primary"
          size="big"
          style={{ width: '100%', backgroundColor: '#4285f4' }}
          onClick={()=>loginCallback("google")}
        >
          <IconWrapper>
            <Google />
          </IconWrapper>
          <FormattedMessage
            id="continueGoogleBtn"
            defaultMessage="Continue with Google"
          />
        </Button>

        <Offer style={{ padding: '20px 0 0 0' }}>
          <FormattedMessage
            id="dontHaveAccount"
            defaultMessage="Don't have any account?"
          />{' '}
          <LinkButton onClick={toggleSignUpForm}>
            <FormattedMessage id="signUpBtnText" defaultMessage="Sign Up" />
          </LinkButton>
        </Offer>

        <Offer style={{ padding: '20px 0' }}>
          <FormattedMessage
            id="forgotPasswordText"
            defaultMessage="Forgot your password?"
          />{' '}
          <LinkButton onClick={toggleForgotPassForm}>
            <FormattedMessage id="resetText" defaultMessage="Reset It" />
          </LinkButton>
        </Offer>


      </Container>

      <OfferSection>
        <Offer>
          <SubHeading>
            <h5>
            <FormattedMessage
              id="loginTesxt"
              defaultMessage="By clicking Sign in or Continue with Google, Facebook, you agree to Craflo's Terms of Use and Privacy Policy. We'll never post without your permission."
            />
            </h5>
          </SubHeading>
        </Offer>
      </OfferSection>
    </Wrapper>
  );
}



/*
const useStyles = makeStyles(() => ({
  inlineAlert: {
    marginBottom: 16
  },
  pageTitle: {
    color: "#1999dd",
    fontFamily: "'Source Sans Pro', 'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
    fontSize: 30,
    fontWeight: 400,
    marginBottom: 40,
    textAlign: "center"
  }
}));

const formSchema = new SimpleSchema({
  email: {
    type: String,
    min: 3
  },
  password: {
    type: String
  }
});
const validator = formSchema.getFormValidator();

/**
 * @summary SignIn React component
 * @param {Object} props Component props
 * @return {React.Node} Rendered component instance
 */


/*
function SignIn() {
  const { t } = useTranslation(); // eslint-disable-line id-length
  const uniqueId = useMemo(() => Random.id(), []);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { login_challenge: challenge } = queryString.parse(location.search);

  const {
    getErrors,
    getInputProps,
    submitForm
  } = useReactoForm({
    async onSubmit(formData) {
      setIsSubmitting(true);
      let redirectUrl;
      try {
        redirectUrl = await callSignIn({ challenge, ...formData });
      } catch (error) {
        setSubmitError(error.message);
        setIsSubmitting(false);
        return { ok: false };
      }
      setIsSubmitting(false);
      if (redirectUrl) window.location.href = redirectUrl;
      return { ok: true };
    },
    validator
  });

  return (
    <div>
      <div className={classes.pageTitle}>
        {t("signIn")}
      </div>

      <Field
        isRequired
        errors={getErrors(["email"])}
        name="email"
        label={t("emailAddress")}
        labelFor={`email-${uniqueId}`}
      >
        <TextInput
          type="email"
          id={`email-${uniqueId}`}
          {...getInputProps("email")}
        />
        <ErrorsBlock errors={getErrors(["email"])} />
      </Field>
      <Field
        isRequired
        errors={getErrors(["password"])}
        name="password"
        label={t("password")}
        labelFor={`password-${uniqueId}`}
      >
        <TextInput
          type="password"
          id={`password-${uniqueId}`}
          {...getInputProps("password")}
        />
        <ErrorsBlock errors={getErrors(["password"])} />
      </Field>

      {submitError &&
        <InlineAlert
          alertType="error"
          className={classes.inlineAlert}
          message={submitError}
        />
      }

      <Button
        actionType="important"
        isFullWidth
        isWaiting={isSubmitting}
        onClick={submitForm}
      >
        {t("signIn")}
      </Button>
      <Button
        isDisabled={isSubmitting}
        isFullWidth
        isShortHeight
        isTextOnly
        onClick={() => { history.push({ pathname: "/account/forgot-password", search: location.search }); }}
      >
        {t("forgotPassword")}
      </Button>
      <Button
        isDisabled={isSubmitting}
        isFullWidth
        isShortHeight
        isTextOnly
        onClick={() => { history.push({ pathname: "/account/enroll", search: location.search }); }}
      >
        {t("signUp")}
      </Button>
    </div>
  );
}
*/
