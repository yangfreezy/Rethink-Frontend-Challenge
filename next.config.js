const withCSS = require("@zeit/next-css");
const pipe = require("lodash/fp/pipe");

module.exports = pipe(withCSS)({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]"
  },
  webpack: config => {
    // Load SVGs inline
    config.module.rules.push({
      test: /\.svg$/,
      use: { loader: "svg-inline-loader", options: {} }
    });

    return config;
  },
  babel: config => {
    config.presets = ["@babel/preset-env", "@babel/preset-react"];
    return config;
  }
});
