import React from 'react';
import { FormattedMessage } from 'react-intl';
import NavLink from 'components/nav-link/nav-link';

import {
  PROCEED_TO_CHECKOUT_PAGE,
  ALTERNATIVE_CHECKOUT_PAGE,
  PROFILE_PAGE,
  ORDER_RECEIVED,
  YOUR_ORDER,
  TERMS,
  PRIVACY, HELP_PAGE, SELL_ON_CRAFLO,
} from 'constants/navigation';

const AUTHORIZED_MENU_ITEMS = [
  {
    link: PROFILE_PAGE,
    label: 'Profile',
    intlId: 'navlinkProfile',
  },
  {
    link: PROCEED_TO_CHECKOUT_PAGE,
    label: 'Saved Items',
    intlId: 'navlinkCheckouta',
  },

  {
    link: YOUR_ORDER,
    label: 'Past Orders',
    intlId: 'sidebarYoursOrder',
  },
  // {
  //   link: ORDER_RECEIVED,
  //   label: 'Order invoice',
  //   intlId: 'navlinkOrderReceived',
  // },
  // {
  //   link: TERMS,
  //   label: 'Terms and Services',
  //   intlId: 'navlinkTermsAndServices',
  // },
  // {
  //   link: PRIVACY,
  //   label: 'Privacy Policy',
  //   intlId: 'navlinkPrivacyPolicy',
  // },
  {
    link: SELL_ON_CRAFLO,
    label: 'Sell on Craflo',
    intlId: 'alternativeCheckoust',
  },
  {
    link: HELP_PAGE,
    label: 'Get Help',
    intlId: 'alternativeChseckoust',
  }
];

type Props = {
  onLogout: () => void;
};

export const AuthorizedMenu: React.FC<Props> = ({ onLogout }) => {
  return (
    <>
      {AUTHORIZED_MENU_ITEMS.map((item, idx) => (
        <NavLink
          key={idx}
          className="menu-item"
          href={item.link}
          label={item.label}
          intlId={item.intlId}
        />
      ))}
      <div className="menu-item" onClick={onLogout}>
        <a>
          <span>
            <FormattedMessage id="navlinkLogout" defaultMessage="Logout" />
          </span>
        </a>
      </div>
    </>
  );
};
