import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import Popover, { PLACEMENT } from '../../../components/Popover/Popover';
import Notification from '../../../components/Notification/Notification';
import { AuthContext } from '../../../context/auth';
import { STAFF_MEMBERS, SETTINGS } from '../../../settings/constants';
import { NotificationIcon } from '../../../assets/icons/NotificationIcon';
import { AlertDotIcon } from '../../../assets/icons/AlertDotIcon';
import { ArrowLeftRound } from '../../../assets/icons/ArrowLeftRound';
import { MenuIcon } from '../../../assets/icons/MenuIcon';
import { Notif } from '../../../assets/icons/Notif';
import { Chat } from '../../../assets/icons/Chat';

import {
  TopbarWrapper,
  Logo,
  LogoImage,
  TopbarRightSide,
  ProfileImg,
  Image,
  AlertDot,
  NotificationIconWrapper,
  UserDropdowItem,
  NavLink,
  LogoutBtn,
  DrawerIcon,
  CloseButton,
  DrawerWrapper,
  ShopLogo
} from './Topbar.style';
const Logoimage = '/assets/image/logo.png';
import { Meteor } from "meteor/meteor";
import { Accounts, Groups, Shops } from "/lib/collections";
const userId = Meteor.userId();


// Groups that a user belongs to are saved on the `account` object, not the `user` object
const account = Accounts.findOne({
  userId
});
import { getAccountAvatar } from "/imports/plugins/core/accounts/client/helpers/helpers";

const UserImage =  getAccountAvatar(account);
import { useDrawerDispatch } from '../../../context/DrawerContext';
import Drawer, { ANCHOR } from '../../../components/Drawer/Drawer';
import Sidebar from '../Sidebar/Sidebar';
import useAuth from "../../../../hooks/useAuth.js";
import ShopSelectorWithData from "../../../../components/ShopSelectorWithData";


const data = [
  {
    title: 'Delivery Successful',
    time: '5m',
    message: 'Order #34567 had been placed',
  },
];

import { useApolloClient, useMutation } from "@apollo/react-hooks";
import createProductMutation from "/imports/plugins/included/product-admin/client/graphql/mutations/createProduct";
import { useSnackbar } from "notistack";
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId";
import { useHistory } from "react-router-dom";
import i18next from "i18next";


const Topbar = ({ refs }: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [shopId] = useCurrentShopId();
  // console.log(shopId)

  const dispatch = useDrawerDispatch();
  const { signout } = React.useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [createProduct, { error: createProductError }] = useMutation(createProductMutation);
  const openDrawer = useCallback(
    () => dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'PRODUCT_FORM' }),
    [dispatch]
  );

  const handleCreateProduct = async () => {
    const { data } = await createProduct({ variables: { input: { shopId } } });
    // console.log(data, "asdfadf")

    if (data) {
      const { createProduct: { product } } = data;
      history.push(`/${shopId}/products/${product._id}`);
    }

    if (createProductError) {
      enqueueSnackbar(i18next.t("admin.productTable.bulkActions.error", { variant: "error" }));
    }
  };
  const AddProduct = ()=>{
    handleCreateProduct()
    openDrawer()
  }

  const Auth = useAuth()
  console.log(Auth, "dcdc")


  return (
    <TopbarWrapper ref={refs}>

      <ShopLogo>
        <ShopSelectorWithData
          shouldShowShopName = {false}
          size={52}
          viewer={Auth.viewer}
        />
      </ShopLogo>


      <DrawerWrapper>
        <DrawerIcon onClick={() => setIsDrawerOpen(true)}>
          <MenuIcon />
        </DrawerIcon>
        <Drawer
          isOpen={isDrawerOpen}
          anchor={ANCHOR.left}
          onClose={() => setIsDrawerOpen(false)}
          overrides={{
            Root: {
              style: {
                zIndex: '1',
              },
            },
            DrawerBody: {
              style: {
                marginRight: '0',
                marginLeft: '0',
                '@media only screen and (max-width: 767px)': {
                  marginLeft: '30px',
                },
              },
            },
            DrawerContainer: {
              style: {
                width: '270px',
                '@media only screen and (max-width: 767px)': {
                  width: '80%',
                },
              },
            },
            Close: {
              component: () => (
                <CloseButton onClick={() => setIsDrawerOpen(false)}>
                  <ArrowLeftRound />
                </CloseButton>
              ),
            },
          }}
        >
          <Sidebar onMenuItemClick={() => setIsDrawerOpen(false)} />
        </Drawer>
      </DrawerWrapper>



      <TopbarRightSide>
        <Button style={{marginRight: '10px'}} onClick={AddProduct}>Add Products</Button>


        <Popover
          content={({ close }) => <Notification data={data} onClear={close} />}
          accessibilityType={'tooltip'}
          placement={PLACEMENT.bottomRight}
          overrides={{
            Body: {
              style: {
                width: '330px',
                zIndex: 2,
              },
            },
            Inner: {
              style: {
                backgroundColor: '#ffffff',
              },
            },
          }}
        >
          <NotificationIconWrapper>
            <Notif />
            <AlertDot>
              <AlertDotIcon />
            </AlertDot>
          </NotificationIconWrapper>
        </Popover>

        <Popover
          content={({ close }) => <Notification data={data} onClear={close} />}
          accessibilityType={'tooltip'}
          placement={PLACEMENT.bottomRight}
          overrides={{
            Body: {
              style: {
                width: '330px',
                zIndex: 2,
              },
            },
            Inner: {
              style: {
                backgroundColor: '#ffffff',
              },
            },
          }}
        >
          <NotificationIconWrapper>
            <Chat />
            <AlertDot>
              <AlertDotIcon />
            </AlertDot>
          </NotificationIconWrapper>
        </Popover>

        <Popover
          content={({ close }) => (
            <UserDropdowItem>
              <NavLink to={STAFF_MEMBERS} exact={false} onClick={close}>
                Staff
              </NavLink>
              <NavLink to={SETTINGS} exact={false} onClick={close}>
                Settings
              </NavLink>
              <LogoutBtn
                onClick={() => {
                  Auth.logout();
                  close();
                }}
              >
                Logout
              </LogoutBtn>
            </UserDropdowItem>
          )}
          accessibilityType={'tooltip'}
          placement={PLACEMENT.bottomRight}
          overrides={{
            Body: {
              style: () => ({
                width: '220px',
                zIndex: 2,
              }),
            },
            Inner: {
              style: {
                backgroundColor: '#ffffff',
              },
            },
          }}
        >
          <ProfileImg>
            <Image src={ (account && account.profile && account.profile.picture) ? account.profile.picture : null} alt='user' />
          </ProfileImg>
        </Popover>
      </TopbarRightSide>
    </TopbarWrapper>
  );
};

export default Topbar;
