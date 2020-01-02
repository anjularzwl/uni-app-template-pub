

// 401 tokenStatus 为 1 -> 需要重新授权
// 401 tokenStatus 为 2 -> 更新token失败
// 401 tokenStatus 为 3 -> 更新token成功

import api from '@/core/api'
export default {
	config: {
		baseUrl: '',
		header: {},
		dataType: 'json',
		responseType: 'text',
	},
	interceptor: {
		request: config => {
			console.log('config', config)
			config.header = {}
			if (config.url.indexOf('ma-oauth-token') === -1 && config.url.indexOf('esenuaa/oauth/token') === -1) {
				config.header['Authorization'] = 'Bearer ' + uni.getStorageSync('register').accessToken
				config.header['X-Wxa-AppId'] = api.appId
				if (uni.getStorageSync('formId')) {
					config.header['X-Wxa-Form-Id'] = uni.getStorageSync('formId').join(',')
				}
			}
			return config
		},
		response: async resp => {
			console.log('resp1', resp, resp.errMsg)
			if (resp.errMsg.indexOf('request:fail') !== -1 && resp.errMsg.indexOf('domain') === -1) {
				uni.showToast({
					icon: 'none',
					title: '请求超时'
				})
			}
			uni.removeStorageSync('formId')
			if (resp.statusCode === 404 || resp.statusCode === 400 || resp.statusCode === 403 || resp.statusCode === 406) {
				uni.hideLoading()
				if (resp.data.path && resp.data.path.indexOf('esenuaa/oauth/token') === -1) {
					uni.showToast({
						title: typeof resp.data.message === 'string' ? resp.data.message : '未知错误',
						icon: 'none',
						duration: 3000,
					})
				}
				return resp
			}
			if (resp.statusCode === 500 || resp.statusCode === 502 || resp.statusCode === 503) {
				uni.hideLoading()
				uni.showToast({
					title: typeof resp.data.message === 'string' ? resp.data.message : '未知错误',
					icon: 'none',
					duration: 3000,
				})
				return resp
			}
			if (resp.statusCode === 401) {
				uni.hideLoading()
				const register = uni.getStorageSync('register') || {}
				if (!register.refreshToken) {
					resp.tokenStatus = 1
					return resp
				}
				const postData = {
					refresh_token: register.refreshToken,
					grant_type: 'refresh_token',
				}
				const [refreshError, refreshData] = await uni.request({
					url: api.updateTokenUrl,
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						Authorization: 'Basic c29jaWFsX3d4X2FwcDpJdjc3ampHMTRNVjc=',
					},
					data: postData,
				})
				if (refreshError) {
					console.log(refreshError)
					resp.tokenStatus = 1
					return resp
				} else {
					register.accessToken = refreshData.data.access_token
					register.refreshToken = refreshData.data.refresh_token
					uni.setStorageSync('register', register)
					// currentPage.onLoad()
					resp.tokenStatus = 3
					return resp
				}
			}
			return resp
			// currentPage.onLoad()
		}
	},
	request(options) {
		return new Promise((resolve, reject) => {
			let _config = null
			options.url = this.config.baseUrl + options.url
			options.complete = response => {
				let statusCode = response.statusCode

				response.config = _config

				if (process.env.NODE_ENV === 'development') {
					if (statusCode === 200) {
						// console.log('【' + _config.requestId + '】 结果：' + JSON.stringify(response.data))
					}
				}
				if (this.interceptor.response) {
					this.interceptor.response(response).then(res => {
						if (statusCode === 200 || statusCode === 201) {
							//成功
							resolve(res)
						} else {
							reject(res)
						}
					})
				}
			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}

			if (process.env.NODE_ENV === 'development') {
				console.log('【' + _config.requestId + '】 地址：' + _config.url)
				if (_config.data) {
					console.log('【' + _config.requestId + '】 参数：' + JSON.stringify(_config.data))
				}
			}
			if (uni.getStorageSync('profile')) {
				const profile = uni.getStorageSync('profile')
				if (!profile.userId && (_config.url.indexOf('oauth2') !== -1 && _config.url.indexOf('account?type=WECHAT') !== -1)) {
					return false
				}
				uni.request(_config)
			} else {
				uni.request(_config)
			}
		})
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	},
	// 私有文件上传到服务器
	uploadFiles(url, path) {
		let newPath = path.replace('http://tmp', '')
		return uni
			.request({
				url: url + '?groupId=wxapp&nameSpace=PUBLIC&path=' + newPath,
				data: {},
				method: 'POST',
				dataType: 'json',
				header: {
					'content-type': 'application/json',
					Authorization: 'Bearer ' + uni.getStorageSync('register').accessToken,
				},
			})
			.then(res => {
				let [error, data] = res
				data = data.data
				let arr = Object.keys(data).sort()
				let str = arr.splice(5, 1)
				arr.unshift(str[0])
				let newObj = {}
				arr.map((item, index) => {
					newObj[arr[index]] = data[arr[index]]
				})
				const filedata = newObj
				const newUrl = data.host
				console.log(data)
				console.log(filedata)
				// 文件上传服务
				return uni.uploadFile({
					url: newUrl,
					filePath: path,
					name: 'file',
					formData: filedata,
				})
			})
	},
	// 图片上传到服务器
	uploadImg(url, path) {
		// 图片上传服务
		return uni.uploadFile({
			url,
			filePath: path,
			name: 'image',
			formData: {},
		})
	},
}
