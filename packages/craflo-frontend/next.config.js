const path = require("path");
const appConfig = require("./config");
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
// const withCss = require('@zeit/next-css')
// const withPurgeCss = require('next-purgecss')
const withMDX = require('@next/mdx')({pageExtensions: ['js','jsx','ts','tsx','mdx']})

// const { merge } = require("webpack-merge");
// const paperbits = require('./paperbits/webpack.develop')

// const {
//   PHASE_PRODUCTION_BUILD,
// } = require('next/constants');

// withCSS config
// const cssConfig = {
//   cssModules: true,
//   importLoaders: 1,
//   cssLoaderOptions: {
//     localIdentName: '[path]___[local]___[hash:base64:5]',
//   },
//   [PHASE_PRODUCTION_BUILD]: {
//     cssLoaderOptions: {
//       localIdentName: '[hash:base64:8]',
//     },
//   },
// };

// purgecss config, only used in production.
const purgeCssConfig = {
  purgeCssEnabled: ({dev}) => !dev,
};
const CopyPlugin = require('copy-webpack-plugin');

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
  images: {
    domains: [
      'api.craflo.com',
      'media.gettyimages.com',
      'img0.etsystatic.com',
      'img1.etsystatic.com',
      'img2.etsystatic.com',
      'img3.etsystatic.com',
      'img4.etsystatic.com',
      'img5.etsystatic.com',
      'img6.etsystatic.com',
      'www.artwaley.com',
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh1.googleusercontent.com',
      'lh2.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com',
      'lh7.googleusercontent.com',
      'lh8.googleusercontent.com',
      'lh9.googleusercontent.com',
      'lh0.googleusercontent.com'
    ]
  },
  webpack: (webpackConfig) => {


    // let webpackConfig = config
    // Move Preact into the framework chunk instead of duplicating in routes:
    // const splitChunks = webpackConfig.optimization && webpackConfig.optimization.splitChunks
    // if (splitChunks) {
    //   const cacheGroups = splitChunks.cacheGroups
    //   const test = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/
    //   if (cacheGroups.framework) {
    //     cacheGroups.preact = Object.assign({}, cacheGroups.framework, { test })
    //     // if you want to merge the 2 small commons+framework chunks:
    //     // cacheGroups.commons.name = 'framework';
    //   }
    // }
    //
    // if (isServer) {
    //   // mark `preact` stuffs as external for server bundle to prevent duplicate copies of preact
    //   webpackConfig.externals.push(
    //     /^(preact|preact-render-to-string|preact-context-provider)([\\/]|$)/
    //   )
    // }
    //
    // // Install webpack aliases:
    // webpackConfig.resolve.alias['deepmerge'] = 'deepmerge/dist/umd.js'

    // const aliases = webpackConfig.resolve.alias || (webpackConfig.resolve.alias = {})
    // aliases.react = aliases['react-dom'] = 'preact/compat'
    //
    // // Automatically inject Preact DevTools:
    // if (dev && !isServer) {
    //   const entry = webpackConfig.entry
    //   webpackConfig.entry = () =>
    //     entry().then((entries) => {
    //       entries['main.js'] = ['preact/debug'].concat(entries['main.js'] || [])
    //       return entries
    //     })
    // }

    // webpackConfig.entry["styles/theme"] = `src/paperbits/themes/website/styles/styles.design.scss`;
    // webpackConfig.output["filename"] = "./[name].js"
    // webpackConfig.entry["editors/scripts/paperbits"] = ["src/paperbits/startup.design.ts"]
    // webpackConfig.entry["editors/styles/paperbits"] = [`src/paperbits/themes/designer/styles/styles.scss`]
    // webpackConfig.plugins.push(new CopyPlugin({
    //   patterns: [
    //     { from: path.join(__dirname,'paperbit-dist'), to: path.join(__dirname,'static/paperbits') },
    //   ],
    // }))
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

    //
    webpackConfig.module.rules.push(
      {
        test: /\.(raw|liquid)$/,
        loader: "raw-loader",
        include: [
          path.resolve(__dirname, "paperbits"),
          path.resolve(__dirname, '@paperbits/')
        ]
      })
    //
    // webpackConfig.module.rules.push({
    //   test: /\.tsx?$/,
    //   include: [
    //     // path.resolve(__dirname, "src/paperbits"),
    //     path.resolve(__dirname, '@paperbits/')
    //   ],
    //   // loader: 'babel-loader',
    //   // options: {
    //   //   presets: ['@babel/preset-env']
    //   // },
    //   loader: "awesome-typescript-loader"
    //   // options:{
    //   //   allowTsInNodeModules: true
    //   // }
    // })
    // webpackConfig.module.rules.push(
    //   {
    //     test: /\.scss$/,
    //     use: [
    //       MiniCssExtractPlugin.loader,
    //       { loader: "css-loader", options: { url: false } },
    //       { loader: "postcss-loader" },
    //       { loader: "sass-loader" }
    //     ],
    //     include: [
    //       path.resolve(__dirname, "paperbits")
    //     ]
    //   })

    //
    webpackConfig.module.rules.push(
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          esModule: true,
          minimize: {
            removeComments: false,
            collapseWhitespace: false
          }
        },
        include: [
          path.resolve(__dirname, "paperbits"),
          path.resolve(__dirname, '@paperbits/')
        ]
      })
    // webpackConfig.module.rules.push(
    //   {
    //     test: /\.(png|woff|woff2|eot|ttf|svg)$/,
    //     loader: "url-loader",
    //     options: {
    //       limit: 10000
    //     },
    //     include: [
    //       path.resolve(__dirname, "src/paperbits"),
    //       path.resolve(__dirname, '@paperbits/')
    //     ]
    //   })



    // Duplicate versions of the styled-components package were being loaded, this config removes the duplication.
    // It creates an alias to import the es modules version of the styled-components package.
    // This is a workaround until the root issue is resolved: https://github.com/webpack/webpack/issues/9329

    webpackConfig.resolve.alias["styled-components"] = "styled-components/dist/styled-components.browser.esm.js";

    // webpackConfig.resolve.alias.react = "preact/compat"
    // webpackConfig.resolve.alias["react-dom"] = "preact/compat"
    // webpackConfig.resolve.alias["react-ssr-prepass"] = "preact-ssr-prepass"
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

    // console.log(webpackConfig)
    // console.log()
    return webpackConfig
    // return  merge(webpackConfig, ...paperbits)

  },
  async redirects() {
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
    async rewrites() {
      return [
        // Shop
        {
          source: '/@:shop',
          destination: '/shop/:shop'
        },

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
};

module.exports = withPlugins([
  withImages,
  withMDX
], nextConfig);
