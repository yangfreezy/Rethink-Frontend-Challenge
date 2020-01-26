const withCSS = require("@zeit/next-css");
const pipe = require("lodash/fp/pipe");

module.exports = pipe(withCSS)({
  cssModules: true,

  webpack: config => {
    // Load SVGs inline
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: { loader: "svg-inline-loader", options: {} }
      }
      // {
      //   test: /\.css$/,
      //   use: { loader: "style-loader", options: {} }
      // },
      // {
      //   test: /\.css$/,
      //   use: { loader: "css-loader", options: {} }
      // }
    );
    // config.module.rules.resolve = {
    //   extensions: [".js", ".jsx", ".css"]
    // };

    return config;
  }
});
