<template>
	<view class="black">
		<image :src="cover" mode="widthFix" class="cover" @longpress="operator"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cover: ''
			}
		},
		onLoad(params) {
			this.cover = params.cover
		},
		methods: {
			operator() {
				uni.showActionSheet({
					itemList: ["保存图片到本地"],
					success: (res) => {
						// 如果用户点击的为0 代表下载
						if(res.tapIndex == 0) {
							
							// 若图片太大 提示用户
							uni.showLoading({
								title: '图片保存中'
							})
							// 下载文件资源到本地
							uni.downloadFile({
								url: this.cover,
								success: (result) => {
									const tempFilePath = result.tempFilePath
									console.log(tempFilePath)
									// 保存图片到系统相册
									uni.saveImageToPhotosAlbum({
										filePath: tempFilePath,
										success: () => {
											// 提示用户保存成功
											uni.showToast({
												title: '保存成功',
												duration: 1000
											})
										},
										complete() {
											uni.hideLoading()
										}
									})
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .uni-page-body {
	// 	height: 100% !important;
	// }
.black {
	width: 100%;
	height: 100vh;
	background-color: #000000;
	display: flex;
	flex-direction: column;
	justify-content: center;
	.cover {
		align-self: center;
	}
}
</style>
