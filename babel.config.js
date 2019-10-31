const { findSupportedBrowsers } = require('@open-wc/building-utils');
const customMinifyCss = require('@open-wc/building-utils/custom-minify-css');

const production = !process.env.ROLLUP_WATCH;

module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: findSupportedBrowsers(),
        // preset-env compiles template literals for safari 12 due to a small bug which
        // doesn't affect most use cases. for example lit-html handles it: (https://github.com/Polymer/lit-html/issues/575)
        exclude: ['@babel/plugin-transform-template-literals'],
        useBuiltIns: false,
        modules: false,
      },
    ],
  ];
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-proposal-class-properties',
    // rollup rewrites import.meta.url, but makes them point to the file location after bundling
    // we want the location before bundling
    'bundled-import-meta',
    production && [
      'template-html-minifier',
      {
        modules: {
          'lit-html': ['html'],
          'lit-element': ['html', { name: 'css', encapsulation: 'style' }],
        },
        htmlMinifier: {
          collapseWhitespace: true,
          removeComments: true,
          caseSensitive: true,
          minifyCSS: customMinifyCss,
        },
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
