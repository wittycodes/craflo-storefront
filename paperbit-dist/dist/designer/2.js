exports.ids = [2];
exports.modules = {

/***/ "./src/layouts/header/menu/auth-menu.tsx":
/*!***********************************************!*\
  !*** ./src/layouts/header/menu/auth-menu.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var components_button_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! components/button/button */ \"./src/components/button/button.tsx\");\n/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-intl */ \"react-intl\");\n/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var components_popover_popover__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! components/popover/popover */ \"./src/components/popover/popover.tsx\");\n/* harmony import */ var _authorized_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./authorized-menu */ \"./src/layouts/header/menu/authorized-menu.tsx\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_5__);\nvar _jsxFileName = \"/usr/local/src/app/src/layouts/header/menu/auth-menu.tsx\";\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\n\n\n\n\n\nconst AuthMenu = ({\n  isAuthenticated,\n  onJoin,\n  onLogout,\n  avatar\n}) => {\n  return !isAuthenticated ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_button_button__WEBPACK_IMPORTED_MODULE_1__[\"Button\"], {\n    variant: \"primary\",\n    onClick: onJoin,\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 17,\n      columnNumber: 5\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_2__[\"FormattedMessage\"], {\n    id: \"joinButton\",\n    defaultMessage: \"join\",\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 18,\n      columnNumber: 7\n    }\n  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_popover_popover__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    direction: \"right\",\n    className: \"user-pages-dropdown\",\n    handler: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_image__WEBPACK_IMPORTED_MODULE_5___default.a, {\n      src: avatar,\n      alt: \"user\",\n      __self: undefined,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 24,\n        columnNumber: 16\n      }\n    }),\n    content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_authorized_menu__WEBPACK_IMPORTED_MODULE_4__[\"AuthorizedMenu\"], {\n      onLogout: onLogout,\n      __self: undefined,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 25,\n        columnNumber: 16\n      }\n    }),\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 21,\n      columnNumber: 5\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (AuthMenu);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0cy9oZWFkZXIvbWVudS9hdXRoLW1lbnUudHN4PzIxMGQiXSwibmFtZXMiOlsiQXV0aE1lbnUiLCJpc0F1dGhlbnRpY2F0ZWQiLCJvbkpvaW4iLCJvbkxvZ291dCIsImF2YXRhciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQVNBLE1BQU1BLFFBQVEsR0FBRyxDQUFDO0FBQUVDLGlCQUFGO0FBQW1CQyxRQUFuQjtBQUEyQkMsVUFBM0I7QUFBcUNDO0FBQXJDLENBQUQsS0FBMEQ7QUFDekUsU0FBTyxDQUFDSCxlQUFELGdCQUNMLDJEQUFDLCtEQUFEO0FBQVEsV0FBTyxFQUFDLFNBQWhCO0FBQTBCLFdBQU8sRUFBRUMsTUFBbkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFDRSwyREFBQywyREFBRDtBQUFrQixNQUFFLEVBQUMsWUFBckI7QUFBa0Msa0JBQWMsRUFBQyxNQUFqRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREYsQ0FESyxnQkFLTCwyREFBQyxrRUFBRDtBQUNFLGFBQVMsRUFBQyxPQURaO0FBRUUsYUFBUyxFQUFDLHFCQUZaO0FBR0UsV0FBTyxlQUFFLDJEQUFDLGlEQUFEO0FBQU8sU0FBRyxFQUFFRSxNQUFaO0FBQW9CLFNBQUcsRUFBQyxNQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSFg7QUFJRSxXQUFPLGVBQUUsMkRBQUMsK0RBQUQ7QUFBZ0IsY0FBUSxFQUFFRCxRQUExQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSlg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUxGO0FBWUQsQ0FiRDs7QUFjZUgsdUVBQWYiLCJmaWxlIjoiLi9zcmMvbGF5b3V0cy9oZWFkZXIvbWVudS9hdXRoLW1lbnUudHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbic7XG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgUG9wb3ZlciBmcm9tICdjb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlcic7XG5pbXBvcnQgeyBBdXRob3JpemVkTWVudSB9IGZyb20gJy4vYXV0aG9yaXplZC1tZW51JztcbmltcG9ydCBJbWFnZSBmcm9tICduZXh0L2ltYWdlJ1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBpc0F1dGhlbnRpY2F0ZWQ6IGJvb2xlYW47XG4gIG9uSm9pbjogKCkgPT4gdm9pZDtcbiAgb25Mb2dvdXQ6ICgpID0+IHZvaWQ7XG4gIGF2YXRhcjogc3RyaW5nO1xufVxuXG5jb25zdCBBdXRoTWVudSA9ICh7IGlzQXV0aGVudGljYXRlZCwgb25Kb2luLCBvbkxvZ291dCwgYXZhdGFyIH06IFByb3BzKSA9PiB7XG4gIHJldHVybiAhaXNBdXRoZW50aWNhdGVkID8gKFxuICAgIDxCdXR0b24gdmFyaWFudD1cInByaW1hcnlcIiBvbkNsaWNrPXtvbkpvaW59PlxuICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJqb2luQnV0dG9uXCIgZGVmYXVsdE1lc3NhZ2U9XCJqb2luXCIgLz5cbiAgICA8L0J1dHRvbj5cbiAgKSA6IChcbiAgICA8UG9wb3ZlclxuICAgICAgZGlyZWN0aW9uPVwicmlnaHRcIlxuICAgICAgY2xhc3NOYW1lPVwidXNlci1wYWdlcy1kcm9wZG93blwiXG4gICAgICBoYW5kbGVyPXs8SW1hZ2Ugc3JjPXthdmF0YXJ9IGFsdD1cInVzZXJcIiAvPn1cbiAgICAgIGNvbnRlbnQ9ezxBdXRob3JpemVkTWVudSBvbkxvZ291dD17b25Mb2dvdXR9IC8+fVxuICAgIC8+XG4gICk7XG59O1xuZXhwb3J0IGRlZmF1bHQgQXV0aE1lbnU7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/layouts/header/menu/auth-menu.tsx\n");

