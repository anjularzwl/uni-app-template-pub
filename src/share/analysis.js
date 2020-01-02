// 小程序埋点

// 序号 字段名 类型 注释
// 1 app_id string 以appkey @os的形式表示
// 2 app_name string app_id对应的app中文名称
// 3 app_version string app的应用版本号
// __source__ string 来源： ANDROID | IOS | WEB(这个是系统参数， SDK在建LogGroup时设置)

// 4 device_type string PC | ANDROID | IOS
// 5 device_id string 终端设备唯一标识符

// 6 os string 操作系统， 如: Android、 iPhone OS
// 7 os_version string 操作系统的版本
// 8 resolution string 手机或终端的屏幕分辨率
// 9 orientation string V： 竖直 | H： 水平

// 10 network_type string 根据access, acess_subtype转化后的网络类型
// 11 client_ip string 客户端IP

// 12 session_id string 用户的一次会话id
// 13 lt_user_name string 长登录会员名称， 长登录是指只要登录一次就会记住该设备最近一次登录会员， 即使该设备下一次打开App且没有登录， 其日志也会记录该设备最近一次登录会员
// 14 lt_user_id string 长登录会员id
// 15 user_id string 当前处于登录状态的用户ID
// 16 user_name string 用户名称
// 17 open_id string OPENID
// 18 tenant_id string 租户ID
// 19 tenant_name string 租户名称

// 20 event_type string pn | mt(数量统计) | dt(时间统计)
// 21 event_id string 埋点的事件ID， 事件ID为2001， page是表示当前页面， arg1表示上一个页面； 事件ID为19999， page是默认page_extend, 可埋点重写， arg1表示自定义事件名称
// 22 page string 页面
// 23 arg1 string 事件参数
// 24 arg2 string 事件参数
// 25 arg3 string 事件参数
// 26 args string 事件参数, JSON字符串
// environment string 环境参数： esentest 测试环境 esenprod 预发布环境 esenrelease 正式环境 dev 开发环境

// 27 reach_time string 到达日志服务器的时间， 此时间可作为日志时间直接使用， 格式为： yyyyMMddHHmmss
// 28 local_time string 终端时间(格式为yyyy - mm - dd hh24: mi: ss)
// 29 create_time string 终端时间(格式为数字型的unix 时间, 精确到毫秒, 可通过from_unixtime函数转换成日期)
// APP
// 30 channel string 应用分发渠道
// 31 imei string 移动设备国际身份码的缩写
// 32 imsi string 国际移动用户识别码
// 33 manufacture string 终端制造商
// 34 brand string 手机或终端的品牌
// 35 device_model string 手机或终端的机型
// 36 carrier string 移动运营商， 如： 中国移动、 中国联通、 中国电信
// 37 access string 连接的网络， 如： 2 G、 3 G、 Wi - Fi
// 38 access_subtype string 网络类型， 如： HSPA、 EVDO、 EDGE、 GPRS等
// phone_name string 终端设备名
// 39 longitude string 经度， 目前SDK没有采集， 有需求请联系我们
// 40 latitude string 纬度， 目前SDK没有采集， 有需求请联系我们
// 41 country string 根据client_ip解析出的国家或地区
// 42 province string 根据client_ip解析出的省、 直辖市、 自治区
// 43 city string 根据client_ip解析出的地级市
// 44 distinct string 根据client_ip解析出的区、 县、 县级市
// WEB / WX
// 45 browser string 浏览器名称
// 46 host string WEB服务器域名
// 47 lang string LANG
// 48 user_agent string 浏览器的User - Agent

import moment from 'moment'
import api from '@/core/api'
import http from '@/core/http'
let env    // 环境变量
let startTime  // 开始时间
let uri       // 上传url
const host = 'cn-hangzhou.log.aliyuncs.com' // endpoint
let project
// const logstore = 'web-log' // 日志名称
const logstore = 'tracking-log' // 埋点库名称
if (process.env.NODE_ENV === 'dev') {
  // 开发环境
  env = 'esendev'
  project = 'esenyun-dev'
  // api = 'https://dev-wxmp.esenyun.com/'
} else if (process.env.NODE_ENV === 'test') {
  // 测试环境
  env = 'esentest'
  project = 'esenyun-test'
} else {
  // 生产环境
  // env = 'esenrelease'
  // project = 'esenyun'
  env = 'esentest'
  project = 'esenyun-test'
}
/**
 * 获取日志的上传地址
 */

