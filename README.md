# h5-sdk-no-pwa

## 安装依赖
```
yarn install
```

### 运行
```
yarn serve
```

### 打包
```
yarn build
```

### lints 和修复文件
```
yarn lint
```

### 自定义配置
See [Configuration Reference](https://cli.vuejs.org/zh/config/index.html).

### 目录结构
```text
    ├── public                     # 静态资源
    │   │── favicon.ico            # favicon图标
    │   └── index.html             # html模板
    ├── src                        # 源代码
    │   ├── api                    # 所有请求
    │   ├── assets                 # 静态资源（图片,字体等）
    │   ├── components             # 全局公用组件
    │   ├── directive              # 全局指令
    │   ├── router                 # 路由
    │   ├── store                  # 全局 store管理
    │   ├── styles                 # 全局样式
    │   ├── util                   # 全局公用方法
    │   ├── views                  # views 所有页面
    │   ├── App.vue                # 入口页面
    │   └──  main.js               # 入口文件 加载组件 初始化等
    ├── .env.xxx                   # 环境变量配置
    ├── .eslintrc.js               # eslint 配置项
    ├── tsconfig.json              # typeScript配置项
    ├── babel.config.js            # babel-loader配置
    ├── vue.config.js              # vue-cli 配置
    ├── postcss.config.js          # postcss 配置
    └── package.json               # package.json
```
