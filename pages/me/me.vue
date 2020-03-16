<template>
	<view class="page page_fill">
		<!-- 头部信息 -->
		<view class="header">
			<!-- 头像 -->
			<view v-if="userLogin">
				<!-- 登录 -->
				<image v-if="newImg" :src="newImg" class="face"></image>
				<image v-else-if="userInfo.faceImage" :src="userInfo.faceImage" class="face"></image>
				<image v-else :src="userInfo.avatarUrl" class="face"></image>
			</view>
			<view v-else>
				<!-- 未登录 -->
				<image src="../../static/icos/default-face.png" class="face"></image>
			</view>
			<!-- 登录 -->
			<view class="info_wapper" v-if="userLogin">
				<view class="nickname" v-if="newName">
					昵称: {{newName}}
				</view>
				<view class="nickname" v-else-if="userInfo.nickName">
					昵称: {{userInfo.nickName}}
				</view>
				<view class="nickname" v-else-if="userInfo.username">
					昵称: {{userInfo.username}}
				</view>
				<view class="nickname" v-else>
					昵称: {{userInfo.nickname}}
				</view>
				<view class="nav_info" v-if="userInfo.id != undefined & userInfo.id != null">
					ID: {{userInfo.id}}
				</view>
			</view>
			<!-- 未登录 -->
			<view v-else class="info_wapper">
				<!-- 跳转到登录注册页面 -->
				<navigator url="../registLogin/registLogin" open-type="navigate" style="background-color: #ffd655;">
					<view class="nickname regist_login">注册/登录</view>
				</navigator>
			</view>
			<!-- 登录 -->
			<view v-if="userLogin">
				<view class="set_wapper">
					<!-- 跳转到设置页面 -->
					<navigator url="../settings/settings" open-type="navigate" style="background-color: #ffd655;">
						<image src="../../static/icos/settings.png" class="settings"></image>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 默认未登录
				userLogin: false,
				// 用户信息
				userInfo: {},
				// 用户重新上传的头像
				newImg: '',
				// 用户新昵称
				newName: ''
			}
		},
		onShow() {
			// 用户状态的切换
			// const userToken = uni.getStorageSync("userToken")

			// if(userToken !== null & userToken !== '' & userToken !== undefined) {
			// 	// 状态为登录
			// 	this.userLogin = true
			// 	this.userInfo = userToken
			// } else {
			// 	this.userLogin = false
			// 	this.userInfo = ''
			// }

			// 获取用户重新上传的头像
			this.newImg = uni.getStorageSync("newImg")
			// 获取用户新昵称
			this.newName = uni.getStorageSync("newName")

			// 使用挂载方法获取用户数据
			const userInfo = this.getUserInfo("userToken")
			if (userInfo != null) {
				// 状态为登录
				this.userLogin = true
				this.userInfo = userInfo
			} else {
				// 状态为未登录
				this.userLogin = false
				this.userInfo = {}
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.page_fill {
		width: 100%;
		height: 100%;

		.header {
			// #ifdef MP
			padding: 0 30upx 40upx 30upx;
			// #endif
			// #ifndef MP
			padding: 120upx 30upx 40upx 30upx;
			// #endif
			background-color: #ffd655;

			display: flex;
			flex-direction: row;
			justify-content: flex-start;

			// 左侧
			.face {
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
			}

			// 右侧
			.info_wapper {
				width: 80%;
				margin-left: 40upx;
				display: flex;
				flex-direction: column;

				.nickname {
					color: #6a5018;
					font-size: 18px;
					font-weight: 700;
				}

				.regist_login {
					margin-left: 60upx;
					margin-top: 30upx;
				}

				.nav_info {
					color: #a38e62;
					font-size: 14px;
					margin-top: 10upx;
				}

			}

			.set_wapper {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;

				.settings {
					width: 40upx;
					height: 40upx;
				}
			}
		}
	}
</style>
