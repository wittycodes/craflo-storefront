"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.rawMuiTheme = exports.smallFontIconSize = exports.h1LetterSpacing = exports.h2LetterSpacing = exports.h3LetterSpacing = exports.h4LetterSpacing = exports.h5LetterSpacing = exports.h6LetterSpacing = exports.subtitle1LetterSpacing = exports.subtitle2LetterSpacing = exports.body1BoldLetterSpacing = exports.body1LetterSpacing = exports.body2LetterSpacing = exports.captionLetterSpacing = exports.fontWeightBold = exports.fontWeightSemiBold = exports.fontWeightMedium = exports.fontWeightRegular = exports.fontWeightLight = exports.defaultFontSize = exports.fontFamily = exports.detailDrawerWidth = exports.drawerWidth = exports.defaultSpacingUnit = exports.colorSecondaryMain = exports.colorPrimaryMain = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _createMuiTheme = _interopRequireDefault(require("@material-ui/core/styles/createMuiTheme"));

var _createBreakpoints = _interopRequireDefault(require("@material-ui/core/styles/createBreakpoints"));

var _defaultTheme = _interopRequireDefault(require("@material-ui/core/styles/defaultTheme"));

var _colors = _interopRequireDefault(require("./colors"));

var _toolbar, _root;

var breakpoints = (0, _createBreakpoints.default)({});
var toolbarHeight = 80;
var toolbarMobileHeight = 54; // Colors

var colorPrimaryMain = _colors.default.coolGrey;
exports.colorPrimaryMain = colorPrimaryMain;
var colorSecondaryMain = _colors.default.reactionBlue; // Spacing

exports.colorSecondaryMain = colorSecondaryMain;
var defaultSpacingUnit = 8;
exports.defaultSpacingUnit = defaultSpacingUnit;
var drawerWidth = 280;
exports.drawerWidth = drawerWidth;
var detailDrawerWidth = 400; // Typography

exports.detailDrawerWidth = detailDrawerWidth;
var fontFamily = "'Source Sans Pro', 'Helvetica Neue', Helvetica, sans-serif";
exports.fontFamily = fontFamily;
var defaultFontSize = 16;
exports.defaultFontSize = defaultFontSize;
var fontWeightLight = 400;
exports.fontWeightLight = fontWeightLight;
var fontWeightRegular = 400;
exports.fontWeightRegular = fontWeightRegular;
var fontWeightMedium = 500;
exports.fontWeightMedium = fontWeightMedium;
var fontWeightSemiBold = 600;
exports.fontWeightSemiBold = fontWeightSemiBold;
var fontWeightBold = 700; // Typography - Letter-spacing

exports.fontWeightBold = fontWeightBold;
var captionLetterSpacing = 0.28;
exports.captionLetterSpacing = captionLetterSpacing;
var body2LetterSpacing = 0.28;
exports.body2LetterSpacing = body2LetterSpacing;
var body1LetterSpacing = 0.3;
exports.body1LetterSpacing = body1LetterSpacing;
var body1BoldLetterSpacing = 0.3;
exports.body1BoldLetterSpacing = body1BoldLetterSpacing;
var subtitle2LetterSpacing = 0.24;
exports.subtitle2LetterSpacing = subtitle2LetterSpacing;
var subtitle1LetterSpacing = 0.26;
exports.subtitle1LetterSpacing = subtitle1LetterSpacing;
var h6LetterSpacing = 0.24;
exports.h6LetterSpacing = h6LetterSpacing;
var h5LetterSpacing = 0.5;
exports.h5LetterSpacing = h5LetterSpacing;
var h4LetterSpacing = 0.5;
exports.h4LetterSpacing = h4LetterSpacing;
var h3LetterSpacing = 0.42;
exports.h3LetterSpacing = h3LetterSpacing;
var h2LetterSpacing = 0.35;
exports.h2LetterSpacing = h2LetterSpacing;
var h1LetterSpacing = 0.42; // Icons