function getLogUrl() {
  uri = 'https://' + project + '.' + host + '/logstores/' + logstore + '/track?APIVersion=0.6.0&';
}
/**
 * 开始记录时间
 *
 * @return {Number}
 *
 */
function getStartTime(page) {
  const time = moment().valueOf()
  wx.setStorageSync(page, time)
}

/**
 * 离开页面时间
 *
 * @return {Number}
 *
 */
function getEndTime() {
  return moment().valueOf()
}

/**
 * 生成公共属性
 *
 * @return {Object} 公共属性
 *
 */
function getPublicProperty() {
  const device = wx.getSystemInfoSync()
  const register = wx.getStorageSync('register')
  const userInfo = wx.getStorageSync('userInfo')
  const pub = {
    app_name: api.extConfig.appName || 'NexTX客户反馈',                                     // 应用名
    app_id: api.appId,                                           // 应用id
    // __source__: 'WXAPP',                                         // 来源
    app_type: 'WXAPP',                                            // 来源
    device_type: device.system.split(' ')[0],                    // 设备类型
    os: device.system.split(' ')[0],                             // 客户端系统
    os_version: device.system.split(' ')[1],                     // 客户端系统版本
    resolution: `${device.screenWidth}*${device.screenHeight}`,  // 设备分辨率
    session_id: register.accessToken,                            // 会话id
    open_id: 'sns_wechat_' + register.unionId,                   // 用户id
    user_name: userInfo.nickName,                                // 用户名
    environment: env                                             // 环境

  }
  return pub
}

/**
 * 计算页面停留时间
 *
 * @return {String} 格式化后
 *
 */

function getTimeProperty(page) {
  console.log('startTime', wx.getStorageSync(page))
  console.log('end', getEndTime())
  const waitTime = getEndTime() - wx.getStorageSync(page)
  console.log('wait', waitTime)
  if (!wx.getStorageSync(page)) {
    return ''
  } else {
    return  waitTime 
  }
}

/**
 * 计算页面次数
 *
 * @return {String} 格式化后
 *
 */

function getTimesProperty() {
  return 'ψ$otξ1ψ$etξmt'
}

/**
 * 日志创建时间
 *
 * @return {String} 创建时间
 *
 */

function createLogTime() {
  return 'ψ$ctξ' + moment().valueOf()
}
/**
 * sessionId时间
 *
 * @return {String} sessionId时间
 *
 */

function createSessionTime() {
  return 'ψ$sIdξ' + moment().valueOf()
}

// 日志时间
  function LogTime() {
    const time = {
      reach_time: moment().format('YYYYMMDDHHmmss'),
      local_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      create_time: moment().valueOf()
    }
    return time
  }

/**
 * 事件
 *
 * @param {Object} event
 * @param {Object} event.type mt || dt
 * @param {Object} event.page 当前页
 * @return {Object} events集合
 *
 */

function createEvent(event) {
  const events = {
    event_type: event.type,
    event_id: event.id,
    page: event.page,
  }
  return events
}

/**
 * 用与业务属于扩展
 *
 * @return {String} py
 *
 */

function createEventPy(params, event) {
  console.log('paramsparams', params)
  const time = event.type === 'dt' ? getTimeProperty(event.page) : ''
  console.log('time', time)
  if (time) {
    params.time = time
  }
  const e = {
    args: JSON.stringify(params || null)
  }
  return e
}

/**
 * 上传服务器
 *
 * @param {Object} data 需要携带的参数
 * @param {Object} event 事件
 * @param {Object} params 自定义事件属性
 * @return {String} py
 *
 */

function saveAnlysis(data) {
  getLogUrl()
  let params = Object.assign({}, getPublicProperty(), createEvent(data.event), createEventPy(data.params, data.event), LogTime())
  let urlParams = ''
  const arr = Object.keys(params)
  arr.forEach((item, i) => {
    urlParams = urlParams + `${item}=${params[item]}${i === arr.length - 1 ? '' : '&'}`
  })
  // urlParams = encodeURIComponent(urlParams)
  console.log(urlParams)
  http.get(`${uri}${urlParams}`).then(res => {
  })
  return params
}

export default {
  getStartTime,
  saveAnlysis
}
