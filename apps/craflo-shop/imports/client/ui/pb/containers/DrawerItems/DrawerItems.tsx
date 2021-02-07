import React, { useCallback } from 'react';
import { styled } from 'baseui';
import Drawer from '../../components/Drawer/Drawer';
import { CloseIcon } from '../../assets/icons/CloseIcon';
import { useDrawerState, useDrawerDispatch } from '../../context/DrawerContext';
import { Blocks } from "@reactioncommerce/reaction-components";
import {
  Box,
  Container,
  Divider
} from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
/** Drawer Components */
import ProductForm from '../ProductForm/ProductForm';
import ProductUpdateForm from 'imports/plugins/included/product-admin/client/layouts/ProductDetail.js';
import CampaingForm from '../CampaingForm/CampaingForm';
import CategoryForm from '../CategoryForm/CategoryForm';
import CategoryUpdateForm from '../CategoryForm/CategoryUpdateForm';

import StaffMemberForm from '../StaffMemberForm/StaffMemberForm';
import Sidebar from '../Layout/Sidebar/Sidebar';
import OrderDetails from '../OrderDetails/OrderDetails';


const styles = (theme) => ({
  block: {
    marginBottom: theme.spacing(3)
  },
  sidebar: {
    flex: "1 1 auto",
    maxWidth: 330,
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    overflowY: "auto",
    borderRight: `1px solid ${theme.palette.divider}`
  },
  content: {
    flex: "1 1 auto",
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    overflowY: "auto",
    paddingTop: theme.spacing(5)
  }
});

const ProdzuctUpdateForm = (props) =>{
  const { classes, ...blockProps } = props;

  return ( <>
    <Box
      paddingY={4}
      paddingLeft={4}
      paddingRight={2}
    >
      <Blocks region="ProductDetailHeader" blockProps={blockProps} />
    </Box>
    <Divider />
    <Box paddingY={2}>
      <Blocks region="ProductDetailSidebar" blockProps={blockProps} />
    </Box>
  <Switch>
    <Route
      path="/:shopId/products/:handle/:variantId/:optionId?"
      render={() => (
        <Blocks region="VariantDetailMain" blockProps={blockProps}>
          {(blocks) =>
            blocks.map((block, index) => (
              <div className={classes.block} key={index}>
                {block}
              </div>
            ))
          }
        </Blocks>
      )}
    />
    <Route
      path="/:shopId/products/:handle/"
      render={() => (
        <Blocks region="ProductDetailMain" blockProps={blockProps}>
          {(blocks) =>
            blocks.map((block, index) => (
              <div className={classes.block} key={index}>
                {block}
              </div>
            ))
          }
        </Blocks>
      )}
    />
  </Switch></>)
}

/** Components Name Constants */
const DRAWER_COMPONENTS = {
  PRODUCT_FORM: ProductForm,
  PRODUCT_UPDATE_FORM: ProductUpdateForm,
  ORDER_DETAILS: OrderDetails,
  CAMPAING_FORM: CampaingForm,
  CATEGORY_FORM: CategoryForm,
  CATEGORY_UPDATE_FORM: CategoryUpdateForm,
  STAFF_MEMBER_FORM: StaffMemberForm,
  EKYC_FORM: StaffMemberForm,
  SIDEBAR: Sidebar,
};

const CloseButton = styled('button', ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.textNormal,
  lineHeight: 1.2,
  outline: '0',
  border: 'none',
  padding: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '10px',
  left: '-30px',
  right: 'auto',
  cursor: 'pointer',
  backgroundColor: '#ffffff',
  width: '20px',
  height: '20px',
  borderRadius: '50%',

  '@media only screen and (max-width: 767px)': {
    left: 'auto',
    right: '30px',
    top: '29px',
  },
}));

export default function DrawerItems() {
  const isOpen = useDrawerState('isOpen');
  const drawerComponent = useDrawerState('drawerComponent');
  const data = useDrawerState('data');
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  if (!drawerComponent) {
    return null;
  }
  const SpecificContent = DRAWER_COMPONENTS[drawerComponent];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeDrawer}
      overrides={{
        Root: {
          style: {
            zIndex:
              DRAWER_COMPONENTS[drawerComponent] ===
              DRAWER_COMPONENTS.STAFF_MEMBER_FORM
                ? 0
                : 2,
          },
        },
        DrawerBody: {
          style: {
            marginTop: '80px',
            marginLeft: '60px',
            marginRight: '60px',
            marginBottom: '30px',
            '@media only screen and (max-width: 767px)': {
              marginTop: '80px',
              marginLeft: '30px',
              marginRight: '30px',
              marginBottom: '30px',
            },
          },
        },
        DrawerContainer: {
          style: {
            width: '80vw',
            backgroundColor: '#f7f7f7',
            '@media only screen and (max-width: 767px)': {
              width: '100%',
            },
          },
        },
        Close: {
          component: () => (
            <CloseButton onClick={closeDrawer}>
              <CloseIcon width='6px' height='6px' />
            </CloseButton>
          ),
        },
      }}
    >
      <SpecificContent onClose={closeDrawer} data={data} />
    </Drawer>
  );
}
