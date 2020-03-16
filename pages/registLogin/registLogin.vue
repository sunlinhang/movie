<template>
	<view class="body">
		<form @submit="formSubmit">
			<view class="face_wapper">
				<image src="../../static/icos/default-face.png" class="face"></image>
			</view>

			<view class="info_wapper">
				<label class="account_number">账号</label>
				<input type="text" name="username" class="input" placeholder="请输入账号" />
			</view>

			<view class="info_wapper" style="margin-top: 40upx;">
				<label class="account_number">密码</label>
				<input type="text" password="true" name="password" class="input" placeholder="请输入密码" />
			</view>

			<button type="primary" form-type="submit" class="button">注册/登录</button>
		</form>

		<!-- 第三方登录 h5不支持  所以隐藏掉-->
		<!-- #ifndef H5 -->
		<view class="third_wapper">

			<view class="third_line">
				<view class="single_line">
					<view class="line"></view>
				</view>

				<view class="third_name">第三方登录</view>

				<view class="single_line">
					<view class="line"></view>
				</view>
			</view>

			<view class="third_icos_wapper">
				<!-- 5+app 用QQ登录 小程序用微信小程序登录  h5不支持-->
				<!-- #ifdef APP-PLUS -->
				<image src="../../static/icos/weixin.png" class="third_icos" data-loginType="weixin" @click="appLogin"></image>
				<image src="../../static/icos/QQ.png" class="third_icos" data-loginType="qq" @click="appLogin"></image>
				<image src="../../static/icos/weibo.png" data-loginType="sinaweibo" class="third_icos" @click="appLogin"></image>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button type="primary" open-type="getUserInfo" @getuserinfo="wxLogin" class="third_btn_ico"></button>
				<!-- #endif -->
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 第三方登录参数
				face: '',
				nickname: '',
				openIdOrUid: ''
			}
		},
		methods: {
			// #ifdef APP-PLUS
			appLogin(e) {
				console.log(e)
				// 获取用户的登录类型
				const loginType = e.currentTarget.dataset.logintype

				// 授权登录
				uni.login({
					provider: loginType,
					success: (loginRes) => {

						// 获取用户的信息
						uni.getUserInfo({
							provider: loginType,
							success: (info) => {
								console.log(info)
								const userInfo = info.userInfo
								
								// 根据不同登录服务供应商 获取数据
								if (loginType == 'weixin') {
									this.face = userInfo.avatarUrl
									this.nickname = userInfo.nickName
									this.openIdOrUid = userInfo.openId
								} else if (loginType == 'qq') {
									this.face = userInfo.figureurl_qq_2
									this.nickname = userInfo.nickname
									this.openIdOrUid = userInfo.openId
								} else {
									this.face = userInfo.avatar_large
									this.nickname = userInfo.nickname
									this.openIdOrUid = userInfo.openId
								}

								//  执行一键登录 发送请求
								uni.request({
									url: `${this.$api}/appUnionLogin/${loginType}?qq=122212489`,
									data: {
										face: this.face,
										nickname: this.nickname,
										openIdOrUid: this.openIdOrUid

									},
									method: "POST",
									success: (res) => {
										console.log(res)
										if (res.data.status == 200) {
											const userInfo = res.data.data
											console.log(userInfo)

											// 保存第三方登录的用户信息
											uni.setStorageSync('userToken', userInfo)

											// 跳转到个人中心页面
											uni.switchTab({
												url: '../me/me'
											})
										} else if (res.data.status == 500) {
											uni.showToast({
												title: res.data.msg,
												duration: 2000,
												image: "../../static/icos/error.png"
											})
										}
									}
								})
							}
						})
					}
				})
			},
			// #endif
			// 表单提交事件
			formSubmit(e) {
				// console.log(e)
				const username = e.detail.value.username
				const password = e.detail.value.password

				// 发起注册/登录请求
				uni.request({
					url: `${this.$api}/user/registOrLogin?qq=122212489`,
					data: {
						"username": username,
						"password": password
					},
					method: "POST",
					success: (res) => {
						if (res.data.status == 200) {
							const userInfo = res.data.data
							// console.log(userInfo)

							// 保存用户信息在本地仓储
							uni.setStorageSync("userToken", userInfo)

							// 跳转到taber页面个人中心
							uni.switchTab({
								url: '../me/me'
							})
						} else if (res.data.status == 500) {
							uni.showToast({
								title: res.data.msg,
								duration: 2000,
								image: "../../static/icos/error.png"
							})
						}
					}
				})
			},
			// #ifdef MP-WEIXIN
			// 实现在微信小程序端的微信登录
			wxLogin(e) {
				console.log(e.detail.userInfo)
				// 通过微信开发能力 获得微信用户的基本信息
				const userInfo = e.detail.userInfo
				uni.setStorageSync("userToken", userInfo)
				// 提示用户登录成功
				uni.showToast({
					title: "登录成功",
					mask: false,
					duration: 1500
				})
				// 跳转到taber页面个人中心
				uni.switchTab({
					url: '../me/me'
				})


				// 实现微信登录
				// uni.login({
				// 	provider: "weixin",
				// 	success: (res) => {
				// 		console.log(res.code)
				// 		// 获得微信登录的code:授权码
				// 		const code = res.code
				// 		const loginToWhichMP = 1
				// 		uni.request({
				// 			url: `${this.$api}/stu/mpWXLogin/${code}?qq=122212489`,
				// 			data: {
				// 				"avatarUrl": userInfo.avatarUrl,
				// 				"nickName": userInfo.nickName,
				// 				"whichMP": loginToWhichMP
				// 			},
				// 			method: "POST",
				// 			success: (result) => {
				// 				// console.log(result.data)
				// 			}
				// 		})
				// 	}
				// })

			}
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	.body {
		border-top: 1px solid #dbdbda;
		padding: 0 40upx;

		// 头像
		.face_wapper {
			display: flex;
			flex-direction: row;
			justify-content: center;
			margin: 120upx 0;

			.face {
				width: 160upx;
				height: 160upx;
				border-radius: 50%;
			}
		}

		// 注册登录
		.info_wapper {
			display: flex;
			flex-direction: row;
			// justify-content: center;
			padding-bottom: 10upx;
			border-bottom: 1px solid #dbdbda;

			.account_number {
				font-size: 16px;
				color: #808080;
				margin-right: 20upx;
			}

			.input {
				font-size: 14px;
			}
		}

		.button {
			margin-top: 60upx;
			width: 90%;
		}

		// 第三方登录
		.third_wapper {
			width: 100%;
			/* 固定底部 */
			/* bottom: 0;
		position: fixed; */

			margin-top: 60upx;

			.third_line {
				display: flex;
				flex-direction: row;
				justify-content: center;

				.single_line {
					padding: 15upx 20upx;
					width: 25%;
					align-items: center;
				}

				// 第三方登录
				.third_name {
					color: #A9A9A9;
					font-size: 13px;

					display: flex;
					flex-direction: column;
					justify-content: center;
				}
			}

			.third_icos_wapper {
				margin-top: 30upx;

				display: flex;
				flex-direction: row;
				justify-content: center;

				.third_icos {
					width: 60upx;
					height: 60upx;
					margin: 0 50upx;
				}

				.third_btn_ico {
					background-image: url(http://122.152.205.72:88/group1/M00/00/05/CpoxxFxFO-yAOjTaAAATCIZEzRU503.png);
					width: 60upx;
					height: 60upx;
					background-color: white;
					background-size: 60upx 60upx;
					background-repeat: no-repeat;
					border: none;
					padding: 0;
				}

				// 去掉默认边框
				.third_btn_ico::after {
					content: '';
					border: 0px;
				}
			}
		}
	}
</style>
