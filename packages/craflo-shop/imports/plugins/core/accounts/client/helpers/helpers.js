import React from "react";
import { Components } from "@reactioncommerce/reaction-components";

/**
 * @method getAccountAvatar
 * @memberof Accounts
 * @summary ReactionAvatar Component helper to get an account's Avatar
 * @example const accountAvatar = getAccountAvatar(account);
 * @param  {Object} account The account to render the avatar for
 * @returns {Component}          ReactionAvatar component
 */

export function getAccountAvatar(account) {
  // first we check picture exists. Picture has higher priority to display
  if (account && account.profile && account.profile.picture) {
    const { picture } = account.profile;

    return (
      <Components.ReactionAvatar
        className={"accounts-avatar"}
        size={30}
        src={picture}
      />
    );
  }

  return (
    <Components.ReactionAvatar
      className={"accounts-avatar"}
      size={30}
    />
  );
}
