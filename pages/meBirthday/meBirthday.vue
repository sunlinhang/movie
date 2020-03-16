<template>
    <view class="content">
		<picker mode="date" :value="birthday" start="1970-01-01" :end="endDate" @change="bindDateChange">
			<view class="uni-input">{{birthday}}</view>
			<!-- <input class="uni-input" :value="birthday" /> -->
		</picker>
    	<view class="btn">
    		<button type="primary" @click="onSubmit">提交</button>
    	</view>
    </view>
</template>

<script>
export default {

data () {
  return {
	  birthday: "",
	  user: {},
	  endDate: ""
    }
  },
  methods: {
	// 修改生日
	bindDateChange(e) {
		console.log(e.detail.value)
		this.birthday = e.detail.value
	},
	// 提交
	onSubmit() {
		uni.request({
			url: `${this.$api}/user/modifyUserinfo?qq=122212489`,
			method: 'POST',
			data: {
				userId: this.user.id,
				birthday: this.birthday,
				nickname: this.user.nickname,
				sex: this.user.sex
			},
			header: {
			    'headerUserId': this.user.id,
				"headerUserToken": this.user.userUniqueToken
			},
			success: res => {
				console.log(res)
				uni.setStorageSync("userToken",res.data.data)
				uni.showToast({
					title: "提交成功"
				})
				uni.navigateBack({
					delta: 1
				})
			},
			fail: () => {},
			complete: () => {}
		});
	}
  },
  onLoad (options) {
	this.birthday = options.birthday
	this.user = uni.getStorageSync("userToken")
	let date = new Date()
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	if(month < 10) {
		month = '0' + month
	}
	let day = date.getDate()
	if(day < 10) {
		day = '0' + day
	}
	this.endDate = year + '-' + month + '-' + day
  }
}
</script>

<style scoped lang="scss">
.content {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	background: #F8F8F8;
	.btn {
		padding: 40rpx 20rpx;
	}
	.uni-input {
		background: white;
		padding: 20rpx 30rpx;
	}
}
</style>


<style>

</style>
