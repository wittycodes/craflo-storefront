import React from 'react';
import dynamic from 'next/dynamic';
import NavLink from 'components/nav-link/nav-link';
import Link from 'next/link'
import { OFFER_PAGE, HELP_PAGE } from 'constants/navigation';
import LanguageSwitcher from '../language-switcher/language-switcher';
import { HelpIcon } from 'assets/icons/HelpIcon';
import { RightMenuBox } from './right-menu.style';
import {StyledProfileButton} from "../../../../components/button/button";
import {Members} from "../../../../assets/icons/Members";
import {InboxIcon} from "../../../../assets/icons/InboxIcon";
import {Notif} from "../../../../assets/icons/Notif";
import {Chat} from "../../../../assets/icons/Chat";
const AuthMenu = dynamic(() => import('../auth-menu'), { ssr: false });

type Props = {
  onLogout: () => void;
  onJoin: () => void;
  avatar: string;
  isAuthenticated: boolean;
};

export const RightMenu: React.FC<Props> = ({
  onLogout,
  avatar,
  isAuthenticated,
  onJoin,
}) => {
  return (
    <RightMenuBox>

      <Link
        href={OFFER_PAGE}
      >
        <StyledProfileButton variant={'icon'}><Notif /></StyledProfileButton>
      </Link>
      <Link
        style={{marginRight: 12}}


        className="menu-item"
        href={HELP_PAGE}
        // label="Need Help"
        // intlId="navlinkHelp"
        // iconClass="menu-icon"
        // icon={<HelpIcon />}
      >
        <StyledProfileButton variant={'icon'}><Chat /></StyledProfileButton>

      </Link>
      {/*<LanguageSwitcher />*/}

      <AuthMenu
        avatar={avatar}
        onJoin={onJoin}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
      />
    </RightMenuBox>
  );
};
