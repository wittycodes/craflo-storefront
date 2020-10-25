const path = require("path");
const appConfig = require("./config");
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withCss = require('@zeit/next-css')
const withPurgeCss = require('next-purgecss')


const {
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

// withCSS config
const cssConfig = {
  cssModules: false,
  importLoaders: 1,
  cssLoaderOptions: {
    localIdentName: '[path]___[local]___[hash:base64:5]',
  },
  [PHASE_PRODUCTION_BUILD]: {
    cssLoaderOptions: {
      localIdentName: '[hash:base64:8]',
    },
  },
};

// purgecss config, only used in production.
const purgeCssConfig = {
  purgeCssEnabled: ({dev}) => !dev,
};

// next.js configuration
const nextConfig = {
  env: {
    CANONICAL_URL: appConfig.CANONICAL_URL,
    INTERNAL_GRAPHQL_URL: appConfig.INTERNAL_GRAPHQL_URL,
    EXTERNAL_GRAPHQL_URL: appConfig.EXTERNAL_GRAPHQL_URL,
    SEGMENT_ANALYTICS_SKIP_MINIMIZE: appConfig.SEGMENT_ANALYTICS_SKIP_MINIMIZE,
    SEGMENT_ANALYTICS_WRITE_KEY: appConfig.SEGMENT_ANALYTICS_WRITE_KEY,
    STRIPE_PUBLIC_API_KEY: appConfig.STRIPE_PUBLIC_API_KEY,
    ENABLE_SPA_ROUTING: appConfig.ENABLE_SPA_ROUTING
  },
  webpack: (webpackConfig) => {
    webpackConfig.module.rules.push({
      test: /\.(gql|graphql)$/,
      loader: "graphql-tag/loader",
      exclude: ["/node_modules/", "/.next/"],
      enforce: "pre"
    });

    webpackConfig.module.rules.push({
      test: /\.mjs$/,
      type: "javascript/auto"
    });

    // Duplicate versions of the styled-components package were being loaded, this config removes the duplication.
    // It creates an alias to import the es modules version of the styled-components package.
    // This is a workaround until the root issue is resolved: https://github.com/webpack/webpack/issues/9329


    webpackConfig.resolve.alias.react = "preact/compat"
    webpackConfig.resolve.alias["react-dom"] = "preact/compat"
    webpackConfig.resolve.alias.components = path.join(__dirname, "components");
    webpackConfig.resolve.alias.containers = path.join(__dirname, "containers");
    webpackConfig.resolve.alias.context = path.join(__dirname, "context");
    webpackConfig.resolve.alias.custom = path.join(__dirname, "custom");
    webpackConfig.resolve.alias.hocs = path.join(__dirname, "hocs");
    webpackConfig.resolve.alias.hooks = path.join(__dirname, "hooks");
    webpackConfig.resolve.alias.lib = path.join(__dirname, "lib");
    webpackConfig.resolve.alias.pages = path.join(__dirname, "pages");
    webpackConfig.resolve.alias.public = path.join(__dirname, "public");
    webpackConfig.resolve.alias.static = path.join(__dirname, "static");
    webpackConfig.resolve.alias.serverUtils = path.join(__dirname, "serverUtils");
    webpackConfig.resolve.alias.translations = path.join(__dirname, "translations");
    webpackConfig.resolve.alias.routes = path.join(__dirname, "routes");
    webpackConfig.resolve.alias.utils = path.join(__dirname, "utils");
    webpackConfig.resolve.alias.staticUtils = path.join(__dirname, "staticUtils");
    webpackConfig.resolve.alias.apiUtils = path.join(__dirname, "apiUtils");

    return webpackConfig;
  },
  experimental: {
    redirects() {
      return [
        {
          source: "/graphiql",
          destination: appConfig.EXTERNAL_GRAPHQL_URL,
          permanent: true
        },
        {
          source: "/graphql-beta",
          destination: appConfig.EXTERNAL_GRAPHQL_URL,
          permanent: true
        },
        {
          source: "/graphql-alpha",
          destination: appConfig.EXTERNAL_GRAPHQL_URL,
          permanent: true
        },
        {
          source: "/graphql",
          destination: appConfig.EXTERNAL_GRAPHQL_URL,
          permanent: true
        }
      ];
    },
    rewrites() {
      return [
        // Sitemap
        {
          source: "/sitemap:subPage?.xml",
          destination: "/api/sitemap"
        },
        // Accounts
        {
          source: "/change-password",
          destination: "/api/account/changePassword"
        },
        {
          source: "/post-logout-callback",
          destination: "/api/account/postLogoutCallback"
        },
        {
          source: "/token",
          destination: "/api/account/token"
        },
        {
          source: "/signin",
          destination: "/api/account/signin"
        },
        {
          source: "/signup",
          destination: "/api/account/signup"
        },
        {
          source: "/callback",
          destination: "/api/account/callback"
        },
        {
          source: "/logout",
          destination: "/api/account/logout"
        },
        {
          source: "/refresh",
          destination: "/api/account/refresh"
        },
        {
          source: "/",
          destination: "/api/detectLanguage"
        }
      ];
    }
  }
};

module.exports = withPlugins([
  withOptimizedImages,
  // [withCss, cssConfig],
  // [withPurgeCss, purgeCssConfig]
], nextConfig);
