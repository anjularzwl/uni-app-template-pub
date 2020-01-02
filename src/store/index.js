//store.js
import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/core/api'
import http from '../core/http'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		isCheckUser: false,
		isIOS: false,
		needUpdateUnread: false,
		attachModalStauts: false,
		isPhoneX: false,
		profile: {
			props: {},
		},
		isShowAuthModal: false,
		isShowBind: false,
		webviewUrl: '',
		ofStatus: true,
		allCompanyTags: [],
		filterList: {
			selectTags: [], // 总共展示的tag
			filter: [
				{
					id: 'conclusions',
					title: '结论状态',
					selected: null,
					type: 'single',
					tags: [
						{
							id: '',
							name: '全部',
							checked: true,
						},
						{
							id: 'CONCLUSION',
							name: '已有结论',
							checked: false,
						},
						{
							id: 'UNCONCLUSION',
							name: '等待结论',
							checked: false,
						},
					],
				},
				{
					id: 'queryType',
					title: '与我相关的',
					type: 'single',
					selected: null,
					tags: [
						{
							id: '',
							name: '全部',
							checked: true,
						},
						{
							id: 'PARTICIPATE',
							name: '我参与的',
							checked: false,
						},
						{
							id: 'CREATE',
							name: '我发布的',
							checked: false,
						},
						{
							id: 'COLLECT',
							name: '我收藏的',
							checked: false,
						},
						{
							id: 'COMMENTED',
							name: '我回复的',
							checked: false,
						},
					],
				},
				{
					id: 'approval',
					title: '审批状态',
					type: 'single',
					selected: null,
					tags: [
						{
							id: '',
							name: '全部',
							checked: true,
						},
						{
							id: '1',
							name: '有审批',
							checked: false,
						},
						{
							id: '0',
							name: '无审批',
							checked: false,
						},
					],
				},
				{
					id: 'companyTags',
					title: '公司标签',
					type: 'multiple',
					showText: '',
					selected: [],
					tags: [],
				},
			],
		},
		replyComment: {
			index: null,
			status: '',
			type: '',
			comment: {},
			secondComment: []
		},
		wordDetail: {
			source: '',
			detail: {},
		},
		approvalDetail: {
			source: '',
			detail: {},
		},
		needUpdateWordDetail: false,
		alreadySelectMembers: [], // 已选参与人列表
		newBoardMembers: [], //  新建小白板的参与人
	},
	mutations: {
		adjustX(state, status) {
			state.isPhoneX = status
		},
		updateUnread(state, status) {
			state.needUpdateUnread = status
		},
		updateCompanyTags(state, tags) {
			state.allCompanyTags = tags
		},
		adjustIOS(state, status) {
			state.isIOS= status
		},
		checkUser(state, status) {
			state.isCheckUser= status
		},
		updateAttachModal(state, status) {
			state.attachModalStauts = status
		},
		updateProfile(state, profile) {
			state.profile = profile
		},
		updateWebviewUrl(state, url) {
			state.webviewUrl = url
		},
		changeAuthModal(state, status) {
			state.isShowAuthModal = status
		},
		changeShowBind(state, status) {
			state.isShowBind = status
		},
		updateFilterSelect(state, select) {
			state.filterList.selectTags = select
		},
		updateFilter(state, { index, filter }) {
			state.filterList.filter[index] = filter
		},
		updateFilterTags(state, { index, tags }) {
			state.filterList.filter[index].tags = tags
		},
		clearFilter(state, filter) {
			state.filterList.filter = filter
		},
		deleteFilterTags(state, tag) {
			state.filterList.selectTags = state.filterList.selectTags.filter(i => i.id !== tag.id)
			state.filterList.filter[tag.index].selected = null
			state.filterList.filter[tag.index].tags.forEach((item, i) => {
				if (item.id === tag.id) {
					item.checked = false
				}
				if (i === 0) {
					item.checked = true
				}
			})
		},
		updateComment(state, {
				index,
				status,
				type,
				comment,
				secondComment
			}) {
			state.replyComment.index = index
			state.replyComment.status = status
			state.replyComment.type = type
			state.replyComment.comment = comment
			state.replyComment.secondComment = secondComment
		},
		updateWordDetail(state, { source, detail }) {
			state.wordDetail.source = source
			state.wordDetail.detail = detail
		},
		updateNeedUpdateWordDetail(state, status) {
			state.needUpdateWordDetail = status
		},
		updateAlreadySelect(state, members) {
			state.alreadySelectMembers = members
		},
		updateApprovalDetail(state, { source, detail }) {
			state.approvalDetail.source = source
			state.approvalDetail.detail = detail
		},
		updateNewBoardMembers(state, array) {
			state.newBoardMembers = array
		},
		closeOf(state) {
			state.ofStatus = true
		},
		updateOfa(state, status) {
			state.ofStatus = status
		}
	},
	actions: {
		login({ dispatch, commit }, callbackObj) {
			console.log(typeof(callbackObj))
			let callback
			let newError
			if (typeof(callbackObj) === 'object') {
				callback = callbackObj.callback
				newError = callbackObj.disserror
			} else {
				callback = callbackObj
			}
			http.get(api.profileUrl)
				.then(res => {
					console.log(3321, res.data)
					commit('updateProfile', res.data)
					commit('changeAuthModal', false)
					commit('changeShowBind', false)
					dispatch('getCheckUser').then(resq => {
						// if (res.data.props.img_url && res.data.props.img_url.indexOf('wx.qlogo') !== -1) {
						// 	console.log('包含微信头像')
						// 	res.data.imageUrl = uni.getStorageSync('userInfo').avatarUrl
						// 	res.data.props.img_url = uni.getStorageSync('userInfo').avatarUrl
						// }
						uni.setStorageSync('profile', res.data)
						callback()
					})
					// if (!res.data.userId) {
					// 	commit('changeAuthModal', true)
					// 	// commit('changeShowBind', true)
					// } else {
					// 	dispatch('checkBind').then(profile => {
					// 		callback()
					// 	})
					// }
				})
				.catch(error => {
					console.log(123123123, error)
					var pages = getCurrentPages()
					console.log('pagespagespagespagespagespages', pages[0].route)
					if (error.tokenStatus === 1 || error.tokenStatus === 2) {
						commit('changeAuthModal', true)
						if (newError) {
							newError()
						}
						// commit('changeShowBind', false)
					}
					if (error.tokenStatus === 3) {
						dispatch('requestProfile').then(profile => {
								callback()
						})
						// dispatch('requestProfile').then(profile => {
						// 	dispatch('checkBind').then(profile => {
						// 		callback()
						// 	})
						// })
					}
				})
		},
		getCheckUser({ commit }) {
			return new Promise((resolve, reject) => {
				http.post(api.isCheckInorortUrl, {})
					.then(res => {
						console.log('内外？', res)
						if (res.data === 1) {
							console.log('内')
							commit('checkUser', true)
						} else {
							console.log('外')
							commit('checkUser', false)
						}
						resolve(res.data)
					})
					.catch(e => {
						console.log(e)
					})
			})
		},
		requestProfile({dispatch, commit }) {
			return new Promise((resolve, reject) => {
				http.get(api.profileUrl)
					.then(res => {
						commit('updateProfile', res.data)
						if (!res.data.props.img_url || res.data.props.img_url.indexOf('wx.qlogo') !== -1) {
							console.log('包含微信头像')
							res.data.imageUrl = uni.getStorageSync('userInfo').avatarUrl
							res.data.props.img_url = uni.getStorageSync('userInfo').avatarUrl
						}
						dispatch('getCheckUser').then(resq => {
							
						})
						uni.setStorageSync('profile', res.data)
						// if (!res.data.userId) {
						// 	commit('changeAuthModal', true)
						// 	// commit('changeShowBind', true)
						// }
						resolve(res.data)
					})
					.catch(e => {
						commit('changeAuthModal', true)
						// commit('changeShowBind', false)
					})
			})
		},
		ofFollow({ commit }) {
			const unionId = uni.getStorageSync('register').unionId
			const data = {
				appCategory: 'WXMP',
				unionId
			}
			http.post(api.checkedAccountUrl, data).then(res => {
				let follow = false
				if (res.data.id) {
					follow = true
				}
				commit('updateOfa', follow)
			})
		},
		// checkBind({ commit }) {
		// 	return new Promise((resolve, reject) => {
		// 		http.post(api.checkBind, {})
		// 			.then(res => {
		// 				resolve(res.data)
		// 			})
		// 			.catch(e => {
		// 				commit('changeAuthModal', true)
		// 				commit('changeShowBind', false)
		// 			})
		// 	})
		// }
	},
})

export default store
