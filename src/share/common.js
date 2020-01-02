import moment from 'moment'
import pinyin from 'pinyin'
let timer = ''
/**
 * 根据音量等级转换字符串
 *
 * @param {string} num 音量的等级
 * @return {String} 音量等级的字符串
 *
 */
function adjustVoiceLevel(num) {
  num = Number(num.slice(3, 5))
  let level = ''
  if (num > 0 && num <= 10) {
    level = 'v1'
  }
  if (num > 10 && num <= 15) {
    level = 'v2'
  }
  if (num > 15 && num <= 20) {
    level = 'v3'
  }
  if (num > 20 && num <= 60) {
    level = 'v4'
  }
  return level
}
/**
 * 存formId
 *
 * @param {string} id formId
 * @return {void} 无返回值
 *
 */
function saveFromId(id) {
  let formIds = wx.getStorageSync('formId') ? wx.getStorageSync('formId') : []
  formIds.push(id)
  wx.setStorageSync('formId', formIds)
}
/**
 * 随机颜色
 *
 * @return {String} 随机颜色
 *
 */
function getRandomColor() {
  const color = ['#F1B619', '#E58F0E', '#98D3E1', '#3DACB9', '#5F5BB0', '#849A3A', '#1AA5DD', '#B05B9A', '#575757']
  return color[Math.floor(Math.random() * 8)]
}
/**
 * 名字取后两个字(个人)
 *
 * @param {string} name 名称
 * @return {String} 名字后两位字符串
 *
 */
function getShortName(name) {
  return name.substr(name.length - 2, name.length)
}

/**
 * 名字取前两个字(团队)
 *
 * @param {string} name 名称
 * @return {String} 名字前两位字符串
 *
 */
function getTeamName(name) {
  return name.substr(0, 2)
}

/**
 * 时间显示格式处理
 *
 * @param {date} date 时间
 * @return {String} 转换后的时间
 *
 */
function showDate(date) {
  let createdTime
  if (typeof date === 'number') {
    createdTime = moment.unix(date)
  } else {
    createdTime = moment(date)
  }
  console.log('xxxxxx', createdTime)
  const yesterday = moment(moment().subtract(1, 'days').format('YYYY-MM-DD') + ' 00:00:00')
  const today = moment(moment().format('YYYY-MM-DD') + ' 00:00:00')
  const tomorrow = moment(moment().add(1, 'days').format('YYYY-MM-DD') + ' 00:00:00')
  // 两分钟之内 显示刚刚
  if (moment().diff(createdTime, 'minutes') <= 2) {
    return '刚刚'
  } else if (moment().diff(createdTime, 'minutes') < 60) {
    return `${moment().diff(createdTime, 'minutes')}分钟前`
  }
  if (createdTime.diff(yesterday) > 0 && createdTime.diff(today) < 0) {
    return `昨天 ${createdTime.format('HH:mm')}`
  } else if (createdTime.diff(today) > 0 && createdTime.diff(tomorrow) < 0) {
    // return `今天 ${createdTime.format('HH:mm')}`
    return `${moment().diff(createdTime, 'hours')}小时前`
  } else {
    // console.log(moment(date).format())
    return moment(createdTime).format('YYYY-MM-DD HH:mm')
  }
}

/**
 *  格式倒计时时间
 *
 * @param {Number} num 时间
 * @return {String} 时间字符串
 *
 */
function formatTime(num) {
  num = Number(num) > 9 ? Number(num) : `0${Number(num)}`
  const stringNum = `00:${num}`
  return stringNum
}
/**
 * 电话校验
 *
 * @param {Number} num 电话
 * @return {Boolean} 是否为电话号码
 *
 */
function isPhone(num) {
  console.log(typeof num)
  if (num && num.length === 11) {
    return true
  } else {
    return false
  }
}
/**
 * 字符是否为空
 *
 * @param {any} str 字符
 * @return {Boolean} 是否为空
 *
 */
function isEmpty(str) {
  if (str && str.trim()) {
    return true
  } else {
    return false
  }
}
/**
 * 最大长度
 *
 * @param {String | Number} str 字符
 * @param {Number} len 长度
 * @return {Boolean} 是否超过设置的长度
 *
 */
function maxLength(str, len) {
  if (str && str.length <= len) {
    return true
  } else {
    return false
  }
}
/**
 * 最小长度
 *
 * @param {String | Number} str 字符
 * @param {Number} len 长度
 * @return {Boolean} 是否超过设置的长度
 *
 */
function minLength(str, len) {
  if (str && str.length >= len) {
    return true
  } else {
    return false
  }
}
/**
 * 判断星号隐私显示
 */
