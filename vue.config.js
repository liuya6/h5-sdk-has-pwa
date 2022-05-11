const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const isProduction = process.env.NODE_ENV !== "development";

module.exports = defineConfig({
  // 去除Vue打包后js目录下生成的一些.map文件，用于加速生产环境构建。
  productionSourceMap: !isProduction,
  // 默认是不编译node_modules的，开启之后会编译node_modules 目的是为了兼容
  transpileDependencies: true,

  chainWebpack: (config) => {
    // 打包去掉console.log
    config.optimization.minimizer("terser").tap((args) => {
      Object.assign(args[0].terserOptions.compress, {
        // 生产模式 console.log 去除
        // warnings: false , // 默认 false
        // drop_console:  ,
        // drop_debugger: true, // 默认也是true
        pure_funcs: ["console.log"],
      });
      return args;
    });

    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif)(\?.*)?$/)
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({ bypassOnDebug: true })
      .end();
  },

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
