import React, { useContext, lazy, Suspense } from 'react';
import { Route, Switch, Redirect, useParams, Link } from 'react-router-dom';

import {
  LOGIN,
  PRODUCTS,
  CATEGORY,
  DASHBOARD,
  ORDERS,
  SETTINGS,
  CUSTOMERS,
  COUPONS,
  STAFF_MEMBERS,
  SITE_SETTINGS,
  EKYC
} from './settings/constants';
import AuthProvider, { AuthContext } from './context/auth';
import { InLineLoader } from './components/InlineLoader/InlineLoader';
const Products = lazy(() => import('./containers/Products/Products'));
const AdminLayout = lazy(() => import('./containers/Layout/Layout'));
const Dashboard = lazy(() => import('./containers/Dashboard/Dashboard'));
const Category = lazy(() => import('./containers/Category/Category'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Settings = lazy(() => import('./containers/Settings/Settings'));
const SiteSettingForm = lazy(() =>
  import('./containers/SiteSettingForm/SiteSettingForm')
);
const EKYCForm = lazy(() =>
  import('./containers/EKYCForm/EKYCForm')
);
const StaffMembers = lazy(() =>
  import('./containers/StaffMembers/StaffMembers')
);
const Customers = lazy(() => import('./containers/Customers/Customers'));
const Coupons = lazy(() => import('./containers/Coupons/Coupons'));
const Login = lazy(() => import('./containers/Login/Login'));
const NotFound = lazy(() => import('./containers/NotFound/NotFound'));
import useIsAppLoading from "/imports/client/ui/hooks/useIsAppLoading.js";
import useAuth from "/imports/client/ui/hooks/useAuth";
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId";

/**
 *
 *  A wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 *
 */

function PrivateRoute({ children, ...rest }) {
  // const { isAuthenticated } = useContext(AuthContext);

  return (
      <Route
        exact={true}
        {...rest}
        render={({ location }) => children}
      />
  );
}


const Routes = () => {
  const { isViewerLoading, viewer } = useAuth();
  const [isAppLoading] = useIsAppLoading();

  const [shopId] = useCurrentShopId();
  const routeParams = useParams();
  // if (isAppLoading || isViewerLoading)
  //   return <InLineLoader />
  return (

      <Suspense fallback={<InLineLoader />}>
        <Switch>
          <PrivateRoute path={DASHBOARD}>

              <AdminLayout>
                <Suspense fallback={<InLineLoader />}>
                  <Dashboard />
                </Suspense>
              </AdminLayout>

          </PrivateRoute>
          <PrivateRoute path={PRODUCTS}>

              <AdminLayout>
                <Suspense fallback={<InLineLoader />}>
                  <Products />
                </Suspense>
              </AdminLayout>

          </PrivateRoute>
          <PrivateRoute path={CATEGORY}>

              <AdminLayout>
                <Suspense fallback={<InLineLoader />}>
                  <Category />
                </Suspense>
              </AdminLayout>

          </PrivateRoute>
          <PrivateRoute path={ORDERS}>

              <AdminLayout>
                <Suspense fallback={<InLineLoader />}>
                  <Orders />
                </Suspense>
              </AdminLayout>

          </PrivateRoute>
          <PrivateRoute path={CUSTOMERS}>

              <AdminLayout>
                <Suspense fallback={<InLineLoader />}>
                  <Customers />
                </Suspense>
              </AdminLayout>

          </PrivateRoute>
          <PrivateRoute path={COUPONS}>

              <AdminLayout>
                <Suspense fallback={<InLineLoader />}>
                  <Coupons />
                </Suspense>
              </AdminLayout>

          </PrivateRoute>
          <PrivateRoute path={SETTINGS}>

              <AdminLayout>
                <Suspense fallback={<InLineLoader />}>
                  <Settings />
                </Suspense>
              </AdminLayout>

          </PrivateRoute>
          <PrivateRoute path={STAFF_MEMBERS}>

              <AdminLayout>
                <Suspense fallback={<InLineLoader />}>
                  <StaffMembers />
                </Suspense>
              </AdminLayout>

          </PrivateRoute>
          <PrivateRoute path={SITE_SETTINGS}>

              <AdminLayout>
                <Suspense fallback={<InLineLoader />}>
                  <SiteSettingForm />
                </Suspense>
              </AdminLayout>

          </PrivateRoute>
          <PrivateRoute path={EKYC}>

              <AdminLayout>
                <Suspense fallback={<InLineLoader />}>
                  <EKYCForm />
                </Suspense>
              </AdminLayout>

          </PrivateRoute>
          <PrivateRoute  path={LOGIN}>
            <Login />
          </PrivateRoute>
          <PrivateRoute path={"/"}>
          {
            (!routeParams.shopId && viewer?.adminUIShops?.length > 0)? <Redirect to={`/${viewer.adminUIShops[0]._id}/dashboard`} />
            : (!routeParams.shopId && viewer) ?  <Redirect to={"/onboarding"} /> : null
          }
          </PrivateRoute>
          <Route component={NotFound} />

        </Switch>
      </Suspense>
  );
};

export default Routes;
