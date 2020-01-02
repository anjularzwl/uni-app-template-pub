
let api
let appId
let siteUrl
const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {}
console.log('ext', extConfig)
// 如果ext存在
if (extConfig.apiHost) {
	api = extConfig.apiHost
	appId = extConfig.appId || extConfig.extAppid
} else {
	if (process.env.NODE_ENV === 'development') {
    // 开发环境
    // api = 'https://dev-wxapp.esenyun.com/'
//     appId = 'wx21425c2c5b9817e0' // 吐槽开发专用ID
    // appId = 'wx548a07eaf3ba54cf' // 一团麻GTD  ID
    // appId = 'wx3bc009c34c8a1040'
     // 测试环境
     api = 'https://t-wxapp.esenyun.com/'
     appId = 'wx61bb8e43195c7ac5'
//      siteUrl = 'https://t-wxapp.esenyun.com/site-test/#/'
    // 线上
    // api = 'https://wxapp.esenyun.com/'
    // appId = 'wx3bc009c34c8a1040'
  } else if (process.env.NODE_ENV === 'test') {
    // 测试环境
    api = 'https://t-wxapp.esenyun.com/'
    appId = 'wx61bb8e43195c7ac5'
  } else {
    // 生产环境
    // api = 'https://wxapp.esenyun.com/'
    // appId = 'wx3bc009c34c8a1040'
    // siteUrl = 'https://wxapp.esenyun.com/#/'
    // 预上线环境
    // api = 'https://pre-workdesk.nextxx.cn/'
    // appId = 'wx79fde49eae09a458'
    // 测试环境
    api = 'https://t-wxapp.esenyun.com/'
    // api = 'http://192.168.1.7:9091/'
    // api = 'http://esen-office.f3322.net:9091/'
    appId = 'wx61bb8e43195c7ac5'
    siteUrl = 'https://t-wxapp.esenyun.com/site-test/#/'
    // 开发环境
    // api = 'https://dev-wxapp.esenyun.com/'
    // appId = 'wx21425c2c5b9817e0' // 吐槽开发专用ID
  }
}
export default {
	extConfig,
  appId,
  siteUrl,
	API: api,
	refreshUrl: api + 'yundisk/openapi/storage/object/url?url=',
	mobileUrl: api + 'esenwxmp/openapi/ma-oauth-mobile', // 拿手机号
	checkedAccountUrl: api + 'esenwxmp/openapi/ma-users/subscribe', // 是否关注公众号接口
	updateTokenUrl: api + 'esenuaa/oauth/token', // 更新token
	profileUrl: api + 'esenaccount/openapi/sns/account?type=WECHAT', // 个人信息
	searchCompanyUrl: api + 'esencrs/openapi/qcc-master-list', // 企查查查找公司
	saveProfileUrl: api + 'esenwxmp/openapi/sns/account', // 保存个人信息
}
