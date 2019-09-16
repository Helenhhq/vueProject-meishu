<template>
	<swiper id="swiper" :options="swiperOption" ref="mySwiper">
		<!-- slides -->
		<swiper-slide v-for="(sowing,index) in sowing_list" :key="sowing.public_id">
			<img :src="sowing.icon_url" :alt="sowing.public_name">
		</swiper-slide>
		<!-- Optional controls -->
		<div class="swiper-pagination" slot="pagination"></div>
	</swiper>	
</template>

<script>
	// mount with component
	import 'swiper/dist/css/swiper.css'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'

	export default {
		name: "sowing",
		props:{
			sowing_list:Array
		},
		data(){
			return{
				swiperOption:{
					// 如果是false，则必须要等到数据什么的都下来才能拿到它swiper对象，不申明也有其他方式解决(这个之后查阅一下)
					notNextTick:true,
					//分页
					pagination: {
						el: '.swiper-pagination',
						clickable :true,
					},
					//循环
					loop : true,
					//在从后台获取完数据之后再初始化swiper，同时启动动态检查器observer
					// observer:true,
					//修改swiper的父元素时，自动初始化swiper
					// observeParents:true,
					autoplay : {
						delay: 1000
					},
					speed:300,
				}
			}
		},
		computed:{
			// 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
			// swiper() {
			// 	return this.$refs.mySwiper.swiper
			// }
		},
		methods:{
			// swiper的bug（动态从后台获取数据产生的循环bug等）的第一种解决方式
			// initSwiper () {
			// 	var mySwiper = new Swiper('#swiper',this.swiperOption);
			// 	return mySwiper;
			// }
		},
		components: {
			swiper,
			swiperSlide
		},
		created(){
			// swiper的bug（动态从后台获取数据产生的循环bug等）的第一种解决方式
			// this.$nextTick(() => {
			// 	this.initSwiper();
			// })
		}
	}
</script>

<style lang="less" scoped>
	#swiper{
		width: 100%;
		height: 10rem;
		background-color: transparent;
	}
	#swiper img{
		width: 100%;
		height: 100%;
	}
	/*穿透修改样式
		(1)stylus的样式穿透 使用 >>> 
		(2)sass和less的样式穿透 使用 /deep/
	*/
	#swiper /deep/ .swiper-pagination-bullet-active {
		background-color: #75b341;
	}
</style>
