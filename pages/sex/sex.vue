<template>
    <view class="content">
        <radio-group @change="radioChange" class="radio">
            <label class="radio"><radio value="1" :checked="checkmale" />男</label>
            <label class="radio"><radio value="2" :checked="checkfemale" />女</label>
         </radio-group>
    	<view class="btn">
    		<button type="primary" @click="onSubmit">提交</button>
    	</view>
    </view>
</template>

<script>
export default {

data () {
  return {
	  // 用户信息
	  user: {},
	  // 性别
	  sex: 0,
	  // 默认
	  checkmale: false,
	  checkfemale: false
    }
  },
  onLoad (options) {
  	this.sex = options.sex
  	if(Number(this.sex) === 1) {
  		this.checkmale = true
  	}else if(Number(this.sex) === 2) {
  		this.checkfemale = true
  	}
	this.user = this.getUserInfo("userToken")
  },
  methods: {
	// 修改性别
	radioChange(e) {
		this.sex = e.detail.value * 1
	},
	// 提交
	onSubmit() {
		console.log(this.user)
		// uni.request({
		// 	url: `${this.$api}/user/modifyUserinfo?qq=122212489`,
		// 	method: 'POST',
		// 	data: {
		// 		userId: this.user.id,
		// 		birthday: this.user.birthday,
		// 		nickname: this.user.nickname || this.user.nickName,
		// 		sex: this.sex
		// 	},
		// 	header: {
		// 	    'headerUserId': this.user.id,
		// 		"headerUserToken": this.user.userUniqueToken
		// 	},
		// 	success: res => {
		// 		console.log(res)
		// 		uni.setStorageSync("userToken",res.data.data)
		// 		uni.showToast({
		// 			title: "提交成功"
		// 		})
		// 		uni.navigateBack({
		// 			delta: 1
		// 		})
		// 	},
		// 	fail: () => {},
		// 	complete: () => {}
		// });
		uni.setStorageSync("newSex",this.sex)
		uni.showToast({
			title: "提交成功"
		})
		uni.navigateBack({
			delta: 1
		})
	}
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
	.radio {
		background: white;
		padding: 20rpx 30rpx;
	}
}
</style>
