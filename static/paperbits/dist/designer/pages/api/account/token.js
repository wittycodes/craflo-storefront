module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/api/account/token.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * All config needed for the app should be parsed from environment variables in this file.\n * This goes for config needed in server code as well as config needed in browser code.\n * - If the config is needed in a Node js file, you should import it directly from here.\n * - If the config is needed in browser code, which may sometimes be executed in a browser\n *   and sometimes be executed on the server, you should import the config from here into\n *   next.config.js and add it to `env`.\n */\nconst envalid = __webpack_require__(/*! envalid */ \"envalid\");\n\nconst {\n  bool,\n  num,\n  port,\n  str,\n  url\n} = envalid;\n/**\n * See https://www.npmjs.com/package/envalid\n *\n * Envalid parses NODE_ENV automatically, and provides the following\n * shortcut (boolean) properties for checking its value:\n *   env.isProduction    // true if NODE_ENV === 'production'\n *   env.isTest          // true if NODE_ENV === 'test'\n *   env.isDevelopment   // true if NODE_ENV === 'development'\n *\n * Be sure to add `{ default: null }` if it should be optional.\n */\n\nmodule.exports = envalid.cleanEnv(process.env, {\n  CANONICAL_URL: url(),\n  ENABLE_SPA_ROUTING: bool({\n    default: true\n  }),\n  // must explicitly set to false to disable\n  BUILD_GRAPHQL_URL: url(),\n  EXTERNAL_GRAPHQL_URL: url(),\n  INTERNAL_GRAPHQL_URL: url(),\n  NODE_ENV: str({\n    choices: [\"development\", \"test\", \"jesttest\", \"production\"],\n    default: \"production\"\n  }),\n  OAUTH2_ADMIN_URL: str(),\n  OAUTH2_AUTH_URL: url(),\n  OAUTH2_CLIENT_ID: str(),\n  OAUTH2_CLIENT_SECRET: str(),\n  OAUTH2_IDP_PUBLIC_CHANGE_PASSWORD_URL: url(),\n  OAUTH2_IDP_HOST_URL: url(),\n  OAUTH2_PUBLIC_LOGOUT_URL: url(),\n  OAUTH2_TOKEN_URL: url(),\n  PORT: port({\n    default: 4000\n  }),\n  SEGMENT_ANALYTICS_SKIP_MINIMIZE: bool({\n    default: false\n  }),\n  SEGMENT_ANALYTICS_WRITE_KEY: str({\n    default: \"\"\n  }),\n  SESSION_MAX_AGE_MS: num({\n    default: 86400000\n  }),\n  // 24 hours\n  SESSION_SECRET: str(),\n  STRIPE_PUBLIC_API_KEY: str({\n    default: \"\"\n  }),\n  SITEMAP_MAX_AGE: num({\n    default: 43200\n  }),\n  // 12 hours\n  IS_BUILDING_NEXTJS: bool({\n    default: false\n  })\n}, {\n  // disable dotenv processing\n  dotEnvPath: null,\n  // https://www.npmjs.com/package/envalid#strict-mode\n  strict: false\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb25maWcuanM/YTFiYyJdLCJuYW1lcyI6WyJlbnZhbGlkIiwicmVxdWlyZSIsImJvb2wiLCJudW0iLCJwb3J0Iiwic3RyIiwidXJsIiwibW9kdWxlIiwiZXhwb3J0cyIsImNsZWFuRW52IiwicHJvY2VzcyIsImVudiIsIkNBTk9OSUNBTF9VUkwiLCJFTkFCTEVfU1BBX1JPVVRJTkciLCJkZWZhdWx0IiwiQlVJTERfR1JBUEhRTF9VUkwiLCJFWFRFUk5BTF9HUkFQSFFMX1VSTCIsIklOVEVSTkFMX0dSQVBIUUxfVVJMIiwiTk9ERV9FTlYiLCJjaG9pY2VzIiwiT0FVVEgyX0FETUlOX1VSTCIsIk9BVVRIMl9BVVRIX1VSTCIsIk9BVVRIMl9DTElFTlRfSUQiLCJPQVVUSDJfQ0xJRU5UX1NFQ1JFVCIsIk9BVVRIMl9JRFBfUFVCTElDX0NIQU5HRV9QQVNTV09SRF9VUkwiLCJPQVVUSDJfSURQX0hPU1RfVVJMIiwiT0FVVEgyX1BVQkxJQ19MT0dPVVRfVVJMIiwiT0FVVEgyX1RPS0VOX1VSTCIsIlBPUlQiLCJTRUdNRU5UX0FOQUxZVElDU19TS0lQX01JTklNSVpFIiwiU0VHTUVOVF9BTkFMWVRJQ1NfV1JJVEVfS0VZIiwiU0VTU0lPTl9NQVhfQUdFX01TIiwiU0VTU0lPTl9TRUNSRVQiLCJTVFJJUEVfUFVCTElDX0FQSV9LRVkiLCJTSVRFTUFQX01BWF9BR0UiLCJJU19CVUlMRElOR19ORVhUSlMiLCJkb3RFbnZQYXRoIiwic3RyaWN0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFRQSxNQUFNQSxPQUFPLEdBQUdDLG1CQUFPLENBQUMsd0JBQUQsQ0FBdkI7O0FBRUEsTUFBTTtBQUFFQyxNQUFGO0FBQVFDLEtBQVI7QUFBYUMsTUFBYjtBQUFtQkMsS0FBbkI7QUFBd0JDO0FBQXhCLElBQWdDTixPQUF0QztBQUVBOzs7Ozs7Ozs7Ozs7QUFXQU8sTUFBTSxDQUFDQyxPQUFQLEdBQWlCUixPQUFPLENBQUNTLFFBQVIsQ0FBaUJDLE9BQU8sQ0FBQ0MsR0FBekIsRUFBOEI7QUFDN0NDLGVBQWEsRUFBRU4sR0FBRyxFQUQyQjtBQUU3Q08sb0JBQWtCLEVBQUVYLElBQUksQ0FBQztBQUFFWSxXQUFPLEVBQUU7QUFBWCxHQUFELENBRnFCO0FBRUE7QUFDN0NDLG1CQUFpQixFQUFFVCxHQUFHLEVBSHVCO0FBSTdDVSxzQkFBb0IsRUFBRVYsR0FBRyxFQUpvQjtBQUs3Q1csc0JBQW9CLEVBQUVYLEdBQUcsRUFMb0I7QUFNN0NZLFVBQVEsRUFBRWIsR0FBRyxDQUFDO0FBQUVjLFdBQU8sRUFBRSxDQUFDLGFBQUQsRUFBZ0IsTUFBaEIsRUFBd0IsVUFBeEIsRUFBb0MsWUFBcEMsQ0FBWDtBQUE4REwsV0FBTyxFQUFFO0FBQXZFLEdBQUQsQ0FOZ0M7QUFPN0NNLGtCQUFnQixFQUFFZixHQUFHLEVBUHdCO0FBUTdDZ0IsaUJBQWUsRUFBRWYsR0FBRyxFQVJ5QjtBQVM3Q2dCLGtCQUFnQixFQUFFakIsR0FBRyxFQVR3QjtBQVU3Q2tCLHNCQUFvQixFQUFFbEIsR0FBRyxFQVZvQjtBQVc3Q21CLHVDQUFxQyxFQUFFbEIsR0FBRyxFQVhHO0FBWTdDbUIscUJBQW1CLEVBQUVuQixHQUFHLEVBWnFCO0FBYTdDb0IsMEJBQXdCLEVBQUVwQixHQUFHLEVBYmdCO0FBYzdDcUIsa0JBQWdCLEVBQUVyQixHQUFHLEVBZHdCO0FBZTdDc0IsTUFBSSxFQUFFeEIsSUFBSSxDQUFDO0FBQUVVLFdBQU8sRUFBRTtBQUFYLEdBQUQsQ0FmbUM7QUFnQjdDZSxpQ0FBK0IsRUFBRTNCLElBQUksQ0FBQztBQUFFWSxXQUFPLEVBQUU7QUFBWCxHQUFELENBaEJRO0FBaUI3Q2dCLDZCQUEyQixFQUFFekIsR0FBRyxDQUFDO0FBQUVTLFdBQU8sRUFBRTtBQUFYLEdBQUQsQ0FqQmE7QUFrQjdDaUIsb0JBQWtCLEVBQUU1QixHQUFHLENBQUM7QUFBRVcsV0FBTyxFQUFFO0FBQVgsR0FBRCxDQWxCc0I7QUFrQkc7QUFDaERrQixnQkFBYyxFQUFFM0IsR0FBRyxFQW5CMEI7QUFvQjdDNEIsdUJBQXFCLEVBQUU1QixHQUFHLENBQUM7QUFBRVMsV0FBTyxFQUFFO0FBQVgsR0FBRCxDQXBCbUI7QUFxQjdDb0IsaUJBQWUsRUFBRS9CLEdBQUcsQ0FBQztBQUFFVyxXQUFPLEVBQUU7QUFBWCxHQUFELENBckJ5QjtBQXFCSDtBQUMxQ3FCLG9CQUFrQixFQUFFakMsSUFBSSxDQUFDO0FBQUVZLFdBQU8sRUFBRTtBQUFYLEdBQUQ7QUF0QnFCLENBQTlCLEVBdUJkO0FBQ0Q7QUFDQXNCLFlBQVUsRUFBRSxJQUZYO0FBR0Q7QUFDQUMsUUFBTSxFQUFFO0FBSlAsQ0F2QmMsQ0FBakIiLCJmaWxlIjoiLi9jb25maWcuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEFsbCBjb25maWcgbmVlZGVkIGZvciB0aGUgYXBwIHNob3VsZCBiZSBwYXJzZWQgZnJvbSBlbnZpcm9ubWVudCB2YXJpYWJsZXMgaW4gdGhpcyBmaWxlLlxuICogVGhpcyBnb2VzIGZvciBjb25maWcgbmVlZGVkIGluIHNlcnZlciBjb2RlIGFzIHdlbGwgYXMgY29uZmlnIG5lZWRlZCBpbiBicm93c2VyIGNvZGUuXG4gKiAtIElmIHRoZSBjb25maWcgaXMgbmVlZGVkIGluIGEgTm9kZSBqcyBmaWxlLCB5b3Ugc2hvdWxkIGltcG9ydCBpdCBkaXJlY3RseSBmcm9tIGhlcmUuXG4gKiAtIElmIHRoZSBjb25maWcgaXMgbmVlZGVkIGluIGJyb3dzZXIgY29kZSwgd2hpY2ggbWF5IHNvbWV0aW1lcyBiZSBleGVjdXRlZCBpbiBhIGJyb3dzZXJcbiAqICAgYW5kIHNvbWV0aW1lcyBiZSBleGVjdXRlZCBvbiB0aGUgc2VydmVyLCB5b3Ugc2hvdWxkIGltcG9ydCB0aGUgY29uZmlnIGZyb20gaGVyZSBpbnRvXG4gKiAgIG5leHQuY29uZmlnLmpzIGFuZCBhZGQgaXQgdG8gYGVudmAuXG4gKi9cbmNvbnN0IGVudmFsaWQgPSByZXF1aXJlKFwiZW52YWxpZFwiKTtcblxuY29uc3QgeyBib29sLCBudW0sIHBvcnQsIHN0ciwgdXJsIH0gPSBlbnZhbGlkO1xuXG4vKipcbiAqIFNlZSBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9lbnZhbGlkXG4gKlxuICogRW52YWxpZCBwYXJzZXMgTk9ERV9FTlYgYXV0b21hdGljYWxseSwgYW5kIHByb3ZpZGVzIHRoZSBmb2xsb3dpbmdcbiAqIHNob3J0Y3V0IChib29sZWFuKSBwcm9wZXJ0aWVzIGZvciBjaGVja2luZyBpdHMgdmFsdWU6XG4gKiAgIGVudi5pc1Byb2R1Y3Rpb24gICAgLy8gdHJ1ZSBpZiBOT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nXG4gKiAgIGVudi5pc1Rlc3QgICAgICAgICAgLy8gdHJ1ZSBpZiBOT0RFX0VOViA9PT0gJ3Rlc3QnXG4gKiAgIGVudi5pc0RldmVsb3BtZW50ICAgLy8gdHJ1ZSBpZiBOT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50J1xuICpcbiAqIEJlIHN1cmUgdG8gYWRkIGB7IGRlZmF1bHQ6IG51bGwgfWAgaWYgaXQgc2hvdWxkIGJlIG9wdGlvbmFsLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGVudmFsaWQuY2xlYW5FbnYocHJvY2Vzcy5lbnYsIHtcbiAgQ0FOT05JQ0FMX1VSTDogdXJsKCksXG4gIEVOQUJMRV9TUEFfUk9VVElORzogYm9vbCh7IGRlZmF1bHQ6IHRydWUgfSksIC8vIG11c3QgZXhwbGljaXRseSBzZXQgdG8gZmFsc2UgdG8gZGlzYWJsZVxuICBCVUlMRF9HUkFQSFFMX1VSTDogdXJsKCksXG4gIEVYVEVSTkFMX0dSQVBIUUxfVVJMOiB1cmwoKSxcbiAgSU5URVJOQUxfR1JBUEhRTF9VUkw6IHVybCgpLFxuICBOT0RFX0VOVjogc3RyKHsgY2hvaWNlczogW1wiZGV2ZWxvcG1lbnRcIiwgXCJ0ZXN0XCIsIFwiamVzdHRlc3RcIiwgXCJwcm9kdWN0aW9uXCJdLCBkZWZhdWx0OiBcInByb2R1Y3Rpb25cIiB9KSxcbiAgT0FVVEgyX0FETUlOX1VSTDogc3RyKCksXG4gIE9BVVRIMl9BVVRIX1VSTDogdXJsKCksXG4gIE9BVVRIMl9DTElFTlRfSUQ6IHN0cigpLFxuICBPQVVUSDJfQ0xJRU5UX1NFQ1JFVDogc3RyKCksXG4gIE9BVVRIMl9JRFBfUFVCTElDX0NIQU5HRV9QQVNTV09SRF9VUkw6IHVybCgpLFxuICBPQVVUSDJfSURQX0hPU1RfVVJMOiB1cmwoKSxcbiAgT0FVVEgyX1BVQkxJQ19MT0dPVVRfVVJMOiB1cmwoKSxcbiAgT0FVVEgyX1RPS0VOX1VSTDogdXJsKCksXG4gIFBPUlQ6IHBvcnQoeyBkZWZhdWx0OiA0MDAwIH0pLFxuICBTRUdNRU5UX0FOQUxZVElDU19TS0lQX01JTklNSVpFOiBib29sKHsgZGVmYXVsdDogZmFsc2UgfSksXG4gIFNFR01FTlRfQU5BTFlUSUNTX1dSSVRFX0tFWTogc3RyKHsgZGVmYXVsdDogXCJcIiB9KSxcbiAgU0VTU0lPTl9NQVhfQUdFX01TOiBudW0oeyBkZWZhdWx0OiA4NjQwMDAwMCB9KSwgLy8gMjQgaG91cnNcbiAgU0VTU0lPTl9TRUNSRVQ6IHN0cigpLFxuICBTVFJJUEVfUFVCTElDX0FQSV9LRVk6IHN0cih7IGRlZmF1bHQ6IFwiXCIgfSksXG4gIFNJVEVNQVBfTUFYX0FHRTogbnVtKHsgZGVmYXVsdDogNDMyMDAgfSksIC8vIDEyIGhvdXJzXG4gIElTX0JVSUxESU5HX05FWFRKUzogYm9vbCh7IGRlZmF1bHQ6IGZhbHNlIH0pXG59LCB7XG4gIC8vIGRpc2FibGUgZG90ZW52IHByb2Nlc3NpbmdcbiAgZG90RW52UGF0aDogbnVsbCxcbiAgLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZW52YWxpZCNzdHJpY3QtbW9kZVxuICBzdHJpY3Q6IGZhbHNlXG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./config.js\n");

