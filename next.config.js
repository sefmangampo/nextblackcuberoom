const path = require("path");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");

module.exports = withImages(
  withSass({
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000,
          },
        },
      });

      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000,
          },
        },
      });

      return config;
    },
    cssModules: true,
  })
);

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "main.scss";`,
  },
  // {
  //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
  //   type: 'asset/resource',
  // },
  // test: /\.(jpe?g|png|gif|svg)$/i,
  // use: [
  //   {
  //     loader: "file-loader",
  //     options: {
  //       query: {
  //         name: "assets/[name].[ext]",
  //       },
  //     },
  //   },
  //   // {
  //   loader: "image-webpack-loader",
  //   options: {
  //     query: {
  //       mozjpeg: {
  //         progressive: true,
  //       },
  //       gifsicle: {
  //         interlaced: true,
  //       },
  //       optipng: {
  //         optimizationLevel: 7,
  //       },
  //     },
  //   },
  // },
  // ],
};
