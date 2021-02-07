import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh"
  },
  body:{
    margin: 0
  },
  content: {
    boxShadow: '0 21px 36px rgba(0,0,0,0.05)',
    width: "100%",
    maxWidth: 480,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%"
    }

  },
  logoutButton: {
    textAlign: "center"
  }
}));

/**
 * @summary AuthPage React component
 * @param {Object} props Component props
 * @return {React.Node} Rendered component instance
 */
function AuthPage(props) {
  const classes = useStyles();
  if ( window.location !== window.parent.location ) {}
  else{
    let body_ref = document.getElementsByTagName('body')[0]
    body_ref.style.background="url('https://static.rfstat.com/renderforest/images/v2/home-new/hero_bg.svg')"
    body_ref.style.backgroundPositionY= 'bottom'
    body_ref.style.backgroundSize="cover"
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {props.children}
      </div>
    </div>
  );
}

AuthPage.propTypes = {
  children: PropTypes.node
};

export default AuthPage;
