<template>
	<view class="page page-fill"> 
		
		<view class="page_block info-list">
			<!-- 头像 -->
			<!-- #ifndef MP-WEIXIN -->
			<view class="item-wapper face-line-upbottom" @click="operator">
				<view class="info-words">头像</view>
				
				<view class="right-wapper">
					<!-- 头像图 -->
					<image  :src="globalUser.faceImage || globalUser.avatarUrl" class="face"></image>
					<!-- 右箭头图 -->
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 昵称 -->
			<view class="item-wapper" @click="modifyNickname">
				<view class="info-words">昵称</view>
				
				<view class="right-wapper">
					<view class="gray-fields" v-if="globalUser.nickname">
						{{globalUser.nickname}}
					</view>
					<view class="gray-fields" v-else>
						{{globalUser.nickName}}
					</view>
					
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 生日 -->
			<view class="item-wapper" @click="modifyBirthday" v-if="globalUser.birthday">
				<view class="info-words">生日</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						{{globalUser.birthday}}
					</view>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top" v-if="globalUser.birthday">
				<view class="line"></view>
			</view>
			
			<!-- 性别 -->
			<view class="item-wapper" @click="modifySex">
				<view class="info-words">性别</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						
						<view v-if="newSex == 1 || globalUser.sex == 1 || globalUser.gender == 1">
							男
						</view>
						<view v-else-if="newSex == 2 || globalUser.sex == 0 || globalUser.gender == 2">
							女
						</view>
						<view v-else>
							未选择
						</view>
						
					</view>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			<!-- #endif -->
			
			<!-- #ifdef MP-WEIXIN -->
			
			<view class="item-wapper face-line-upbottom">
				<!-- 头像 -->
				<view class="info-words">头像</view>
				
				<view class="right-wapper">
					<!-- 头像图 -->
					<image  :src="globalUser.faceImage || globalUser.avatarUrl" class="face"></image>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 昵称 -->
			<view class="item-wapper">
				<view class="info-words">昵称</view>
				
				<view class="right-wapper">
					<view class="gray-fields" v-if="globalUser.nickname">
						{{globalUser.nickname}}
					</view>
					<view class="gray-fields" v-else>
						{{globalUser.nickName}}
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 性别 -->
			<view class="item-wapper">
				<view class="info-words">性别</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						
						<view v-if="newSex == 1 || globalUser.sex == 1 || globalUser.gender == 1">
							男
						</view>
						<view v-else-if="newSex == 2 || globalUser.sex == 0 || globalUser.gender == 2">
							女
						</view>
						<view v-else>
							未选择
						</view>
								
					</view>
				</view>
			</view>
			
			<!-- #endif -->
		</view>
		
		<view class="footer-wapper">
			<view class="footer-words" @click="cleanStorage">
				清理缓存
			</view>
			<view class="footer-words" style="margin-top: 10upx;" @click="logout">
				退出登录
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 用户信息
				globalUser: {},
				newSex: {}
			};
		},
		onShow() {
			// 获取用户信息
			this.globalUser = uni.getStorageSync("userToken")
			this.newSex = uni.getStorageSync("newSex")
			console.log(this.globalUser)
		},
		methods: {
			// 跳转到设置头像
			operator() {
				uni.showActionSheet({
					itemList: ["查看我的头像","从相册选择上传"],
					success: (res) => {
						const index = res.tapIndex
						
						const arrImg = []
						arrImg.push(this.globalUser.faceImage || this.globalUser.avatarUrl,)
						
						if(index == 0) {
							
							// 查看我的头像
							uni.previewImage({
								urls: arrImg,
								current: arrImg[0]
							})
							
						} else {
							uni.chooseImage({
								count: 1,
								sizeType: ["compressed"],
								sourceType: ["album"],
								success: (data) => {
									// 获得图片的临时路径
									const tempFilePaths = data.tempFilePaths[0]
									
									// 选择上传头像
									uni.navigateTo({
										url: "../operator/operator?imgSrc=" + tempFilePaths
									})
								}
							})
							
						}
					}
				})
			},
			// 跳转到性别选项
			modifySex() {
				uni.navigateTo({
					url: "../sex/sex?sex=" + this.globalUser.sex
				})
			},
			// 跳转到生日选项
			modifyBirthday() {
				uni.navigateTo({
					url: "../meBirthday/meBirthday?birthday=" + this.globalUser.birthday
				})
			},
			// 跳转到昵称选项
			modifyNickname() {
				uni.navigateTo({
					url: `../meNickname/meNickname?nickname=${this.globalUser.nickName || this.globalUser.nickname}`
				})
			},
			// 点击清理缓存
			cleanStorage() {
				// 同步清理所有缓存
				uni.clearStorageSync();
				// 提示用户成功
				uni.showToast({
					title: "清理缓存成功",
					mask: false,
					duration: 1500
				})
			},
			// 点击退出登录
			logout() {
				uni.request({
					url: `${this.$api}/user/logout?userId=${this.globalUser.id}&qq=122212489`,
					method: "POST",
					success: (res) => {
						// console.log(res)
						if(res.data.status == 200) {
							// 如果服务器返回200 代表已退出成功
							// 移出指定的key
							uni.removeStorageSync("userToken")
							
							// 跳转到个人中心页面
							uni.switchTab({
								url: "../me/me"
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	/* 页面铺满屏幕 */
	.page-fill {
		width:100%;
		height: 100%;
		position: absolute;
	}
	
	.info-list {
		/* margin-top: 20upx; */
		padding: 0upx 30upx;
	}
	
	.info-words {
		color: #333333;
		font-size: 16px;
		width: 25%;
		line-height: 80upx;
		/* font-weight: bold; */
	}
	
	.face {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}
	
	.arrow-block {
		margin-left: 10upx;
		line-height: 86upx;
	}
	
	.arrow-ico {
		width: 30upx;
		height: 30upx;
	}
	
	.item-wapper {
		display: flex;
		/* margin-top: 20upx; */
		flex-direction: row;
		justify-content: flex-start;
	}
	
	.face-line-upbottom {
		/* margin-bottom: 20upx; */
		padding-top: 20upx;
	}
	
	.line-top {
		padding: 20upx;
	}
	
	.right-wapper {
		width: 80%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
	
	.gray-fields {
		font-size: 14px;
		color: darkgray;
		line-height: 80upx;
	}
	
	/* 底部操作 start */
	.footer-wapper {
		position: fixed;
		bottom: 0;
		
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.footer-words {
		text-align: center;
		background-color: white;
		padding: 20upx;
		
		color: #333333;
		font-size: 16px;
	}
	/* 底部操作 end */
</style>
