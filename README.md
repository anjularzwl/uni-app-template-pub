# uni-app 小程序模板
***

# 项目简介


## 编译
npm install

#由于小程序预览不能超过2M 所以使用build编译，（开发环境编译无法预览）

#微信小程序的编译方法
npm run build:mp-weixin 

#其它编译方式查看package.json

#第三方小程序编译（单个编译预览发布）
bash ./build/build.sh ${data}  后缀为第三方小程序的简称（ext-xs.json    xs为简称）


#第三方小程序编译（一键编译预览发布）
bash ./build/test.sh

## uni-app框架

uni-app 是一个使用 Vue.js 开发跨平台应用的前端框架，开发者编写一套代码，可编译到iOS、Android、H5、小程序等多个平台。
 [uni-app框架官网](https://uniapp.dcloud.io/)

## 小程序基础组件

- 授权组件
`props: { show: Boolean }`
`event: updateToken`
- 附件组件
`props: {`
  `// 附件列表`
  `attchList: {`
    `type: Array,`
 `   default: []`
  `},`
  `// 图片列表`
  `imgs: {`
  `  type: Array,`
  `  default: []`
  `},`
  `// 最多支持附件数`
  `max: {`
  `  type: Number,`
  `  default: 12`
  `},`
  `// 只读`
  `readonly: {`
  `  type: Boolean,`
  `  default: false`
  `}`
`},`
`event: attachChange`



