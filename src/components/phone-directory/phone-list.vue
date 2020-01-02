<template>
	<view class="box">
		<scroll-view class="scroll-list"
		:scroll-top="1"
		scroll-y="true"
		:scroll-with-animation="scrollAnimationOFF" 
		:scroll-into-view="scrollViewId" 
		
		@scroll="handleScroll">
			<view class="phone-list">
				<view class="list-item" 
				v-for="(item, key) of phones" 
				:key="key" 
				:id="item.key">
					<view class="list-item-title">{{item.key}}</view>
					<view class="list-item-phone" 
					@click="handleClick(innerItem)"
					hover-class="commonly-hover" 
					:hover-start-time="20" 
					:hover-stay-time="70" 
					v-for="innerItem in item.data"
					:key="innerItem.id"
					:data-name="innerItem.countryName"
					:data-id="innerItem.countryCode"
					:data-phoneNumber="innerItem.phoneNumber"
					>
						<view class="list_phone_child">
							{{innerItem.countryName}} <text v-show="innerItem.phoneCode !== ''">+{{innerItem.phoneCode}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"phone-list",
		props:{
			phones:[],
			letter:String,
			scrollAnimationOFF:Boolean
		},
		data () {
			return {
				winHeight:0,
				scrollTop:0,
				letterDetails:[],
				timer:null
			}
		},
		computed:{
			scrollViewId () {
				return this.letter
			}
		},
		mounted(){
			// #ifndef APP-PLUS
			this.winHeight = uni.getSystemInfoSync().windowHeight - 49.50
			//#endif
			
			//#ifdef APP-PLUS
			this.winHeight = uni.getSystemInfoSync().windowHeight - 100
			//#endif

		},
		methods:{
			handleClick (e) {
				console.log(1, e)
				this.$emit('handleClick',e)
			},
			handleScroll (e){
				if(this.letterDetails.length === 0){
					let view = uni.createSelectorQuery().selectAll('.list-item')
					view.boundingClientRect(data=>{
						console.log('滚动', data)
						let top = data[0].top
						data.forEach((item,index)=>{
							item.top = item.top - top
							item.bottom  = item.bottom - top
							this.letterDetails.push({
								id:item.id,
								top:item.top,
								bottom:item.bottom
							})
						})
					}).exec()	
				}
				
				const scrollTop = e.detail.scrollTop
				this.letterDetails.some((item,index)=>{
					if(scrollTop>=item.top && scrollTop <= item.bottom - 5){
						this.$emit('change',item.id)
						this.$emit('reset',true)
						return true
					}
				})
			}
		}
			
	}
</script>

<style>
	
	.commonly-hover{
		background-color: #eee;
	}
	.box{
		height: 100vh;
	}
	.scroll-list{
		flex: 1;
		height: 100vh;
		overflow-y: hidden;
	}

	.phone-list{
		display: flex;
		background-color: #fff;
		flex-direction:column;
		position:relative;
		width: 100%;
	}
	
	.list-item {
		width: 100%;
		display: flex;
		align-items: center;
		flex-wrap:wrap;
		height: 92upx;
		background-color: #fff;
		height: 100%;
		
	}
	
	.list-item >.list-item-phone{
		font-weight: normal;
	}
	
	.list-item-title{
		background-color: #eee;
	}

	.list-item-title {
		color: #a6a6a6;
		font-weight: normal !important;
	}

	.list-item-phone {
		color: #333333;
	}
	.list-item-title,.list-item-phone{
		width: 100%;
		height: 92upx;
		line-height: 92upx;
		font-size: 28upx;
		font-weight: bold;
		padding-left: 32upx;
	}
	.list_phone_child {
		border-bottom: 1px solid #EBEDF0;
	}
	

</style>
