<template>
	<view class="phone-main">
		<view class="phoneDirectory">
			<phone-list
			:phones="phones"
			:letter="letter"
			:selectTags="selectTags"
			:scrollAnimationOFF="scrollAnimationOFF"
			@right="right"
			@leave="leave"
			@change="handlePhoneListIndex"
			@reset="handleReset"
			>
			</phone-list>
			<phone-alphabet
			:phones="phones"
			:phoneListIndex="phoneListIndex"
			@change="handleDatasetKey"
			@scrollAnimationOFF="handleScrollAnimationOFF"
			@reset="handleReset"
			>
			</phone-alphabet>
		</view>
	</view>
</template>

<script>
	import phoneList from './phone-list.vue'
	import phoneAlphabet from './phone-alphabet.vue'

	export default {
		name:"phone-directory",
		components:{
			phoneList,
			phoneAlphabet
		},
		props:{
			phones:Object,
			selectTags:Array,
			default:false
		},
		data () {
			return {
				winHeight:0,
				letter : 'A',
				scrollAnimationOFF:true,
				phoneListIndex:'A',
				reset:true
			}
		},
		computed:{
			phonesEscape () {
				return escape(JSON.stringify(this.phones))
			}
		},
		mounted () {
			let windowHeight = uni.getSystemInfoSync().windowHeight

			// #ifndef APP-PLUS
			this.winHeight = windowHeight
			//#endif

			//#ifdef APP-PLUS
			this.winHeight = windowHeight - 56
			//#endif

 			if(!this.phones){
				uni.showToast({
					title: '没有数据',
					icon:"none",
					mask: false,
					duration: 1500
				})
			}
		},
		methods:{
			right (e) {
				console.log(e)
				this.$emit('right', e)
			},
			leave() {
				this.$emit('leave')
			},
			handleDatasetKey (val) {
				this.letter = val
				console.log(this.letter)
			},
			handleScrollAnimationOFF (val) {
				this.scrollAnimationOFF = val
			},
			handlePhoneListIndex(val){
				if(this.reset){
					this.phoneListIndex = val
				}
			},
			handleReset (val){
				if(val){
					this.letter = ''
				}
				this.reset = val
			}

		}
	}
</script>

<style>
.phone-main{
	display: flex;
	flex-direction: column;
	overflow: hidden;
	height: 100vh;
}
.phone-main-search{
	background-color: #fff;
	padding: 10upx 20upx;
	border-bottom: 1px solid #e5e5e5;
}

.phone-main-input{
	font-size:28upx;
	border: 1px solid #e5e5e5;
	border-radius: 3px;
	padding: 10upx 20upx 10upx 20upx;
}
</style>
