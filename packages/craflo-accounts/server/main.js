import { Meteor } from "meteor/meteor";
import {ServiceConfiguration} from 'meteor/service-configuration'
import Logger from "@reactioncommerce/logger";
import config from "./config.js";
import { oauthLogin } from "./oauthMethods.js";

Meteor.methods({
  "getGraphQLApiUrl": () => config.API_URL,
  "oauth/login": oauthLogin
});

Meteor.methods({
  // to
  "sendOtpForLogin": function(toPhone) {
    if (Meteor.isClient) return null;

    // otp must be generated on the server and never revealed to the client
    check(toPhone, String);

    // send otp as sms
    let otp = Math.round(Random.fraction() * 100000);
    console.log(otp)
    // Accounts.setPhoneOtp sets the otp in the `__otps` collection: {phone, otp, purpose: '__login__'}.
    Accounts.setPhoneOtp(toPhone, otp);
  },
});


// Init endpoints
import "./i18n/handler.js";
import "./oauthEndpoints.js";

Meteor.startup(() => {
  ServiceConfiguration.configurations.upsert({
    service: "google"
  }, {
    $set: {
      clientId: "683466154352-c7lbivd6l39m79kmpgm6pb7ju1pvmo4e.apps.googleusercontent.com",
      loginStyle: "popup",
      secret: "xCPKyq_fCfUuCJwHsf7pnpzh"
    }
  });
  Logger.info(`Serving Reaction Identity at ${config.ROOT_URL}`);
});
