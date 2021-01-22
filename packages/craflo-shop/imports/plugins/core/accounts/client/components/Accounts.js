import React, { Fragment, useState } from "react";
import i18next from "i18next";
import Divider from "@material-ui/core/Divider";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Customers from "./Customers";
import GroupCards from "./GroupCards";
import Invitations from "./Invitations";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
/**
 * @summary Main accounts view
 * @name Accounts
 * @returns {React.Component} A React component
 */
function Accounts() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Fragment>
      <Card>
        <CardContent>
          <Tabs value={currentTab} onChange={(event, value) => setCurrentTab(value)}>
            <Tab label={i18next.t("admin.accounts.tabs.staff")} />
            {/*<Tab label={i18next.t("admin.accounts.tabs.customers")} />*/}
            <Tab label={i18next.t("admin.accounts.tabs.invites")} />
          </Tabs>
        </CardContent>
      </Card>

      {/*<Divider />*/}

      {currentTab === 0 &&
        <GroupCards />
      }

      {currentTab === 1 &&
        <Customers />
      }

      {currentTab === 2 &&
        <Invitations />
      }
    </Fragment>
  );
}

export default Accounts;
