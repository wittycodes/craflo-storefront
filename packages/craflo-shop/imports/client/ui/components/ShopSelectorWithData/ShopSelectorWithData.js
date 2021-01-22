import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { withComponents } from "@reactioncommerce/components-context";
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId";
import {Logo, LogoImage} from "../../pb/containers/Layout/Topbar/Topbar.style";

const defaultLogo = "https://icons.veryicon.com/png/o/system/rounded-linear-icon/shop-34.png";

const styles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  logo: {
    marginRight: theme.spacing(2),
    marginLeft: '-9px',
    filter: 'hue-rotate(-52deg)'
  },
  menuItem: {
    "& a span": {
      color: theme.palette.colors.black90
    },
  },
  selectMenu: {
    "& a span": {
      color: theme.palette.colors.black15
    },
    padding: 0
  },
  dummyShopName: {
    color: theme.palette.colors.black15
  },
  newShopLink: {
    "color": theme.palette.colors.darkBlue,
    "&:hover": {
      color: theme.palette.colors.darkBlue
    }
  },
  plusIcon: {
    display: "flex",
    justifyContent: "center"
  },
  selectArrow: {
    color: theme.palette.colors.black15,
    display: 'none'
  }
});

const ShopSelectorInput = withStyles(() => ({
  input: {
    "border": "none",
    "&:focus": {
      border: "none",
      background: "transparent"
    }
  }
}))(InputBase);

/**
 * ShopSelectorWithData
 * @param {Object} props Component props
 * @returns {Node} React component
 */
function ShopSelectorWithData({ className, classes, shouldShowShopName, linkTo, size, viewer }) {
  const location = useLocation();
  const [currentShopId] = useCurrentShopId();
  const [isOpen, setIsOpen] = React.useState(false)
  let adminUIShops = [];
  const Logoimage = '/assets/image/logo.png';

  if (viewer?.adminUIShops) {
    ({ adminUIShops } = viewer);
  } else {
    return (
      <Link
        className={classNames(classes.root, className)}
        to={linkTo}
      >
        <img
          alt="Reaction Commerce"
          className={classes.logo}
          src={defaultLogo}
          width={size}
        />
        {shouldShowShopName &&
        <Typography
          className={classes.dummyShopName}
          component="span"
          variant="h4"
        >
          Craflo Shop
        </Typography>
        }
      </Link>
    );
  }

  return (
    <Select classes={{ selectMenu: classes.selectMenu, icon: classes.selectArrow }} value={currentShopId || "onboarding"} input={<ShopSelectorInput />} onOpen={()=>{setIsOpen(true)}} onClose={()=>{setIsOpen(false)}} >
      {adminUIShops.map((shop) => {
        const customLogoFromUpload = shop.brandAssets && shop.brandAssets.navbarBrandImage && shop.brandAssets.navbarBrandImage.large;
        const customLogoFromUrlInput = shop.shopLogoUrls && shop.shopLogoUrls.primaryShopLogoUrl;
        // Replace only the first segment of the URL with the shop ID and keep the rest (if any)
        const linkUrl = location.pathname.replace(/(\/.[^/]*(\/.*)?)/g, (match, firstUrlSegment, restOfUrl) => `/${shop._id}${restOfUrl || ""}`);

        return (
          <MenuItem className={classes.menuItem} value={shop._id} key={shop._id}>
            <Link
              className={classNames(classes.root, className)}
              to={linkUrl}
            >
              <img
                alt={shop.name}
                className={classes.logo}
                src={customLogoFromUrlInput || customLogoFromUpload || defaultLogo}
                width={size}
              />

              {!isOpen &&
                  <Logo>
                    <Link to='/'>
                      <LogoImage src={Logoimage} alt='pickbazar-admin' />
                    </Link>
                  </Logo>
              }
              {isOpen &&
                  <Typography
                    variant="h4"
                    component="span"
                  >
                    {shop.name}
                  </Typography>
              }
            </Link>
          </MenuItem>
        );
      })}
      <MenuItem className={classes.menuItem} value="onboarding" key="onboarding">
        <Link
          className={classNames([classes.root, className, classes.newShopLink])}
          to={"/onboarding"}
        >
          <div className={classNames([classes.logo, classes.plusIcon])} style={{ width: size }}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <Typography
            variant="h4"
            component="span"
          >
            New Shop
          </Typography>
        </Link>
      </MenuItem>
    </Select>
  );
}

ShopSelectorWithData.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  linkTo: PropTypes.string,
  shopId: PropTypes.string,
  shouldShowShopName: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  viewer: PropTypes.object
};

ShopSelectorWithData.defaultProps = {
  linkTo: "/",
  shouldShowShopName: false,
  size: 60
};

export default compose(
  withComponents,
  withStyles(styles, { name: "RuiShopSelectorWithData" })
)(ShopSelectorWithData);