/***/ }),

/***/ "./src/pages/api/account/token.tsx":
/*!*****************************************!*\
  !*** ./src/pages/api/account/token.tsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var apiUtils_passportMiddleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apiUtils/passportMiddleware */ \"./src/reaction/apiUtils/passportMiddleware.tsx\");\n\n\nconst token = async (req, res) => {\n  req.session.redirectTo = req.headers.Referer;\n\n  if (req.session && req.session.passport) {\n    try {\n      const user = JSON.parse(req.session.passport.user);\n      const {\n        accessToken\n      } = user;\n\n      if (!accessToken) {\n        return res.status(500).send(\"User is missing credentials\");\n      }\n\n      return res.status(200).send(JSON.stringify({\n        accessToken\n      }));\n    } catch (error) {\n      return res.status(500).send(error);\n    }\n  }\n\n  return res.status(401).send(JSON.stringify({\n    error: \"No authorization data present\"\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(apiUtils_passportMiddleware__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(token));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvYXBpL2FjY291bnQvdG9rZW4udHN4PzFkNTAiXSwibmFtZXMiOlsidG9rZW4iLCJyZXEiLCJyZXMiLCJzZXNzaW9uIiwicmVkaXJlY3RUbyIsImhlYWRlcnMiLCJSZWZlcmVyIiwicGFzc3BvcnQiLCJ1c2VyIiwiSlNPTiIsInBhcnNlIiwiYWNjZXNzVG9rZW4iLCJzdGF0dXMiLCJzZW5kIiwic3RyaW5naWZ5IiwiZXJyb3IiLCJwYXNzcG9ydE1pZGRsZXdhcmUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTs7QUFFQSxNQUFNQSxLQUFLLEdBQUcsT0FBT0MsR0FBUCxFQUFZQyxHQUFaLEtBQW9CO0FBQ2hDRCxLQUFHLENBQUNFLE9BQUosQ0FBWUMsVUFBWixHQUF5QkgsR0FBRyxDQUFDSSxPQUFKLENBQVlDLE9BQXJDOztBQUNBLE1BQUlMLEdBQUcsQ0FBQ0UsT0FBSixJQUFlRixHQUFHLENBQUNFLE9BQUosQ0FBWUksUUFBL0IsRUFBeUM7QUFDdkMsUUFBSTtBQUNGLFlBQU1DLElBQUksR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdULEdBQUcsQ0FBQ0UsT0FBSixDQUFZSSxRQUFaLENBQXFCQyxJQUFoQyxDQUFiO0FBQ0EsWUFBTTtBQUFFRztBQUFGLFVBQWtCSCxJQUF4Qjs7QUFFQSxVQUFJLENBQUNHLFdBQUwsRUFBa0I7QUFDaEIsZUFBT1QsR0FBRyxDQUFDVSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUIsNkJBQXJCLENBQVA7QUFDRDs7QUFFRCxhQUFPWCxHQUFHLENBQUNVLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQkosSUFBSSxDQUFDSyxTQUFMLENBQWU7QUFBRUg7QUFBRixPQUFmLENBQXJCLENBQVA7QUFDRCxLQVRELENBU0UsT0FBT0ksS0FBUCxFQUFjO0FBQ2QsYUFBT2IsR0FBRyxDQUFDVSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUJFLEtBQXJCLENBQVA7QUFDRDtBQUNGOztBQUVELFNBQU9iLEdBQUcsQ0FBQ1UsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCSixJQUFJLENBQUNLLFNBQUwsQ0FBZTtBQUFFQyxTQUFLLEVBQUU7QUFBVCxHQUFmLENBQXJCLENBQVA7QUFDRCxDQWxCRDs7QUFvQmVDLDBJQUFrQixDQUFDaEIsS0FBRCxDQUFqQyIsImZpbGUiOiIuL3NyYy9wYWdlcy9hcGkvYWNjb3VudC90b2tlbi50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGFzc3BvcnRNaWRkbGV3YXJlIGZyb20gXCJhcGlVdGlscy9wYXNzcG9ydE1pZGRsZXdhcmVcIjtcblxuY29uc3QgdG9rZW4gPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgcmVxLnNlc3Npb24ucmVkaXJlY3RUbyA9IHJlcS5oZWFkZXJzLlJlZmVyZXI7XG4gIGlmIChyZXEuc2Vzc2lvbiAmJiByZXEuc2Vzc2lvbi5wYXNzcG9ydCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1c2VyID0gSlNPTi5wYXJzZShyZXEuc2Vzc2lvbi5wYXNzcG9ydC51c2VyKTtcbiAgICAgIGNvbnN0IHsgYWNjZXNzVG9rZW4gfSA9IHVzZXI7XG5cbiAgICAgIGlmICghYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKFwiVXNlciBpcyBtaXNzaW5nIGNyZWRlbnRpYWxzXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLnNlbmQoSlNPTi5zdHJpbmdpZnkoeyBhY2Nlc3NUb2tlbiB9KSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuc2VuZChlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5zZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IFwiTm8gYXV0aG9yaXphdGlvbiBkYXRhIHByZXNlbnRcIiB9KSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwYXNzcG9ydE1pZGRsZXdhcmUodG9rZW4pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/api/account/token.tsx\n");