exports.h1LetterSpacing = h1LetterSpacing;
var smallFontIconSize = 17;
exports.smallFontIconSize = smallFontIconSize;
var rawMuiTheme = {
  palette: {
    colors: _colors.default,
    // TODO: De-structure these colors into various MUI properties rather than using them from this object
    primary: {
      light: _colors.default.coolGrey300,
      main: colorPrimaryMain,
      dark: _colors.default.coolGrey400
    },
    secondary: {
      light: _colors.default.coolGrey300,
      main: colorSecondaryMain,
      dark: _colors.default.coolGrey400
    },
    divider: _colors.default.black10,
    text: {
      primary: _colors.default.coolGrey500,
      secondary: _colors.default.black60,
      secondaryActive: _colors.default.white,
      active: "#8acef2"
    },
    action: {
      hover: _colors.default.reactionBlue100,
      selected: _colors.default.black10
    },
    error: {
      main: _colors.default.red
    }
  },
  typography: {
    fontSize: defaultFontSize,
    fontFamily: fontFamily,
    fontWeightLight: fontWeightLight,
    fontWeightRegular: fontWeightRegular,
    fontWeightMedium: fontWeightMedium,
    fontWeightSemiBold: fontWeightSemiBold,
    fontWeightBold: fontWeightBold,
    useNextVariants: true,
    button: {
      fontSize: defaultFontSize,
      fontWeight: fontWeightSemiBold,
      letterSpacing: body1BoldLetterSpacing,
      lineHeight: 1.5,
      textTransform: "capitalize"
    },
    h1: {
      color: _colors.default.coolGrey500,
      fontSize: defaultFontSize * 1.5,
      letterSpacing: h1LetterSpacing,
      lineHeight: 1.25
    },
    h2: {
      color: _colors.default.coolGrey500,
      fontSize: defaultFontSize * 1.25,
      letterSpacing: h2LetterSpacing,
      lineHeight: 1.5
    },
    h3: {
      color: _colors.default.coolGrey500,
      fontSize: defaultFontSize * 1.125,
      letterSpacing: h3LetterSpacing,
      lineHeight: 1.25
    },
    h4: {
      color: _colors.default.coolGrey500,
      fontSize: defaultFontSize,
      letterSpacing: h4LetterSpacing,
      lineHeight: 1.25
    },
    h5: {
      color: _colors.default.coolGrey500,
      fontSize: defaultFontSize * 0.875,
      letterSpacing: h5LetterSpacing,
      lineHeight: 1.25
    },
    h6: {
      color: _colors.default.coolGrey500,
      fontSize: defaultFontSize * 0.75,
      letterSpacing: h6LetterSpacing,
      lineHeight: 1.46
    },
    body1: {
      color: _colors.default.coolGrey500,
      fontSize: defaultFontSize,
      letterSpacing: body1LetterSpacing,
      lineHeight: 1.5
    },
    body2: {
      color: _colors.default.coolGrey500,
      fontSize: defaultFontSize * 0.875,
      letterSpacing: body2LetterSpacing,
      lineHeight: 1.25
    },
    caption: {
      color: _colors.default.coolGrey500,
      fontSize: defaultFontSize * 0.875,
      letterSpacing: captionLetterSpacing,
      lineHeight: 1.25
    },
    subtitle1: {
      color: _colors.default.coolGrey500,
      fontSize: defaultFontSize * 0.875,
      letterSpacing: subtitle1LetterSpacing,
      lineHeight: 1.71
    },
    subtitle2: {
      color: _colors.default.coolGrey500,
      fontSize: defaultFontSize * 0.75,
      letterSpacing: subtitle2LetterSpacing,
      lineHeight: 1.46
    }
  },
  shadows: ["none", "0 2px 2px 0 rgba(0, 0, 0, 0.05);", "0 3px 6px 0 rgba(0, 0, 0, 0.05);", "0 5px 10px 0 rgba(0, 0, 0, 0.05);", "0 8px 16px 0 rgba(0, 0, 0, 0.05);", "0 13px 26px 0 rgba(0, 0, 0, 0.05)", "0px 13px 26px 0 rgba(0,0,0,0.05);", "0px 13px 26px 0 rgba(0,0,0,0.05);", "0px 13px 26px 0 rgba(0,0,0,0.05);", "0px 13px 26px 0 rgba(0,0,0,0.05);", "0px 13px 26px 0 rgba(0,0,0,0.05);", "0px 13px 26px 0 rgba(0,0,0,0.05);", "0px 13px 26px 0 rgba(0,0,0,0.05);", "0px 13px 26px 0 rgba(0,0,0,0.05);", "0px 13px 26px 0 rgba(0,0,0,0.05);", "0px 13px 26px 0 rgba(0,0,0,0.05);", "0px 13px 26px 0 rgba(0,0,0,0.05);", "0px 13px 26px 0 rgba(0,0,0,0.05);", "0px 13px 26px 0 rgba(0,0,0,0.05);", "0px 13px 26px 0 rgba(0,0,0,0.05);", "0px 13px 26px 0 rgba(0,0,0,0.05);", "0px 13px 26px 0 rgba(0,0,0,0.05);", "0px 13px 26px 0 rgba(0,0,0,0.05);", "0px 13px 26px 0 rgba(0,0,0,0.05);", "0px 13px 26px 0 rgba(0,0,0,0.05);"],
  shape: {
    borderRadius: 3
  },
  dimensions: {
    drawerWidth: drawerWidth,
    detailDrawerWidth: detailDrawerWidth
  },
  mixins: {
    leadingPaddingWhenPrimaryDrawerIsOpen: {
      paddingLeft: drawerWidth + defaultSpacingUnit * 2
    },
    trailingPaddingWhenDetailDrawerIsOpen: {
      paddingRight: detailDrawerWidth + defaultSpacingUnit * 2
    },
    toolbar: (_toolbar = {
      minHeight: toolbarHeight
    }, (0, _defineProperty2.default)(_toolbar, "".concat(breakpoints.up("xs"), " and (orientation: landscape)"), {
      minHeight: toolbarMobileHeight,
      paddingLeft: defaultSpacingUnit,
      paddingRight: defaultSpacingUnit
    }), (0, _defineProperty2.default)(_toolbar, "".concat(breakpoints.up("xs"), " and (orientation: portrait)"), {
      minHeight: toolbarMobileHeight,
      paddingLeft: defaultSpacingUnit,
      paddingRight: defaultSpacingUnit
    }), (0, _defineProperty2.default)(_toolbar, breakpoints.up("sm"), {
      minHeight: toolbarHeight
    }), _toolbar)
  },
  // Override default props
  props: {
    MuiAppBar: {
      elevation: 0
    },
    MuiCardHeader: {
      titleTypographyProps: {
        display: "inline",
        variant: "h4"
      },
      subheaderTypographyProps: {
        display: "inline",
        variant: "h5"
      }
    },
    MuiDialogContentText: {
      color: "inherit"
    },
    MuiListItemText: {
      primaryTypographyProps: {
        variant: "body1"
      }
    }
  },
  // Override defined theme properties
  overrides: {
    MuiAppBar: {
      root: (_root = {
        height: toolbarHeight
      }, (0, _defineProperty2.default)(_root, "".concat(breakpoints.up("xs"), " and (orientation: landscape)"), {
        height: toolbarMobileHeight
      }), (0, _defineProperty2.default)(_root, "".concat(breakpoints.up("xs"), " and (orientation: portrait)"), {
        height: toolbarMobileHeight
      }), (0, _defineProperty2.default)(_root, breakpoints.up("sm"), {
        height: toolbarHeight
      }), _root),
      colorPrimary: {
        backgroundColor: _colors.default.white,
        borderBottom: "1px solid ".concat(_colors.default.black05)
      },
      colorSecondary: {
        backgroundColor: "#3C4950" // colors.coolGrey with 20% opacity, opaque

      },
      colorDefault: {
        backgroundColor: _colors.default.white,
        borderBottom: "1px solid ".concat(_colors.default.black05)
      }
    },
    MuiButton: {
      root: {
        lineHeight: 1.5,
        padding: "".concat(defaultSpacingUnit, "px ").concat(defaultSpacingUnit * 2, "px"),
        textTransform: "initial",
        whiteSpace: "nowrap"
      },
      text: {
        color: _colors.default.coolGrey400,
        fontWeight: fontWeightRegular,
        fontSize: defaultFontSize * 0.875,
        padding: "".concat(defaultSpacingUnit + 1.5, "px ").concat(defaultSpacingUnit * 2, "px")
      },
      outlined: {
        // Removed 1px of padding from the top/bottom to account for the border
        // which adds 1px to the top/bottom. This makes the button height even
        // with the contained variant.
        padding: "".concat(defaultSpacingUnit - 1, "px ").concat(defaultSpacingUnit * 2, "px")
      },
      outlinedPrimary: {
        border: "1px solid ".concat(colorPrimaryMain),
        color: _colors.default.coolGrey500
      },
      outlinedSecondary: {
        border: "1px solid ".concat(colorSecondaryMain)
      },
      sizeSmall: {
        fontSize: defaultFontSize * 0.875
      }
    },
    MuiButtonGroup: {
      groupedContained: {
        "&:not(:last-child)": {
          borderRight: "1px solid ".concat(_colors.default.white)
        }
      },
      groupedContainedPrimary: {
        "&:not(:last-child)": {
          borderRight: "1px solid ".concat(_colors.default.white)
        }
      },
      groupedContainedSecondary: {
        "&:not(:last-child)": {
          borderRight: "1px solid ".concat(_colors.default.white)
        }
      }
    },
    MuiCard: {
      root: {
        border: "1px solid ".concat(_colors.default.black10),
        paddingLeft: defaultSpacingUnit * 2,
        paddingRight: defaultSpacingUnit * 2,
        paddingTop: defaultSpacingUnit,
        paddingBottom: defaultSpacingUnit
      }
    },
    MuiCardHeader: {
      root: {
        paddingTop: defaultSpacingUnit * 3
      },
      title: {
        fontWeight: fontWeightSemiBold
      },
      subheader: {
        color: _colors.default.coolGrey500,
        marginLeft: defaultSpacingUnit * 2
      }
    },
    MuiCheckbox: {
      root: {
        color: _colors.default.coolGrey500
      },
      colorSecondary: {
        "&$checked": {
          color: _colors.default.coolGrey500
        },
        "&$disabled": {
          color: _colors.default.coolGrey100
        }
      }
    },
    MuiChip: {
      root: {
        fontSize: defaultFontSize * 0.875,
        letterSpacing: captionLetterSpacing,
        height: 32
      },
      deletable: {
        "&:hover": {
          cursor: "pointer"
        }
      },
      deletableColorPrimary: {
        "backgroundColor": _colors.default.black02,
        "border": "1px solid ".concat(_colors.default.coolGrey),
        "color": _colors.default.coolGrey500,
        "&:hover, &:focus, &:active": {
          backgroundColor: _colors.default.black05
        }
      },
      deleteIconColorPrimary: {
        "color": _colors.default.coolGrey,
        "fontSize": smallFontIconSize,
        "&:hover, &:focus, &:active": {
          color: _colors.default.reactionBlue500
        }
      },
      deletableColorSecondary: {
        "color": _colors.default.coolGrey500,
        "border": "1px solid ".concat(_colors.default.coolGrey300),
        "backgroundColor": _colors.default.reactionBlue100,
        "&:hover, &:focus, &:active": {
          backgroundColor: _colors.default.darkBlue100
        }
      },
      deleteIconColorSecondary: {
        "color": _colors.default.coolGrey,
        "&:hover, &:focus, &:active": {
          color: _colors.default.reactionBlue500
        }
      },
      sizeSmall: {
        height: 28
      },
      deleteIconSmall: {
        margin: "0 4px 0 0",
        fontSize: smallFontIconSize
      }
    },
    MuiDialogTitle: {
      root: {
        "padding": _defaultTheme.default.spacing(4, 4, 1, 4),
        "& h2": {
          fontWeight: fontWeightSemiBold
        }
      }
    },
    MuiDialogContent: {
      root: {
        padding: _defaultTheme.default.spacing(1, 4)
      }
    },
    MuiDialogActions: {
      root: {
        padding: _defaultTheme.default.spacing(1, 4, 4, 4)
      }
    },
    MuiDrawer: {
      paper: {
        width: drawerWidth
      },
      paperAnchorLeft: {
        border: "none",
        backgroundColor: _colors.default.darkBlue500,
        color: _colors.default.black15
      },
      paperAnchorDockedLeft: {
        border: "none",
        borderRight: "none"
      },
      paperAnchorRight: {
        border: "none",
        backgroundColor: _colors.default.black02,
        width: detailDrawerWidth
      },
      paperAnchorDockedRight: {
        border: "none"
      }
    },
    MuiExpansionPanel: {
      root: {
        "&$expanded": {
          margin: 0
        }
      }
    },
    MuiFab: {
      sizeSmall: {
        width: 36,
        height: 36
      }
    },
    MuiOutlinedInput: {
      root: {
        "&:hover $notchedOutline": {
          borderColor: _colors.default.black20
        },
        "&$focused $notchedOutline": {
          borderColor: _colors.default.reactionBlue400
        }
      },
      inputMarginDense: {
        paddingTop: 9.5,
        paddingBottom: 9.5
      }
    },
    MuiSkeleton: {
      root: {
        backgroundColor: _colors.default.black10
      }
    },
    MuiSvgIcon: {
      root: {
        // This is a hack to fix issues with the base font-size in the bootstrap
        // theme being 14px, not allowing for `pxToRem(24)` to be the correct value for MUI icons.
        // This should be revisited once the Reaction admin no longer has a need for bootstrap.
        fontSize: 24
      }
    },
    MuiTabs: {
      indicator: {
        height: 4,
        backgroundColor: _colors.default.reactionBlue400
      }
    },
    MuiTab: {
      root: {
        minHeight: 60,
        textTransform: "initial"
      }
    },
    MuiTableCell: {
      root: {
        borderBottom: "none"
      },
      sizeSmall: {
        "padding": "4px 16px 4px 16px",
        "&:last-child": {
          paddingRight: 16
        },
        "&$paddingCheckbox": {
          "padding": "4px 16px 4px   16px",
          "&:last-child": {
            paddingLeft: 12,
            paddingRight: 16
          }
        }
      },

      /* Styles applied to the root element if `padding="checkbox"`. */
      paddingCheckbox: {
        "padding": "4px 16px 4px 16px",
        "&:last-child": {
          paddingLeft: 0,
          paddingRight: 16
        }
      }
    },
    MuiPaper: {
      root: {
        border: "1px solid ".concat(_colors.default.black10)
      },
      elevation0: {
        border: "none"
      }
    }
  }
};
exports.rawMuiTheme = rawMuiTheme;

var _default = (0, _createMuiTheme.default)(rawMuiTheme);

exports.default = _default;