function privacy(name) {
  if (name && name.indexOf('*') !== -1) {
    return '1'
  } else {
    return name
  }
}
/**
 * 是否是IPhoneX
 *
 * @return {Boolean} 是否是IPhoneX
 *
 */
function isIphoneX() {
  let result
  try {
    const res = wepy.getSystemInfoSync()
    result = res.model.match(/iPhone X/gi)
  } catch (e) {
    result = false
  }
  return result ? true : false
}
/**
 * 模糊查询
 *
 * @param {array} list 查询列表
 * @param {string} val 查询关键字
 * @return {array} 查询结果
 */
function fuzzySearch(list, val) {
  console.log(list, val)
  const searchValList = []
  const reg = new RegExp(val, 'i');
  list.forEach(item => {
    if (item.name) {
      item.pinyin = pinyin(item.name, {
        style: pinyin.STYLE_NORMAL, // 设置拼音风格
        heteronym: false
      }).join('')
      item.firstName = pinyin(item.name, {
        style: pinyin.STYLE_FIRST_LETTER, // 首字母拼音
        heteronym: false
      }).join('')
    }
    if (item.name.indexOf(val) !== -1 || item.pinyin.match(reg) || item.firstName.match(reg)) {
      searchValList.push(item)
    }
  })
  return searchValList
}
/**
 * 对象数组去重
 *
 * @param {array} list 数组
 * @return {array} 去重数组
 */
function uniq(list) {
  const allArr = []
  for (let i = 0; i < list.length; i++) {
    let flag = true;
    for (let j = 0; j < allArr.length; j++) {
      if (list[i].id == allArr[j].id) {
        flag = false;
      };
    };
    if (flag) {
      allArr.push(list[i]);
    }
  }
  return allArr
}
/**
 * 判断是否含有字母
 */
function isLetter(res) {
  let func = /[a-z]/i
  if (res) {
    if (func.test(res)) {
      return true
    } else {
      return false
    }
  } else {

  }
}
/**
 * 对象数组深拷贝
 *
 * @param {array} source 数组
 * @return {array} 拷贝数组
 */
function deepClone(source) {
  let sourceCopy = source instanceof Array ? [] : {};
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepClone(source[item]) : source[item];
  }
  return sourceCopy
}
/**
 * 函数节流
 *
 * @param {function} fn 节流的函数
 * @param {any} context 参数
 * @param {number} delay 延迟时间
 * @param {object} This fn的指向this
 * @param {number} mustApplyTime 必须执行的时间
 * @return {void}
 */
function throttle(fn, context, delay, This, mustApplyTime) {
  clearTimeout(fn.timer)
  fn._cur = Date.now() // 记录当前时间

  if (!fn._start) { // 若该函数是第一次调用，则直接设置_start,即开始时间，为_cur，即此刻的时间
    fn._start = fn._cur
  }
  if (fn._cur - fn._start > mustApplyTime) {
    // 当前时间与上一次函数被执行的时间作差，与mustApplyTime比较，若大于，则必须执行一次函数，若小于，则重新设置计时器
    fn.call(This, context)
    fn._start = fn._cur
  } else {
    fn.timer = setTimeout(function () {
      fn.call(This, context)
    }, delay)
  }
}
/**
 * 函数去抖
 *
 * @param {function} fn 去抖的函数
 * @param {any} context 参数
 * @param {number} delay 延迟时间
 * @return {void}
 */
function debounce(delay, context, This, fn) {
  console.log('debounce', fn)
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}
/**
 * 提取对象
 * 
 * 
 */
function extend(obj) {
  var o = {},
      attr = Array.prototype.slice.call(arguments).slice(1);

  attr.forEach(function(val, index) {
      if (val in obj) { o[val] = obj[val]; }
  });

  return o;

}
/**
 * ics时间格式处理
 * 
 * 
 */
function liceTime(time) {
  // var reg=/\T|Z/g
  // var newTime = time.replace(reg, '')
  var newTime = time.split('T')[0]
  return newTime
}

/**
 * 处理文件名字的后缀
 * 
 * 
 */
function suffix(title) {
  var newTitle = title.toLocaleLowerCase().substr(title.lastIndexOf('.') + 1)
  return newTitle
}

function extendes(arr, item) {
  let map = {}
  arr.forEach(ins => {
    map[ins] = item[ins]
  })

  return map;

}
const vaildator = {
  isEmpty,
  minLength,
  maxLength,
  isPhone
}
export default {
  adjustVoiceLevel,
  formatTime,
  vaildator,
  getRandomColor,
  getShortName,
  showDate,
  isIphoneX,
  getTeamName,
  saveFromId,
  fuzzySearch,
  uniq,
  deepClone,
  throttle,
  privacy,
  isLetter,
  debounce,
  extend,
  extendes,
  liceTime,
  suffix
}