/***/ }),

/***/ "./src/reaction/apiUtils/passportMiddleware.tsx":
/*!******************************************************!*\
  !*** ./src/reaction/apiUtils/passportMiddleware.tsx ***!
  \******************************************************/
/*! exports provided: passport, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var passport_oauth2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passport-oauth2 */ \"passport-oauth2\");\n/* harmony import */ var passport_oauth2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport_oauth2__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var client_sessions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! client-sessions */ \"client-sessions\");\n/* harmony import */ var client_sessions__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(client_sessions__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var config_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! config.js */ \"./config.js\");\n/* harmony import */ var config_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(config_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _redirect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./redirect */ \"./src/reaction/apiUtils/redirect.tsx\");\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"passport\", function() { return passport__WEBPACK_IMPORTED_MODULE_1___default.a; });\n\n\n\n\n\n\nlet baseUrl = config_js__WEBPACK_IMPORTED_MODULE_3___default.a.CANONICAL_URL;\nif (!baseUrl.endsWith(\"/\")) baseUrl = `${baseUrl}/`;\nconst oauthRedirectUrl = `${baseUrl}callback`; // This is needed to allow custom parameters (e.g. loginActions) to be included\n// when requesting authorization. This is setup to allow only loginAction to pass through\n\npassport_oauth2__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.authorizationParams = function (options = {}) {\n  return {\n    loginAction: options.loginAction\n  };\n};\n\npassport__WEBPACK_IMPORTED_MODULE_1___default.a.use(\"oauth2\", new passport_oauth2__WEBPACK_IMPORTED_MODULE_0___default.a({\n  authorizationURL: config_js__WEBPACK_IMPORTED_MODULE_3___default.a.OAUTH2_AUTH_URL,\n  tokenURL: config_js__WEBPACK_IMPORTED_MODULE_3___default.a.OAUTH2_TOKEN_URL,\n  clientID: config_js__WEBPACK_IMPORTED_MODULE_3___default.a.OAUTH2_CLIENT_ID,\n  clientSecret: config_js__WEBPACK_IMPORTED_MODULE_3___default.a.OAUTH2_CLIENT_SECRET,\n  callbackURL: oauthRedirectUrl,\n  state: true,\n  scope: [\"offline\", \"openid\"]\n}, (accessToken, refreshToken, params, profile, cb) => {\n  cb(null, {\n    accessToken,\n    refreshToken,\n    idToken: params.id_token\n  });\n}));\npassport__WEBPACK_IMPORTED_MODULE_1___default.a.serializeUser((user, done) => {\n  done(null, JSON.stringify(user));\n});\npassport__WEBPACK_IMPORTED_MODULE_1___default.a.deserializeUser((user, done) => {\n  done(null, JSON.parse(user));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (handler => (req, res) => {\n  if (!res.redirect) {\n    res.redirect = location => Object(_redirect__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(res, 302, location);\n  }\n\n  client_sessions__WEBPACK_IMPORTED_MODULE_2___default()({\n    cookieName: \"session\",\n    // This name is required so passport picks it up correctly\n    secret: config_js__WEBPACK_IMPORTED_MODULE_3___default.a.SESSION_SECRET,\n    duration: config_js__WEBPACK_IMPORTED_MODULE_3___default.a.SESSION_MAX_AGE_MS\n  })(req, res, () => passport__WEBPACK_IMPORTED_MODULE_1___default.a.initialize()(req, res, () => passport__WEBPACK_IMPORTED_MODULE_1___default.a.session()(req, res, () => handler(req, res))));\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3Rpb24vYXBpVXRpbHMvcGFzc3BvcnRNaWRkbGV3YXJlLnRzeD81MmY4Il0sIm5hbWVzIjpbImJhc2VVcmwiLCJhcHBDb25maWciLCJDQU5PTklDQUxfVVJMIiwiZW5kc1dpdGgiLCJvYXV0aFJlZGlyZWN0VXJsIiwiT0F1dGgyU3RyYXRlZ3kiLCJwcm90b3R5cGUiLCJhdXRob3JpemF0aW9uUGFyYW1zIiwib3B0aW9ucyIsImxvZ2luQWN0aW9uIiwicGFzc3BvcnQiLCJ1c2UiLCJhdXRob3JpemF0aW9uVVJMIiwiT0FVVEgyX0FVVEhfVVJMIiwidG9rZW5VUkwiLCJPQVVUSDJfVE9LRU5fVVJMIiwiY2xpZW50SUQiLCJPQVVUSDJfQ0xJRU5UX0lEIiwiY2xpZW50U2VjcmV0IiwiT0FVVEgyX0NMSUVOVF9TRUNSRVQiLCJjYWxsYmFja1VSTCIsInN0YXRlIiwic2NvcGUiLCJhY2Nlc3NUb2tlbiIsInJlZnJlc2hUb2tlbiIsInBhcmFtcyIsInByb2ZpbGUiLCJjYiIsImlkVG9rZW4iLCJpZF90b2tlbiIsInNlcmlhbGl6ZVVzZXIiLCJ1c2VyIiwiZG9uZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJkZXNlcmlhbGl6ZVVzZXIiLCJwYXJzZSIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJyZWRpcmVjdCIsImxvY2F0aW9uIiwic2Vzc2lvbnMiLCJjb29raWVOYW1lIiwic2VjcmV0IiwiU0VTU0lPTl9TRUNSRVQiLCJkdXJhdGlvbiIsIlNFU1NJT05fTUFYX0FHRV9NUyIsImluaXRpYWxpemUiLCJzZXNzaW9uIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUEsSUFBSUEsT0FBTyxHQUFHQyxnREFBUyxDQUFDQyxhQUF4QjtBQUNBLElBQUksQ0FBQ0YsT0FBTyxDQUFDRyxRQUFSLENBQWlCLEdBQWpCLENBQUwsRUFBNEJILE9BQU8sR0FBSSxHQUFFQSxPQUFRLEdBQXJCO0FBRTVCLE1BQU1JLGdCQUFnQixHQUFJLEdBQUVKLE9BQVEsVUFBcEMsQyxDQUVBO0FBQ0E7O0FBQ0FLLHNEQUFjLENBQUNDLFNBQWYsQ0FBeUJDLG1CQUF6QixHQUErQyxVQUFVQyxPQUFPLEdBQUcsRUFBcEIsRUFBd0I7QUFDckUsU0FBTztBQUFFQyxlQUFXLEVBQUVELE9BQU8sQ0FBQ0M7QUFBdkIsR0FBUDtBQUNELENBRkQ7O0FBSUFDLCtDQUFRLENBQUNDLEdBQVQsQ0FBYSxRQUFiLEVBQXVCLElBQUlOLHNEQUFKLENBQW1CO0FBQ3hDTyxrQkFBZ0IsRUFBRVgsZ0RBQVMsQ0FBQ1ksZUFEWTtBQUV4Q0MsVUFBUSxFQUFFYixnREFBUyxDQUFDYyxnQkFGb0I7QUFHeENDLFVBQVEsRUFBRWYsZ0RBQVMsQ0FBQ2dCLGdCQUhvQjtBQUl4Q0MsY0FBWSxFQUFFakIsZ0RBQVMsQ0FBQ2tCLG9CQUpnQjtBQUt4Q0MsYUFBVyxFQUFFaEIsZ0JBTDJCO0FBTXhDaUIsT0FBSyxFQUFFLElBTmlDO0FBT3hDQyxPQUFLLEVBQUUsQ0FBQyxTQUFELEVBQVksUUFBWjtBQVBpQyxDQUFuQixFQVFwQixDQUFDQyxXQUFELEVBQWNDLFlBQWQsRUFBNEJDLE1BQTVCLEVBQW9DQyxPQUFwQyxFQUE2Q0MsRUFBN0MsS0FBb0Q7QUFDckRBLElBQUUsQ0FBQyxJQUFELEVBQU87QUFBRUosZUFBRjtBQUFlQyxnQkFBZjtBQUE2QkksV0FBTyxFQUFFSCxNQUFNLENBQUNJO0FBQTdDLEdBQVAsQ0FBRjtBQUNELENBVnNCLENBQXZCO0FBWUFuQiwrQ0FBUSxDQUFDb0IsYUFBVCxDQUF1QixDQUFDQyxJQUFELEVBQU9DLElBQVAsS0FBZ0I7QUFDckNBLE1BQUksQ0FBQyxJQUFELEVBQU9DLElBQUksQ0FBQ0MsU0FBTCxDQUFlSCxJQUFmLENBQVAsQ0FBSjtBQUNELENBRkQ7QUFJQXJCLCtDQUFRLENBQUN5QixlQUFULENBQXlCLENBQUNKLElBQUQsRUFBT0MsSUFBUCxLQUFnQjtBQUN2Q0EsTUFBSSxDQUFDLElBQUQsRUFBT0MsSUFBSSxDQUFDRyxLQUFMLENBQVdMLElBQVgsQ0FBUCxDQUFKO0FBQ0QsQ0FGRDtBQUlnQk0sc0VBQUQsSUFBYSxDQUFDQyxHQUFELEVBQU1DLEdBQU4sS0FBYztBQUN4QyxNQUFJLENBQUNBLEdBQUcsQ0FBQ0MsUUFBVCxFQUFtQjtBQUNqQkQsT0FBRyxDQUFDQyxRQUFKLEdBQWdCQyxRQUFELElBQWNELHlEQUFRLENBQUNELEdBQUQsRUFBTSxHQUFOLEVBQVdFLFFBQVgsQ0FBckM7QUFDRDs7QUFDREMsd0RBQVEsQ0FBQztBQUNQQyxjQUFVLEVBQUUsU0FETDtBQUNnQjtBQUN2QkMsVUFBTSxFQUFFM0MsZ0RBQVMsQ0FBQzRDLGNBRlg7QUFHUEMsWUFBUSxFQUFFN0MsZ0RBQVMsQ0FBQzhDO0FBSGIsR0FBRCxDQUFSLENBSUdULEdBSkgsRUFJUUMsR0FKUixFQUlhLE1BQ1g3QiwrQ0FBUSxDQUFDc0MsVUFBVCxHQUFzQlYsR0FBdEIsRUFBMkJDLEdBQTNCLEVBQWdDLE1BQzlCN0IsK0NBQVEsQ0FBQ3VDLE9BQVQsR0FBbUJYLEdBQW5CLEVBQXdCQyxHQUF4QixFQUE2QixNQUMzQkYsT0FBTyxDQUFDQyxHQUFELEVBQU1DLEdBQU4sQ0FEVCxDQURGLENBTEY7QUFRRCxDQVpEIiwiZmlsZSI6Ii4vc3JjL3JlYWN0aW9uL2FwaVV0aWxzL3Bhc3Nwb3J0TWlkZGxld2FyZS50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT0F1dGgyU3RyYXRlZ3kgZnJvbSBcInBhc3Nwb3J0LW9hdXRoMlwiO1xuaW1wb3J0IHBhc3Nwb3J0IGZyb20gXCJwYXNzcG9ydFwiO1xuaW1wb3J0IHNlc3Npb25zIGZyb20gXCJjbGllbnQtc2Vzc2lvbnNcIjtcbmltcG9ydCBhcHBDb25maWcgZnJvbSBcImNvbmZpZy5qc1wiO1xuaW1wb3J0IHJlZGlyZWN0IGZyb20gXCIuL3JlZGlyZWN0XCI7XG5cbmV4cG9ydCB7IGRlZmF1bHQgYXMgcGFzc3BvcnQgfSBmcm9tIFwicGFzc3BvcnRcIjtcblxubGV0IGJhc2VVcmwgPSBhcHBDb25maWcuQ0FOT05JQ0FMX1VSTDtcbmlmICghYmFzZVVybC5lbmRzV2l0aChcIi9cIikpIGJhc2VVcmwgPSBgJHtiYXNlVXJsfS9gO1xuXG5jb25zdCBvYXV0aFJlZGlyZWN0VXJsID0gYCR7YmFzZVVybH1jYWxsYmFja2A7XG5cbi8vIFRoaXMgaXMgbmVlZGVkIHRvIGFsbG93IGN1c3RvbSBwYXJhbWV0ZXJzIChlLmcuIGxvZ2luQWN0aW9ucykgdG8gYmUgaW5jbHVkZWRcbi8vIHdoZW4gcmVxdWVzdGluZyBhdXRob3JpemF0aW9uLiBUaGlzIGlzIHNldHVwIHRvIGFsbG93IG9ubHkgbG9naW5BY3Rpb24gdG8gcGFzcyB0aHJvdWdoXG5PQXV0aDJTdHJhdGVneS5wcm90b3R5cGUuYXV0aG9yaXphdGlvblBhcmFtcyA9IGZ1bmN0aW9uIChvcHRpb25zID0ge30pIHtcbiAgcmV0dXJuIHsgbG9naW5BY3Rpb246IG9wdGlvbnMubG9naW5BY3Rpb24gfTtcbn07XG5cbnBhc3Nwb3J0LnVzZShcIm9hdXRoMlwiLCBuZXcgT0F1dGgyU3RyYXRlZ3koe1xuICBhdXRob3JpemF0aW9uVVJMOiBhcHBDb25maWcuT0FVVEgyX0FVVEhfVVJMLFxuICB0b2tlblVSTDogYXBwQ29uZmlnLk9BVVRIMl9UT0tFTl9VUkwsXG4gIGNsaWVudElEOiBhcHBDb25maWcuT0FVVEgyX0NMSUVOVF9JRCxcbiAgY2xpZW50U2VjcmV0OiBhcHBDb25maWcuT0FVVEgyX0NMSUVOVF9TRUNSRVQsXG4gIGNhbGxiYWNrVVJMOiBvYXV0aFJlZGlyZWN0VXJsLFxuICBzdGF0ZTogdHJ1ZSxcbiAgc2NvcGU6IFtcIm9mZmxpbmVcIiwgXCJvcGVuaWRcIl1cbn0sIChhY2Nlc3NUb2tlbiwgcmVmcmVzaFRva2VuLCBwYXJhbXMsIHByb2ZpbGUsIGNiKSA9PiB7XG4gIGNiKG51bGwsIHsgYWNjZXNzVG9rZW4sIHJlZnJlc2hUb2tlbiwgaWRUb2tlbjogcGFyYW1zLmlkX3Rva2VuIH0pO1xufSkpO1xuXG5wYXNzcG9ydC5zZXJpYWxpemVVc2VyKCh1c2VyLCBkb25lKSA9PiB7XG4gIGRvbmUobnVsbCwgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xufSk7XG5cbnBhc3Nwb3J0LmRlc2VyaWFsaXplVXNlcigodXNlciwgZG9uZSkgPT4ge1xuICBkb25lKG51bGwsIEpTT04ucGFyc2UodXNlcikpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IChoYW5kbGVyKSA9PiAocmVxLCByZXMpID0+IHtcbiAgaWYgKCFyZXMucmVkaXJlY3QpIHtcbiAgICByZXMucmVkaXJlY3QgPSAobG9jYXRpb24pID0+IHJlZGlyZWN0KHJlcywgMzAyLCBsb2NhdGlvbik7XG4gIH1cbiAgc2Vzc2lvbnMoe1xuICAgIGNvb2tpZU5hbWU6IFwic2Vzc2lvblwiLCAvLyBUaGlzIG5hbWUgaXMgcmVxdWlyZWQgc28gcGFzc3BvcnQgcGlja3MgaXQgdXAgY29ycmVjdGx5XG4gICAgc2VjcmV0OiBhcHBDb25maWcuU0VTU0lPTl9TRUNSRVQsXG4gICAgZHVyYXRpb246IGFwcENvbmZpZy5TRVNTSU9OX01BWF9BR0VfTVNcbiAgfSkocmVxLCByZXMsICgpID0+XG4gICAgcGFzc3BvcnQuaW5pdGlhbGl6ZSgpKHJlcSwgcmVzLCAoKSA9PlxuICAgICAgcGFzc3BvcnQuc2Vzc2lvbigpKHJlcSwgcmVzLCAoKSA9PlxuICAgICAgICBoYW5kbGVyKHJlcSwgcmVzKSkpKTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/reaction/apiUtils/passportMiddleware.tsx\n");

