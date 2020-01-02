import moment from 'moment'

/**
 * @description: 解析动态表单并转化为node节点
 * @param {type}
 * @return: outFormNodes node节点
 */
function parseForm(formJson) {
	const form = JSON.parse(formJson)
	console.log('fo', form)
	const formNode = {
		INPUT: {
			name: 'input',
		},
	}
	const outFormNodes = []
	// if (form & form.length) {
	form.forEach(item => {
		console.log(33, item)
		outFormNodes.push(formNode[item.hint])
	})
	// }
	console.log(123, outFormNodes)
	return outFormNodes
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
		let flag = true
		for (let j = 0; j < allArr.length; j++) {
			if (list[i].id == allArr[j].id) {
				flag = false
			}
		}
		if (flag) {
			allArr.push(list[i])
		}
	}
	return allArr
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
	const yesterday = moment(
		moment()
			.subtract(1, 'days')
			.format('YYYY-MM-DD') + ' 00:00:00'
	)
	const today = moment(moment().format('YYYY-MM-DD') + ' 00:00:00')
	const tomorrow = moment(
		moment()
			.add(1, 'days')
			.format('YYYY-MM-DD') + ' 00:00:00'
	)
	// 两分钟之内 显示刚刚
	if (moment().diff(createdTime, 'minutes') <= 2) {
		return '刚刚'
	} else if (moment().diff(createdTime, 'minutes') <= 60) {
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
 * 存formId
 *
 * @param {string} id formId
 * @return {void} 无返回值
 *
 */
function saveFromId(id) {
	let formIds = uni.getStorageSync('formId') ? uni.getStorageSync('formId') : []
	formIds.push(id)
	uni.setStorageSync('formId', formIds)
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

function dueAvatar(avatar) {
	if (avatar) {
		return avatar + '?x-oss-process=image/resize,m_fill,h_400,w_400'
	} else {
		return 'https://img.esenyun.com/images/20190329/b94504cf0fd248cbabe1a3f4c486e0f7.png'
	}
}

export default {
	parseForm,
	uniq,
	showDate,
	saveFromId,
	throttle
}
