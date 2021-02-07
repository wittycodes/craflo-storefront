import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import {
  SidebarWrapper,
  NavLink,
  MenuWrapper,
  Svg,
  LogoutBtn,
} from './Sidebar.style';
import {
  DASHBOARD,
  PRODUCTS,
  CATEGORY,
  ORDERS,
  CUSTOMERS,
  COUPONS,
  SETTINGS,
} from '../../../settings/constants';
import useAuth from "../../../../hooks/useAuth.js";
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId";

import {
  DashboardIcon,
  ProductIcon,
  SidebarCategoryIcon,
  OrderIcon,
  CustomerIcon,
  CouponIcon,
  SettingIcon,
  LogoutIcon,
} from '../../../components/AllSvgIcon';

const sidebarMenus = [
  {
    name: 'Dashboard',
    path: DASHBOARD,
    exact: true,
    icon: <DashboardIcon />,
    tour: "side-dashboard"

  },
  {
    name: 'Products',
    path: PRODUCTS,
    exact: false,
    icon: <ProductIcon />,
    tour: "side-products"

  },
  {
    name: 'Tags',
    path: CATEGORY,
    exact: false,
    icon: <SidebarCategoryIcon />,
    tour: "side-tags"

  },
  {
    name: 'Orders',
    path: ORDERS,
    exact: false,
    icon: <OrderIcon />,
    tour: "side-orders"

  },
  {
    name: 'Coupons',
    path: COUPONS,
    exact: false,
    icon: <CouponIcon />,
    tour: "side-coupons"

  },
  {
    name: 'Analytics',
    path: CUSTOMERS,
    exact: false,
    icon: <CustomerIcon />,
    tour: "side-analytics"

  },
  {
    name: 'Settings',
    path: SETTINGS,
    exact: false,
    icon: <SettingIcon />,
    tour: "side-settings"
  },
];

export default withRouter(function Sidebar({
  refs,
  style,
  onMenuItemClick,
}: any) {
  const Auth = useAuth()
  const [currentShopId] = useCurrentShopId();

  return (
    <SidebarWrapper ref={refs} style={style}>
      <MenuWrapper>
        {sidebarMenus.map((route: any, index: number) => (
          <NavLink
            tour-onboard={route.tour}
            to={(route.href || route.path).replace(":shopId", currentShopId)}
            key={route.path}
            activeStyle={{
              color: '#00C58D',
              backgroundColor: '#f7f7f7',
              borderRadius: '50px 0 0 50px',
            }}
            onClick={onMenuItemClick}
          >
              {route.icon ? <Svg>{route.icon}</Svg> : ''}
              {route.name}
          </NavLink>
        ))}
      </MenuWrapper>

      <LogoutBtn
        onClick={() => {
          Auth.logout();
        }}
      >
        <Svg>
          <LogoutIcon />
        </Svg>
        Logout
      </LogoutBtn>
    </SidebarWrapper>
  );
});