/***/ }),

/***/ "./src/reaction/apiUtils/redirect.tsx":
/*!********************************************!*\
  !*** ./src/reaction/apiUtils/redirect.tsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return redirect; });\n/**\n * Redirects to a new given location\n *\n * @param {Object} res  - response\n * @param {String} statusCode  - HTTP response status code\n * @param {String} location - the new location\n * @returns {Object} the updated response object\n */\nfunction redirect(res, statusCode, location) {\n  if (!res) {\n    throw new Error(\"Response object required\");\n  }\n\n  if (!statusCode) {\n    throw new Error(\"Status code required\");\n  }\n\n  if (!location) {\n    throw new Error(\"Location required\");\n  }\n\n  res.statusCode = statusCode;\n  res.setHeader(\"Location\", location);\n  res.end();\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3Rpb24vYXBpVXRpbHMvcmVkaXJlY3QudHN4PzQ1YTgiXSwibmFtZXMiOlsicmVkaXJlY3QiLCJyZXMiLCJzdGF0dXNDb2RlIiwibG9jYXRpb24iLCJFcnJvciIsInNldEhlYWRlciIsImVuZCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBOzs7Ozs7OztBQVFlLFNBQVNBLFFBQVQsQ0FBa0JDLEdBQWxCLEVBQXVCQyxVQUF2QixFQUFtQ0MsUUFBbkMsRUFBNkM7QUFDMUQsTUFBSSxDQUFDRixHQUFMLEVBQVU7QUFDUixVQUFNLElBQUlHLEtBQUosQ0FBVSwwQkFBVixDQUFOO0FBQ0Q7O0FBRUQsTUFBSSxDQUFDRixVQUFMLEVBQWlCO0FBQ2YsVUFBTSxJQUFJRSxLQUFKLENBQVUsc0JBQVYsQ0FBTjtBQUNEOztBQUVELE1BQUksQ0FBQ0QsUUFBTCxFQUFlO0FBQ2IsVUFBTSxJQUFJQyxLQUFKLENBQVUsbUJBQVYsQ0FBTjtBQUNEOztBQUVESCxLQUFHLENBQUNDLFVBQUosR0FBaUJBLFVBQWpCO0FBQ0FELEtBQUcsQ0FBQ0ksU0FBSixDQUFjLFVBQWQsRUFBMEJGLFFBQTFCO0FBQ0FGLEtBQUcsQ0FBQ0ssR0FBSjtBQUNEIiwiZmlsZSI6Ii4vc3JjL3JlYWN0aW9uL2FwaVV0aWxzL3JlZGlyZWN0LnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVkaXJlY3RzIHRvIGEgbmV3IGdpdmVuIGxvY2F0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJlcyAgLSByZXNwb25zZVxuICogQHBhcmFtIHtTdHJpbmd9IHN0YXR1c0NvZGUgIC0gSFRUUCByZXNwb25zZSBzdGF0dXMgY29kZVxuICogQHBhcmFtIHtTdHJpbmd9IGxvY2F0aW9uIC0gdGhlIG5ldyBsb2NhdGlvblxuICogQHJldHVybnMge09iamVjdH0gdGhlIHVwZGF0ZWQgcmVzcG9uc2Ugb2JqZWN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZGlyZWN0KHJlcywgc3RhdHVzQ29kZSwgbG9jYXRpb24pIHtcbiAgaWYgKCFyZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZXNwb25zZSBvYmplY3QgcmVxdWlyZWRcIik7XG4gIH1cblxuICBpZiAoIXN0YXR1c0NvZGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdGF0dXMgY29kZSByZXF1aXJlZFwiKTtcbiAgfVxuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2NhdGlvbiByZXF1aXJlZFwiKTtcbiAgfVxuXG4gIHJlcy5zdGF0dXNDb2RlID0gc3RhdHVzQ29kZTtcbiAgcmVzLnNldEhlYWRlcihcIkxvY2F0aW9uXCIsIGxvY2F0aW9uKTtcbiAgcmVzLmVuZCgpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/reaction/apiUtils/redirect.tsx\n");

/***/ }),

/***/ "client-sessions":
/*!**********************************!*\
  !*** external "client-sessions" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"client-sessions\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjbGllbnQtc2Vzc2lvbnNcIj9mZmRmIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImNsaWVudC1zZXNzaW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsaWVudC1zZXNzaW9uc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///client-sessions\n");

/***/ }),

/***/ "envalid":
/*!**************************!*\
  !*** external "envalid" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"envalid\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbnZhbGlkXCI/ZWU3NiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJlbnZhbGlkLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZW52YWxpZFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///envalid\n");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydFwiPzFlN2IiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicGFzc3BvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///passport\n");

/***/ }),

/***/ "passport-oauth2":
/*!**********************************!*\
  !*** external "passport-oauth2" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-oauth2\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydC1vYXV0aDJcIj9kNzM0Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InBhc3Nwb3J0LW9hdXRoMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0LW9hdXRoMlwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///passport-oauth2\n");

/***/ })

/******/ });