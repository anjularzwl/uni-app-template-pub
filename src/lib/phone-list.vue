<template>
	<view>
		<van-nav-bar
			title="公司标签"
			left-text="返回"
			:right-text="allSelect.length ? '确定' + '(' + allSelect.length + ')' : '确定'"
			left-arrow
			:safe-area-inset-top="false"
			@clickLeft="onClickLeft"
			@clickRight="onClickRight"
		/>
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
				:id="key">
					<view class="list-item-title">{{key === 'no' ? '#' : key}}</view>
					<view style="width: 100%;">
						<van-checkbox-group :value="result">
							<van-cell-group >
								<van-cell
									v-for="innerItem in item"
									:key="innerItem.id"
									:title="innerItem.name"
									clickable
									:data-name="innerItem"
									@click="toggle(innerItem)"
								>
									<van-checkbox use-icon-slot :value="innerItem.checked" class="checkboxes" :name="innerItem">
										<image
											v-show="innerItem.checked"
											style="width: 35upx; height: 35upx;"
											slot="icon"
											src="../static/select-status.svg"
										/>
									</van-checkbox>
								</van-cell>
							</van-cell-group>
						</van-checkbox-group>
					</view>
					<!-- <view class="list-item-phone"
					@click="handleClick"
					hover-class="commonly-hover"
					:hover-start-time="20"
					:hover-stay-time="70"
					v-for="innerItem in item"
					:key="innerItem.id"
					:data-name="innerItem.name"
					:data-id="innerItem.id"
					:data-phoneNumber="innerItem.phoneNumber"
					>
					{{innerItem.name}}
					</view> -->
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"phone-list",
		props:{
			phones:Object,
			selectTags:Array,
			letter:String,
			scrollAnimationOFF:Boolean,
		},
		data () {
			return {
				winHeight:0,
				scrollTop:0,
				letterDetails:[],
				timer:null,
				allSelect: []
			}
		},
		computed:{
			scrollViewId () {
				return this.letter
			},
			// allSelect() {
			// 	return this.selectTags
			// }
		},
		mounted (){
			this.allSelect = [...this.selectTags]
			console.log(123213, this.allSelect)
		},
		methods:{
			onClickLeft() {
				this.$emit('leave')
			},
			onClickRight() {
				this.$emit('right', this.allSelect)
			},
			toggle(item) {
				item.checked = !item.checked
				if (item.checked) {
					this.allSelect.push(item)
				} else {
					this.allSelect = this.allSelect.filter(i => i.id !== item.id)
					console.log(this.allSelect.filter(i => i.id !== item.id))
				}
			},
			handleScroll (e){
				if(this.letterDetails.length === 0){
					let view = uni.createSelectorQuery().selectAll('.list-item')
					view.boundingClientRect(data=>{
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

<style lang="less">

	.commonly-hover{
		background-color: #eee;
	}

	.scroll-list{
		flex: 1;
		height: 100vh;
		overflow-y: hidden;
		.van-cell__title {
			min-width: 520upx;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		.van-checkbox__icon-wrap {
			margin-right: 50upx;
		}
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

	.list-item-title,.list-item-phone{
		width: 100%;
		height: 92upx;
		line-height: 92upx;
		font-size: 32upx;
		font-weight: bold;
		padding: 0 20upx;
		border-bottom: 1px solid #e5e5e5;
	}



</style>
