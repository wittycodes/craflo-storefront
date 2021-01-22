import ChangePassword from "./components/ChangePassword";
import ForgotPassword from "./components/ForgotPassword";
import OAuthError from "./components/OAuthError";
import ResetPassword from "./components/ResetPassword";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

export default [
  {
    path: "/account/login",
    mainComponent: SignIn
  },
  {
    path: "/account/enroll",
    mainComponent: SignUp
  },
  {
    path: "/account/forgot-password",
    mainComponent: ForgotPassword
  },
  {
    path: "/account/reset-password/:token",
    mainComponent: ResetPassword
  },
  {
    path: "/account/change-password",
    mainComponent: ChangePassword
  },
  {
    path: "/account/oauth-error",
    mainComponent: OAuthError
  }
];
