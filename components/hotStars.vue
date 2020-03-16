<template name="hotStars">
	<view>
		<!-- 热门影视预告评分 -->
		<view class="hot_score_star">
			
			<!-- 黄色星星 -->
			<image 
				v-for="yellow in yellowStar" 
				src="/static/icos/star-yellow.png" 
				class="star_ico"></image>
			<!-- 灰色星星 -->
			<image  
				v-for="gray in grayStar" 
				src="/static/icos/star-gray.png"
				class="star_ico"></image>
			
			<!-- 分数   如果showNum为1 则显示分数-->
			<view class="hot_score" v-if="showNum == 1">
				{{innerScore}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "hotStars",
		props: {
			innerScore: 0,  // 定义外部传入的分数
			showNum: 0   // 是否需要显示具体的分数  1: 显示  0: 不显示
		},
		data() {
			return {
				// 几颗黄色星星
				yellowStar: 0,
				// 几颗灰色星星  
				grayStar: 5
			}
		},
		//  生命周期  组件创建完成后调用
		created() {
			let score = 0;    // 装载分数
			// 如果外部传来的分数 不是null,undefined,字符串
			if(this.innerScore !== null & this.innerScore !== '' & this.innerScore !== undefined) {
				score = this.innerScore
			}
			// 分数总分10分  星星总共5颗  一颗星代表2分
			let yellowStar = parseInt(score / 2)
			
			let grayStar= 5 - yellowStar  // 灰色星星
			
			this.yellowStar = yellowStar
			this.grayStar = grayStar
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.hot_score_star {
		display: flex;
		flex-direction: row;

		.star_ico {
			margin-top: 6upx;
			width: 20upx;
			height: 20upx;
		}

		.hot_score {
			font-size: 12px;
			color: #cccccc;
			margin-left: 6upx;
		}
	}
</style>
