<!-- 首页 -->
<template>
	<view class="page">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="swiperBox">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.image" class="sBoxImg" lazy-load @click="goDetail(item.movieId)"></image>
			</swiper-item>
		</swiper>
		<!-- 热门影片 -->
		<view class="page_block super-hot">
			<!-- hot head -->
			<view class="hot_head">
				<!-- 小logo -->
				<image src="../../static/icos/hot.png" class="hot_ico"></image>
				<view class="hot_title">
					热门影片
				</view>
			</view>
			<!-- hot body -->
			<scroll-view scroll-x="true">
				<view class="hotList">
					<view v-for="(item,index) in moveHotList" :key="index" class="hot_body">
						<image :src="item.cover" class="hot_img" lazy-load @click="goDetail(item.id)"></image>
						<view class="hot_name">{{item.name}}</view>
						<!-- 评分星星组件 -->
						<hot-stars :innerScore="item.score" showNum="1"></hot-stars>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 影视预告标题 -->
		<view class="page_block super-hot">
			<!-- hot head -->
			<view class="hot_head">
				<!-- 小logo -->
				<image src="../../static/icos/interest.png" class="hot_ico"></image>
				<view class="hot_title">
					热门预告
				</view>
			</view>
		</view>
		<!-- 影视预告视频 -->
		<view class="page_block hot_moves">
			<video :id="item.id" :data-playingIndex="item.id" @play="controlPlay" v-for="(item,index) in trailerList" :key="index" :src="item.trailer" :poster="item.poster"
			 controls class="trailer_video"></video>
		</view>
		<!-- 猜你喜欢标题 -->
		<view class="page_block super-hot">
			<!-- hot head -->
			<view class="hot_head">
				<!-- 小logo -->
				<image src="../../static/icos/interest.png" class="hot_ico"></image>
				<view class="hot_title">
					猜你喜欢
				</view>
			</view>
		</view>
		<!-- 猜你喜欢body -->
		<view class="page_block u_like">
			<view class="like_movie" v-for="(item,gIndex) in guessLikeList" :key="item.id">
				<image :src="item.cover" class="like_img"></image>
				<!-- 简介 -->
				<view class="movie_desc">
					<!-- 影片名称 -->
					<view class="movie_title">
						{{item.name}}
					</view>
					<!-- 评分 -->
					<hotStars :innerScore="item.score" showNum="1"></hotStars>
					<!-- 影片时间类型地址 -->
					<view class="movie_info">
						{{item.basicInfo}}
					</view>
					<!-- 上映时间 -->
					<view class="movie_info">
						{{item.releaseDate}}
					</view>
				</view>
				<!-- 赞一下 -->
				<view class="movie_oper" :data-gIndex="gIndex" @click="good">
					<image src="../../static/icos/praise.png" class="praise_ico"></image>
					<view class="praise">
						赞一下
					</view>
					<view :animation="animationDataArr[gIndex]" class="praise animation">
						+1
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 热门影视评分星星
	import hotStars from '../../components/hotStars'
	export default {
		data() {
			return {
				// 轮播图数据
				swiperList: [],
				// 热门影视
				moveHotList: [],
				// 影视预告片
				trailerList: [],
				// 猜你喜欢
				guessLikeList: [],
				// 动画对象 里面可以放多个动画
				animationData: {},
				animationDataArr: [{}, {}, {}, {}, {}]
			}
		},
		// 组件
		components: {
			hotStars
		},
		onUnload() {
			// 页面卸载时  清除动画数据
			this.animationData = {},
				this.animationDataArr = [{}, {}, {}, {}, {}];
		},
		onLoad() {
			// 页面加载时 渲染轮播图
			this.getSwiperList()
			// 渲染热门影视数据
			this.getMoveHot()
			// 渲染热门预告片
			this.getTrailer()
			// 渲染猜你喜欢
			this.getGuessLike()
			// 创建一个动画实例
			this.animation = uni.createAnimation()
		},
		// 开始下拉刷新
		onPullDownRefresh() {
			// 重新渲染猜你喜欢
			this.getGuessLike()
		},

		// 隐藏
		onHide() {
			if (this.videoContext) {
				this.videoContext.pause();
			}
		},
		methods: {
			// 获取轮播图数据
			getSwiperList() {
				uni.request({
					url: `${this.$api}/index/carousel/list?qq=122212489`,
					method: "POST",
					success: (res) => {
						console.log(res.data.data)
						if (res.data.status == 200) {
							this.swiperList = res.data.data
						}
					}
				});
			},
			// 去详情页面
			goDetail(id) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}`,
				});
			},
			// 获取热门影视数据
			getMoveHot() {
				uni.request({
					url: `${this.$api}/index/movie/hot?qq=122212489&type=superhero`,
					method: "POST",
					success: (res) => {
						console.log(res.data.data)
						this.moveHotList = res.data.data
					}
				})
			},
			// 获取影视预告片数据
			getTrailer() {
				uni.request({
					url: `${this.$api}/index/movie/hot?qq=122212489&type=trailer`,
					method: "POST",
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 200) {
							this.trailerList = res.data.data
						}
					}
				})
			},
			// 播放当前视频  暂停其他的视频
			controlPlay(e) {
				// 播放视频的id
				let trailerId = "";
				if (e) {
					// 用户点击的id
					trailerId = e.currentTarget.dataset.playingindex;
					this.videoContext = uni.createVideoContext(trailerId);
				}

				let trailerList = this.trailerList;
				for (let i = 0; i < trailerList.length ; i ++) {
					let tempId = trailerList[i].id;
					
					// 拿到预告片视频的id 与 用户点击的id对比
					if (tempId != trailerId) {
						uni.createVideoContext(tempId).pause();
					}
				}
			},
			// 猜你喜欢
			getGuessLike() {
				// 页面显示loading加载中
				uni.showLoading({
				    mask: true  // 刷新时 防止触摸穿透 防止用户点击播放视频
				});
				uni.showNavigationBarLoading();  // 当前页面导航栏刷新动画
				uni.request({
					url: `${this.$api}/index/guessULike?qq=122212489`,
					method: "POST",
					success: (res) => {
						console.log(res.data.data)
						if (res.data.status == 200) {
							this.guessLikeList = res.data.data
						}
					},
					// 接口调用结束的回调函数 complete
					complete: () => {
						setTimeout(function () {
							// 停止刷新
							uni.stopPullDownRefresh();
							// 隐藏loading加载中
						    uni.hideLoading();
							// 隐藏导航栏刷新动画
							uni.hideNavigationBarLoading()
						}, 1000);
					}
				})
			},
			// 赞一下 +1 动画
			good(e) {
				var gIndex = e.currentTarget.dataset.gindex;
				console.log(gIndex);
				// return
				// step 一组动画完成后 才能进行下一组
				this.animation.translateY(-60).opacity(1).step({
					// 动画延迟时间
					duration: 400,
				})
				// 导出动画数据
				// this.animationData = this.animation.export()
				this.animationData = this.animation
				this.animationDataArr[gIndex] = this.animationData.export()

				// 还原动画
				setTimeout(() => {
					this.animation.translateY().opacity(0).step({
						duration: 0
					})
					// 导出动画数据
					// this.animationData = this.animation.export()
					this.animationData = this.animation
					this.animationDataArr[gIndex] = this.animationData.export()
				}, 500)
			}
		}
	}
</script>

<style lang="scss">
	// 轮播图
	.swiperBox {
		width: 100%;
		height: 440upx;

		.sBoxImg {
			width: 100%;
			height: 100%;
		}
	}

	// 热门影视
	.super-hot {
		margin-top: 12upx;
		padding: 20upx;

		// 热门影视 head
		.hot_head {
			display: flex;
			flex-direction: row;
			margin-bottom: 10upx;

			.hot_ico {
				width: 40upx;
				height: 40upx;
				margin-top: 15upx;
			}

			.hot_title {
				font-size: 20px;
				margin-left: 20upx;
				font-weight: 700;
			}
		}

		// 热门影视 hot body
		.hotList {
			width: 100%;
			white-space: nowrap;

			.hot_body {
				margin-left: 20upx;
				display: inline-block;

				.hot_img {
					width: 200upx;
					height: 270upx;
					padding-right: 20upx;
				}

				.hot_name {
					width: 200upx;
					margin-top: 10upx;
					font-size: 14px;
					font-weight: 700;
					// name超出省略
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}

	// 热门预告片
	.hot_moves {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 20upx 20upx 20upx;

		.trailer_video {
			width: 350upx;
			height: 220upx;
			margin-top: 10upx;
		}
	}

	// 猜你喜欢
	.u_like {
		display: flex;
		flex-direction: column;

		.like_movie {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 30upx 20upx;

			// 图片
			.like_img {
				width: 180upx;
				height: 240upx;
				border-radius: 3%;
			}

			// 简介
			.movie_desc {
				width: 340upx;
				display: flex;
				flex-direction: column;

				.movie_title {
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.movie_info {
					color: #808080;
					font-size: 14px;
				}
			}

			// 赞一下
			.movie_oper {
				width: 140upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				border-left: 2px dashed #C8C7CC;

				.praise_ico {
					width: 40upx;
					height: 40upx;
					align-self: center;
				}

				.praise {
					font-size: 12px;
					color: #f1ab2a;
					align-self: center;
				}

				.animation {
					font-weight: 700;
					opacity: 0;
				}
			}
		}
	}
</style>
