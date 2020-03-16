<template>
	<view class="page page_fill">

		<view class="pending_wapper">
			<image :src="imgSrc" id="face" class="pending_face" mode="scaleToFill"></image>
		</view>

		<view class="notice">
			<view class="notice_title">
				*  请从相册中选择等比宽高的图片哦~
			</view>
		</view>

		<view class="footer_opertor">
			<view class="opertor_title" @click="againImg">
				重新选择
			</view>

			<view class="opertor_title" @click="upload">
				确认上传
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 临时图片路径
				imgSrc: '' ,
				// 用户信息
				userInfo: {},
				// 最新图片
				faceImage: ''
			}
		},
		onShow() {
			this.userInfo = this.getUserInfo("userToken")
		},
		onLoad(params) {
			console.log(params)
			this.imgSrc = params.imgSrc
			
		},
		methods: {
			//  重新选择
			againImg() {
				uni.chooseImage({
					count: 1,  // 限制9张
					sizeType: ["compressed"],  //  压缩图 可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album"],  //  从相册选择
					success: (data) => {
						// 获取图片临时路径
						this.imgSrc = data.tempFilePaths[0]
						uni.getStorageSync("newImg",this.imgSrc)
					}
				})
			},
			
			// 确定上传
			upload() {
				uni.showLoading({
					title: "上传中,请稍后",
					mask: true
				})
				
				uni.uploadFile({
					url: `${this.$api}/user/uploadFace?userId=${this.userInfo.id}&qq=122212489`,
					filePath: this.imgSrc,
					name: "file",
					header: {
						"headerUserId": this.userInfo.id,
						"headerUserToken":  this.userInfo.userUniqueToken
					},
					success: (res) => {
						const user = JSON.parse(res.data)
						console.log(user)
						// if (user.status == 200) {
							const userInfo = user.data;
							uni.setStorageSync("userToken", userInfo);
							uni.navigateBack({
								delta: 1
							})
						// } else {
						// 	uni.showToast({
						// 		title: res.data.msg,
						// 		image: "../../static/icos/error.png",
						// 		duration: 2000
						// 	})
						// }
					},
					complete() {
						uni.hideLoading()
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page_fill {
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: #000000;
		.pending_wapper {
			display: flex;
			flex-direction: row;
			justify-content: center;
			margin-top: 40upx;
			.pending_face {
				width: 600upx;
				height: 600upx;
			}
		}

		.notice {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			.notice_title {
				color: gray;
				font-size: 13px;
				margin-top: 30upx;
				width: 600upx;
			}
		}

		// 底部
		.footer_opertor {
			position: fixed;
			bottom: 0;
			
			border-top: 1px solid #515050;
			width: 100%;
			
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 30upx;
			.opertor_title {
				color: #e8e5e5;
				font-size: 16px;
				width: 200upx;
			}
		}
	}
</style>
