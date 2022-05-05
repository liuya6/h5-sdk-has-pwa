const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const isProduction = process.env.NODE_ENV !== "development";

module.exports = defineConfig({
  // 去除Vue打包后js目录下生成的一些.map文件，用于加速生产环境构建。
  productionSourceMap: !isProduction,
  // 默认是不编译node_modules的，开启之后会编译node_modules 目的是为了兼容
  transpileDependencies: true,

  configureWebpack: (config) => {
    if (isProduction) {
      config.plugins.push(new CompressionWebpackPlugin());
    }
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendors1: {
            name: "chunk-vendors1",
            test: /[\\/]node_modules[\\/](vue|vant)/,
            priority: 20,
            chunks: "initial",
          },
          vendors2: {
            name: "chunk-vendors2",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial",
          },
        },
      },
    };
  },

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, `./src/style/theme/index.scss`)],
    },
  },

  pwa: {
    name: "PWA",
    themeColor: "#000000",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    manifestOptions: {
      display: "standalone",
    },
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      exclude: [/\.*/],
      swSrc: "public/service-worker.js",
      importWorkboxFrom: "disabled",
      // swDest: "service-worker.js",
    },
  },

  devServer: {
    proxy: {
      "/api": {
        target: "https://lyq-music.vercel.app",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
