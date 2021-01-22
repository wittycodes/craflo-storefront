import { URL } from "url";
import { BrowserPolicy } from "meteor/browser-policy-common";
import { WebApp } from "meteor/webapp";
import config from "../config.js";

/**
 * Set headers for Reaction CDN
 */
WebApp.rawConnectHandlers.use((req, res, next) => {
  if (req._parsedUrl.pathname.match(/\.(ttf|ttc|otf|eot|woff|svg|font\.css|css)$/)) {
    res.setHeader("Access-Control-Allow-Origin", "assets.reactioncommerce.com");
  }
  next();
});

/**
 * Set browser policies
 */
// if (process.env.NODE_ENV === "development") {
//   BrowserPolicy.content.allowOriginForAll("*");
//   BrowserPolicy.content.allowConnectOrigin("ws://*");
//   BrowserPolicy.content.allowConnectOrigin("http://*");
//   BrowserPolicy.content.allowConnectOrigin("https://*");
//   BrowserPolicy.framing.allowAll();
//   // Allow images from anywhere http
//   BrowserPolicy.content.allowImageOrigin("http://*");
//   //for dev we wanted to develop with subdomain, so changed by Pulkit
// }

// get current hostname of app
const parsedUrl = new URL(config.ROOT_URL);

// allow websockets (Safari fails without this)
console.log(`ws://${parsedUrl.hostname}`)
BrowserPolicy.content.allowConnectOrigin(`ws://${parsedUrl.hostname}`);
BrowserPolicy.content.allowConnectOrigin(`wss://${parsedUrl.hostname}`);
BrowserPolicy.content.allowConnectOrigin(`http://${parsedUrl.hostname}`);
BrowserPolicy.content.allowConnectOrigin(`https://${parsedUrl.hostname}`);

BrowserPolicy.content.allowOriginForAll("*.facebook.com");
BrowserPolicy.content.allowOriginForAll("*.fbcdn.net");
BrowserPolicy.content.allowOriginForAll("connect.facebook.net");
BrowserPolicy.content.allowOriginForAll("*.googleusercontent.com");
BrowserPolicy.content.allowOriginForAll("*.cdninstagram.com");

BrowserPolicy.content.allowImageOrigin("fbcdn-profile-a.akamaihd.net");
BrowserPolicy.content.allowImageOrigin("secure.gravatar.com");
BrowserPolicy.content.allowImageOrigin("i0.wp.com");

BrowserPolicy.content.allowFontDataUrl();
BrowserPolicy.content.allowOriginForAll("assets.reactioncommerce.com");
BrowserPolicy.content.allowOriginForAll("cdnjs.cloudflare.com");
BrowserPolicy.content.allowOriginForAll("fonts.googleapis.com");
BrowserPolicy.content.allowOriginForAll("fonts.gstatic.com");
BrowserPolicy.content.allowOriginForAll("fonts.gstatic.com");

BrowserPolicy.content.allowOriginForAll("enginex.kadira.io");
BrowserPolicy.content.allowOriginForAll("*.stripe.com");

// Allow images from anywhere https
BrowserPolicy.content.allowImageOrigin("https://*");
