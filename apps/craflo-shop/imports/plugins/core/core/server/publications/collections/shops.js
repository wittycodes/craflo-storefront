import { Meteor } from "meteor/meteor";
import { Shops } from "/lib/collections";

Meteor.publish("PrimaryShop", () => Shops.find({
  shopType: "primary"
}, {
  limit: 1
}));


Meteor.publish("MerchantShop", () => Shops.find({
  shopType: "merchant"
}));
