
module.exports = function (api) {
  api.cache(true);

  const presets = ['next/babel', '@babel/preset-react'];
  const plugins = [
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
        preprocess: false
      }
    ],

    ['flow-react-proptypes', {deadCode: true, useESModules: true}],
    '@babel/plugin-proposal-optional-chaining',
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    '@babel/plugin-proposal-class-properties',
    "transform-custom-element-classes",
    "@babel/plugin-transform-classes"
  ];

  return {
    presets,
    plugins,
  };
};