/***/ }),

/***/ "./src/layouts/header/menu/authorized-menu.tsx":
/*!*****************************************************!*\
  !*** ./src/layouts/header/menu/authorized-menu.tsx ***!
  \*****************************************************/
/*! exports provided: AuthorizedMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AuthorizedMenu\", function() { return AuthorizedMenu; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-intl */ \"react-intl\");\n/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var components_nav_link_nav_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components/nav-link/nav-link */ \"./src/components/nav-link/nav-link.tsx\");\n/* harmony import */ var constants_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! constants/navigation */ \"./src/constants/navigation.ts\");\nvar _jsxFileName = \"/usr/local/src/app/src/layouts/header/menu/authorized-menu.tsx\";\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\n\n\nconst AUTHORIZED_MENU_ITEMS = [{\n  link: constants_navigation__WEBPACK_IMPORTED_MODULE_3__[\"PROFILE_PAGE\"],\n  label: 'Profile',\n  intlId: 'navlinkProfile'\n}, {\n  link: constants_navigation__WEBPACK_IMPORTED_MODULE_3__[\"PROCEED_TO_CHECKOUT_PAGE\"],\n  label: 'Checkout',\n  intlId: 'navlinkCheckout'\n}, {\n  link: constants_navigation__WEBPACK_IMPORTED_MODULE_3__[\"ALTERNATIVE_CHECKOUT_PAGE\"],\n  label: 'Checkout Alternative',\n  intlId: 'alternativeCheckout'\n}, {\n  link: constants_navigation__WEBPACK_IMPORTED_MODULE_3__[\"YOUR_ORDER\"],\n  label: 'Order',\n  intlId: 'sidebarYourOrder'\n}, {\n  link: constants_navigation__WEBPACK_IMPORTED_MODULE_3__[\"ORDER_RECEIVED\"],\n  label: 'Order invoice',\n  intlId: 'navlinkOrderReceived'\n}, {\n  link: constants_navigation__WEBPACK_IMPORTED_MODULE_3__[\"TERMS\"],\n  label: 'Terms and Services',\n  intlId: 'navlinkTermsAndServices'\n}, {\n  link: constants_navigation__WEBPACK_IMPORTED_MODULE_3__[\"PRIVACY\"],\n  label: 'Privacy Policy',\n  intlId: 'navlinkPrivacyPolicy'\n}];\nconst AuthorizedMenu = ({\n  onLogout\n}) => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, AUTHORIZED_MENU_ITEMS.map((item, idx) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_nav_link_nav_link__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    key: idx,\n    className: \"menu-item\",\n    href: item.link,\n    label: item.label,\n    intlId: item.intlId,\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 61,\n      columnNumber: 9\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"menu-item\",\n    onClick: onLogout,\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 69,\n      columnNumber: 7\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 70,\n      columnNumber: 9\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 71,\n      columnNumber: 11\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_1__[\"FormattedMessage\"], {\n    id: \"navlinkLogout\",\n    defaultMessage: \"Logout\",\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 72,\n      columnNumber: 13\n    }\n  })))));\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0cy9oZWFkZXIvbWVudS9hdXRob3JpemVkLW1lbnUudHN4P2IxOTgiXSwibmFtZXMiOlsiQVVUSE9SSVpFRF9NRU5VX0lURU1TIiwibGluayIsIlBST0ZJTEVfUEFHRSIsImxhYmVsIiwiaW50bElkIiwiUFJPQ0VFRF9UT19DSEVDS09VVF9QQUdFIiwiQUxURVJOQVRJVkVfQ0hFQ0tPVVRfUEFHRSIsIllPVVJfT1JERVIiLCJPUkRFUl9SRUNFSVZFRCIsIlRFUk1TIiwiUFJJVkFDWSIsIkF1dGhvcml6ZWRNZW51Iiwib25Mb2dvdXQiLCJtYXAiLCJpdGVtIiwiaWR4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFVQSxNQUFNQSxxQkFBcUIsR0FBRyxDQUM1QjtBQUNFQyxNQUFJLEVBQUVDLGlFQURSO0FBRUVDLE9BQUssRUFBRSxTQUZUO0FBR0VDLFFBQU0sRUFBRTtBQUhWLENBRDRCLEVBTTVCO0FBQ0VILE1BQUksRUFBRUksNkVBRFI7QUFFRUYsT0FBSyxFQUFFLFVBRlQ7QUFHRUMsUUFBTSxFQUFFO0FBSFYsQ0FONEIsRUFXNUI7QUFDRUgsTUFBSSxFQUFFSyw4RUFEUjtBQUVFSCxPQUFLLEVBQUUsc0JBRlQ7QUFHRUMsUUFBTSxFQUFFO0FBSFYsQ0FYNEIsRUFnQjVCO0FBQ0VILE1BQUksRUFBRU0sK0RBRFI7QUFFRUosT0FBSyxFQUFFLE9BRlQ7QUFHRUMsUUFBTSxFQUFFO0FBSFYsQ0FoQjRCLEVBcUI1QjtBQUNFSCxNQUFJLEVBQUVPLG1FQURSO0FBRUVMLE9BQUssRUFBRSxlQUZUO0FBR0VDLFFBQU0sRUFBRTtBQUhWLENBckI0QixFQTBCNUI7QUFDRUgsTUFBSSxFQUFFUSwwREFEUjtBQUVFTixPQUFLLEVBQUUsb0JBRlQ7QUFHRUMsUUFBTSxFQUFFO0FBSFYsQ0ExQjRCLEVBK0I1QjtBQUNFSCxNQUFJLEVBQUVTLDREQURSO0FBRUVQLE9BQUssRUFBRSxnQkFGVDtBQUdFQyxRQUFNLEVBQUU7QUFIVixDQS9CNEIsQ0FBOUI7QUEwQ08sTUFBTU8sY0FBK0IsR0FBRyxDQUFDO0FBQUVDO0FBQUYsQ0FBRCxLQUFrQjtBQUMvRCxzQkFDRSx3SEFDR1oscUJBQXFCLENBQUNhLEdBQXRCLENBQTBCLENBQUNDLElBQUQsRUFBT0MsR0FBUCxrQkFDekIsMkRBQUMsb0VBQUQ7QUFDRSxPQUFHLEVBQUVBLEdBRFA7QUFFRSxhQUFTLEVBQUMsV0FGWjtBQUdFLFFBQUksRUFBRUQsSUFBSSxDQUFDYixJQUhiO0FBSUUsU0FBSyxFQUFFYSxJQUFJLENBQUNYLEtBSmQ7QUFLRSxVQUFNLEVBQUVXLElBQUksQ0FBQ1YsTUFMZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREQsQ0FESCxlQVVFO0FBQUssYUFBUyxFQUFDLFdBQWY7QUFBMkIsV0FBTyxFQUFFUSxRQUFwQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFDRSwyREFBQywyREFBRDtBQUFrQixNQUFFLEVBQUMsZUFBckI7QUFBcUMsa0JBQWMsRUFBQyxRQUFwRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREYsQ0FERixDQURGLENBVkYsQ0FERjtBQW9CRCxDQXJCTSIsImZpbGUiOiIuL3NyYy9sYXlvdXRzL2hlYWRlci9tZW51L2F1dGhvcml6ZWQtbWVudS50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IE5hdkxpbmsgZnJvbSAnY29tcG9uZW50cy9uYXYtbGluay9uYXYtbGluayc7XG5cbmltcG9ydCB7XG4gIFBST0NFRURfVE9fQ0hFQ0tPVVRfUEFHRSxcbiAgQUxURVJOQVRJVkVfQ0hFQ0tPVVRfUEFHRSxcbiAgUFJPRklMRV9QQUdFLFxuICBPUkRFUl9SRUNFSVZFRCxcbiAgWU9VUl9PUkRFUixcbiAgVEVSTVMsXG4gIFBSSVZBQ1ksXG59IGZyb20gJ2NvbnN0YW50cy9uYXZpZ2F0aW9uJztcblxuY29uc3QgQVVUSE9SSVpFRF9NRU5VX0lURU1TID0gW1xuICB7XG4gICAgbGluazogUFJPRklMRV9QQUdFLFxuICAgIGxhYmVsOiAnUHJvZmlsZScsXG4gICAgaW50bElkOiAnbmF2bGlua1Byb2ZpbGUnLFxuICB9LFxuICB7XG4gICAgbGluazogUFJPQ0VFRF9UT19DSEVDS09VVF9QQUdFLFxuICAgIGxhYmVsOiAnQ2hlY2tvdXQnLFxuICAgIGludGxJZDogJ25hdmxpbmtDaGVja291dCcsXG4gIH0sXG4gIHtcbiAgICBsaW5rOiBBTFRFUk5BVElWRV9DSEVDS09VVF9QQUdFLFxuICAgIGxhYmVsOiAnQ2hlY2tvdXQgQWx0ZXJuYXRpdmUnLFxuICAgIGludGxJZDogJ2FsdGVybmF0aXZlQ2hlY2tvdXQnLFxuICB9LFxuICB7XG4gICAgbGluazogWU9VUl9PUkRFUixcbiAgICBsYWJlbDogJ09yZGVyJyxcbiAgICBpbnRsSWQ6ICdzaWRlYmFyWW91ck9yZGVyJyxcbiAgfSxcbiAge1xuICAgIGxpbms6IE9SREVSX1JFQ0VJVkVELFxuICAgIGxhYmVsOiAnT3JkZXIgaW52b2ljZScsXG4gICAgaW50bElkOiAnbmF2bGlua09yZGVyUmVjZWl2ZWQnLFxuICB9LFxuICB7XG4gICAgbGluazogVEVSTVMsXG4gICAgbGFiZWw6ICdUZXJtcyBhbmQgU2VydmljZXMnLFxuICAgIGludGxJZDogJ25hdmxpbmtUZXJtc0FuZFNlcnZpY2VzJyxcbiAgfSxcbiAge1xuICAgIGxpbms6IFBSSVZBQ1ksXG4gICAgbGFiZWw6ICdQcml2YWN5IFBvbGljeScsXG4gICAgaW50bElkOiAnbmF2bGlua1ByaXZhY3lQb2xpY3knLFxuICB9LFxuXTtcblxudHlwZSBQcm9wcyA9IHtcbiAgb25Mb2dvdXQ6ICgpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgQXV0aG9yaXplZE1lbnU6IFJlYWN0LkZDPFByb3BzPiA9ICh7IG9uTG9nb3V0IH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge0FVVEhPUklaRURfTUVOVV9JVEVNUy5tYXAoKGl0ZW0sIGlkeCkgPT4gKFxuICAgICAgICA8TmF2TGlua1xuICAgICAgICAgIGtleT17aWR4fVxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1lbnUtaXRlbVwiXG4gICAgICAgICAgaHJlZj17aXRlbS5saW5rfVxuICAgICAgICAgIGxhYmVsPXtpdGVtLmxhYmVsfVxuICAgICAgICAgIGludGxJZD17aXRlbS5pbnRsSWR9XG4gICAgICAgIC8+XG4gICAgICApKX1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudS1pdGVtXCIgb25DbGljaz17b25Mb2dvdXR9PlxuICAgICAgICA8YT5cbiAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwibmF2bGlua0xvZ291dFwiIGRlZmF1bHRNZXNzYWdlPVwiTG9nb3V0XCIgLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/layouts/header/menu/authorized-menu.tsx\n");

/***/ })

};;