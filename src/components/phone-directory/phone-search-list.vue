<template>
	<view>
		<view class="search">
			<!-- <input 
			@input="handleInput"
			class="search-input" 
			type="text" 
			focus  
			placeholder="请输入要搜索的国家"
			/> -->
			<van-search placeholder="请输入要搜索的国家" @change="handleInput" />
		</view>
		<view class="search-main" v-if="keyword">
			<!-- <view class="search-main-errtitle" v-if="hasNoData">无搜索结果</view> -->
			<view class="default" v-if="hasNoData">
				<image src="https://img.esenyun.com/images/20190115/e5c9a9f8d9314adfbfc09113c56374fd.png" mode="widthFix" class="default_img"></image>
				<view class="default_txt">
					无搜索结果
				</view>
			</view>
			<view class="search-main-title"
			hover-class="hover" 
			@click="handleClick(item)"
			:hover-start-time="20" 
			:hover-stay-time="70" 
			v-for="item of list" 
			:key="item.id"
			:data-name="item.countryName"
			:data-id="item.phoneCode"
			:data-phoneNumber="item.phoneCode">
				<view class="list_phone_child">
					{{item.countryName}} +{{item.phoneCode}}
				</view>
			</view>
		</view>
	</view>		
</template>

<script>
	export default {
		name:"phone-search-list",
		props:{
			phones:[]
		},
		data() {
			return {
				keyword:'',
				list:[],
				timer:null
			}
		},
		computed:{
			hasNoData () {
				return !this.list.length
			}
		},
		watch:{
			keyword () {
				if(this.timer) {
					clearTimeout(this.timer)
				}
				if(!this.keyword){
					this.list = []
					return
				}
				this.timer = setTimeout(()=>{
					const result = []
					for (let i in this.phones){
						// console.log('---', i, this.phones)
						this.phones[i].data.forEach((item)=>{
							if(item.countryName.indexOf(this.keyword) > -1 || item.countryPinyin.indexOf(this.keyword.toLowerCase()) > -1){
								result.push(item)
							}
						})
					}
					this.list = result
					console.log(this.list)
				},100)
			}
		},
		methods:{
			handleInput (e) {
				console.log(e)
				this.keyword = e.detail
				if (this.keyword && this.keyword !== '') {
					this.$emit('keyword', false)
				} else {
					this.$emit('keyword', true)
				}
			},
			handleClick (e) {
				this.$emit('paramClick',e)
			}
		}
	}
</script>

<style lang="less">
	.hover{
		background-color: #eee;
	}
	.van-search {
		padding: 20upx 32upx;
	}
	.search{
		background-color: #fff;
		border-bottom: 1px solid #e5e5e5;
	}

	.search-input{
		background-color: #F5F5F5;
		border-radius: upx;
		font-size:28upx;
		// border: 1px solid #e5e5e5;
		padding: 10upx 20upx 10upx 20upx;
		text-align: center;
	}
	
	.search-main{
		height: 100%;
		padding-bottom: 20upx;
		background-color:#fff;
		overflow: hidden;
	}
	
	.search-main-errtitle,.search-main-title{
		width: 100%;
		height: 92upx;
		line-height: 92upx;
		font-size: 28upx;
		padding-left: 32upx;
		// border-bottom: 1px solid #EBEDF0;
	}
	.default {
		height: 100vh;
		text-align: center;
		padding-top: 80px;
		.default_img {
			width: 160px;
		}
		.default_txt {
			font-size: 12px;
			color: #999;;
			margin: 15px 0px 25px 0px;
		}
	}
	.list_phone_child {
		border-bottom: 1px solid #EBEDF0;
	}
</style>
