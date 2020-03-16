<!-- 影视详情页 -->
<template>
	<view class="page">
		<!-- 视频 -->
		<video :id="myTrailer" :src="trailerList.trailer" controls :poster="trailerList.poster" class="movie"></video>
		<!-- 介绍 -->
		<view class="trailerInfo">
			<view class="trailerInfo_box">
				<!-- 图片 -->
				<image :src="trailerList.cover" class="l_img" @click="toCover"></image>
				<view class="desc">
					<view class="r_name">{{trailerList.name}}</view>
					<view class="r_basicInfo">{{trailerList.basicInfo}}</view>
					<view class="r_basicInfo">{{trailerList.originalName}}</view>
					<view class="r_basicInfo">{{trailerList.releaseDate}}</view>
					<!-- 综合评分 -->
					<view class="rate">
						<view class="score">
							综合评分
							<view class="number">{{trailerList.score}}</view>
						</view>
						<!-- 赞 -->
						<view class="count">
							<!-- 评分星星 -->
							<view v-if="trailerList.score > 0">
								<hot-stars :innerScore="trailerList.score"></hot-stars>
							</view>
							<view class="good">有{{trailerList.prisedCounts}}点赞</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 剧情介绍 -->
		<view class="content_box">
			<view class="title">剧情介绍:</view>
			<view class="content">{{trailerList.plotDesc}}</view>
		</view>
		<!-- 演员表 -->
		<view class="cast_list">
			<view class="title">演职人员:</view>
			<scroll-view scroll-x="true">
				<view class="director_box">
					<!-- 导演 -->
					<view v-for="(item,staffIndex) in directorList" :key="item.id" class="director">
						<image 
						:src="item.photo"
						lazy-load
						class="director_img" 
						mode="aspectFill" 
						@click="lookstaffIndex"
						:data-staffIndex="staffIndex"></image>
						<view class="name">{{item.name}}</view>
						<!-- <view class="sex" >{{item.sex == 1 ? "男" : "女"}}  </view> -->
						<view class="actName">{{item.actName}}</view>
					</view>
					<!-- 演员 -->
					<view class="director" v-for="(actor,actorIndex) in performerList" :key="actor.id">
						<image
						lazy-load
						:src="actor.photo"  
						class="director_img"
						mode="aspectFill"
						@click="lookstaffIndex"
						:data-staffIndex="actorIndex"></image>
						<view class="name">{{actor.name}}</view>
						<view class="actName">饰演:{{actor.actName}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 剧照 -->
		<view class="plotPics">
			<view class="title">剧照:</view>
			<scroll-view scroll-x="true" >
				<view class="plotPicsList">
					<view class="item" v-for="(item,imgIndex) in plotPicsList" :key="item.id" @click="lookPlotPics" :data-imgIndx="imgIndex" lazy-load>
						<image :src="item" class="img"></image>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	//  星星组件
	import hotStars from '../../components/hotStars'
	export default {
		components: {
			hotStars    // 星星组件
		},
		data() {
			return {
				// 当前id参数
				trailerId: '',
				// 当前页详情数据
				trailerList: [],
				// 导演数据
				directorList: [],
				// 演员数据
				performerList: [],
				// 剧照数据
				plotPicsList: []
			}
		},
		// 页面初次渲染完成  获得视频上下文对象
		onReady() {
			this.videoContext = uni.createVideoContext('myTrailer')
		},
		
		onHide() {
			// 页面被隐藏的时候  ，暂停播放
			this.videoContext.pause()
		},

		onShow() {
			// 页面被再次显示的时候  可以继续播放
			if(this.videoContext) {
				this.videoContext.play()
			}
		},
		onLoad(options) {
			console.log(options.id)
			// 接受跳转过来的id
			this.trailerId = options.id
			// 渲染预告片详情
			this.getTrailer()
			// 渲染导演列表
			this.getDirector()
			// 渲染演员列表
			this.getPerformer()
		},
		// 分享到微信好友  微信群   只支持小程序  
		onShareAppMessage(res) {
			return {
				title: this.trailerList.name,
				path: '/pages/detail/detail?trailerId=' + this.trailerList.id
			}
		},
		onNavigationBarButtonTap(e) {
				const index = e.index
				console.log(index)
				
				const trailer = this.trailerList
				const trailerId = trailer.id
				const trailerName = trailer.name
				const cover = trailer.cover
				const poster = trailer.poster
				// 如果index为0 则为分享
				if (index == 0) {
					uni.share({
					    provider: "weixin",
					    scene: "WXSceneSession",
					    type: 0,
					    href: `http://www.imovietrailer.com/#/pages/movie/movie?trailerId=${trailerId}`,
					    title: `影视预告:《${trailerName}》`,
					    summary: `影视预告:《${trailerName}》`,
					    imageUrl: cover,
					    success: function (res) {
					        console.log("success:" + JSON.stringify(res));
					    }
					});
				}
		},
		methods: {
			// 获取预告片详情
			getTrailer() {
				uni.request({
					url: `${this.$api}/search/trailer/${this.trailerId}?qq=122212489`,
					method: 'POST',
					success: (res) => {
						// console.log(res)
						// 预告片详情数据
						this.trailerList = res.data.data
						// 剧照数据   将字符串转换为json对象
						this.plotPicsList = JSON.parse(res.data.data.plotPics)
						console.log(this.trailerList)
					}
				})
			},
			// 获取导演列表
			getDirector() {
				uni.request({
					url: `${this.$api}/search/staff/${this.trailerId}/1?qq=122212489`,
					method: 'POST',
					success: (res) => {
						// console.log(res)
						if (res.data.status == 200) {
							this.directorList = res.data.data
						}
						console.log(res.data.data)
					}
				})
			},
			// 获取演员列表
			getPerformer() {
				uni.request({
					url: `${this.$api}/search/staff/${this.trailerId}/2?qq=122212489`,
					method: 'POST',
					success: (res) => {
						if(res.data.status == 200) {
							this.performerList = res.data.data
						}
					}
				})
			},
			// 点击封面图片 进行跳转
			toCover() {
				uni.navigateTo({
					url: '../cover/cover?cover=' + this.trailerList.cover
				})
			},
			// 预览剧照
			lookPlotPics(e) {
				let imgIndex = e.currentTarget.dataset.imgindex
				uni.previewImage({
					current: this.plotPicsList[imgIndex],
					urls: this.plotPicsList
				})
			},
			// 预览演员导演照片
			lookstaffIndex(e) {
				let staffIndex = e.currentTarget.dataset.staffindex
				
				// 拼接导演和演员的数据  成为一个新的数组
				let newStaffArry = [...this.directorList,...this.performerList]
				
				let urls = []
				for(let i = 0; i < newStaffArry.length; i++) {
					let photo = newStaffArry[i].photo
					urls.push(photo)
				}
				uni.previewImage({
					current: urls.lookstaffIndex,
					urls: urls
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 视频
	.movie {
		width: 100%;
	}

	// 介绍
	.trailerInfo {
		display: flex;
		flex-direction: column;
		margin: 40upx 40upx;

		.trailerInfo_box {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding-bottom: 20upx;

			// 左侧图片
			.l_img {
				width: 200upx;
				height: 340upx;
				border-radius: 3%;
			}

			// 右侧内容
			.desc {
				width: 340upx;
				margin-left: 20upx;
				display: flex;
				flex-direction: column;
				flex: 1;

				.r_name {
					font-size: 36upx;
					font-weight: 700;
				}

				.r_basicInfo {
					margin: 8upx 0;
					font-size: 32upx;
					color: #999999;
				}

				// 评分盒子
				.rate {
					margin-top: 8upx;
					height: 80upx;
					background-color: #fff;
					padding: 20upx;

					.score {
						display: inline-block;
						display: flex;
						flex-direction: row;
						font-size: 30upx;
						font-weight: 700;
						margin-bottom: 10upx;

						.number {
							margin-left: 30upx;
							color: #F0AD4E;
						}
					}

					// 赞
					.count {
						display: flex;
						flex-direction: row;
						
						.good {
							margin-left: 130upx;
							font-size: 30upx;
							color: #999999;
						}
					}
				}
			}
		}
	}

	// 剧情介绍
	.content_box {
		border-top: 2px solid #ccc;
		margin: 0 40upx;
		padding: 40upx 0;
		font-size: 26upx;

		.title {
			color: #969696;
			font-weight: 700;
		}

		// 剧情内容
		.content {
			margin-top: 15upx;
			// 首行缩进
			text-indent: 2em;
			// 文字5行显示 超出省略
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 5;
			line-clamp: 5;
			-webkit-box-orient: vertical;
		}
	}
	// 演员列表
	.cast_list {
		margin: 0 40upx 40upx 40upx;
		border-top: 2px solid #ccc;
		font-size: 26upx;
		// 标题
		.title {
			font-weight: 700;
			padding: 40upx 0;
			color: #969696;
		}
		// 演员
		.director_box {
			padding-bottom: 20upx;
			white-space: nowrap;
			display: flex;
			flex-direction: row;

			.director {
				display: inline-block;
				padding-right: 20upx;
				font-size: 26upx;
				width: 200upx;
				// 演员图片
				.director_img {
					width: 200upx;
					height: 270upx;
					border-radius: 3%;
				}
				// 演员名字
				.name {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					padding-bottom: 4upx;
					font-size: 30upx;
				}
				// 饰演角色
				.actName {
					color: #969696;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
	// 剧照
	.plotPics {
		margin: 0 40upx 0 40upx;
		border-top: 2px solid #ccc;
		font-size: 26upx;
		.title {
			padding: 40upx 0;
			font-weight: 700;
			color: #969696;
		}
		.plotPicsList {
			display: flex;
			flex-wrap: nowrap;
			.item {
				width: 30%;
				padding-right: 20upx;
				.img {
					width: 200upx;
					height: 270upx;
					padding-bottom: 20rpx;
					border-radius: 3%;
				}
			}
		}
	}
</style>
