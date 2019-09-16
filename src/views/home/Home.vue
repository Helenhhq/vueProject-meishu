<template>
	<div id="home">
		<div v-if="!showloading">
			<Header/>
			<!-- 轮播图 -->
			<Sowing :sowing_list="sowing_list" />
			<!-- 中部导航 -->
			<Nav :nav_list="nav_list" />
			<!-- 秒杀 -->
			<FlashSale :flash_sale_product_list="flash_sale_product_list"/>
			<!-- 猜你喜欢 -->
			<YouLike :you_like_list="you_like_list"/>
			<!-- 返回顶部图标 -->
			<MarkPage v-if="showBackStatus" :scrollToTop="scrollToTop"/>
		</div>
		<!-- 加载动画 -->
		<van-loading 
			class="loading" 
			v-else 
			type="spinner" 
			color="#75b341"
		>
			美蔬正在加载中...
		</van-loading>
	</div>
</template>

<script>
	// 1.引入请求数据的方法
	import { getHomeData } from './../../service/api/index.js'

	// 2.引入组件
	import Header from './components/header/Header'
	import Sowing from './components/sowing/Sowing'
	import Nav from './components/nav/Nav'
	import FlashSale from './components/flashSale/FlashSale'
	import YouLike from './components/youLike/YouLike'
	import MarkPage from './components/markPage/MarkPage'

	//3.引入处理返回顶部的函数
	import { showBack,animate } from '@/config/global'

	//4.引入通知插件
	import PubSub from 'pubsub-js'
	import { Toast } from 'vant';

	//5.引入vuex
	import {mapMutations} from 'vuex'

	export default {
		name: "home",
		data(){
			return {
				//首页的轮播图数据
				sowing_list:[],
				//导航的数据
				nav_list:[],
				//秒杀的数据
				flash_sale_product_list:[],
				//猜你喜欢的数据
				you_like_list:[],
				//是否显示加载图标
				showloading:true,
				// 是否显示返回顶部的按钮
				showBackStatus:false
			}
		},
		created() {
			// 2.请求网络数据
			// 同步async/await
			this.reqDate();
			//异步promise请求数据
			// getHomeData().then((response) => {
			// 	if(response.success){
			// 		// console.log(response);
			// 		this.sowing_list = response.data.list[0].icon_list;
			// 		this.nav_list = response.data.list[2].icon_list;
			// 		this.flash_sale_product_list = response.data.list[3].product_list;
			// 		this.you_like_list = response.data.list[12].product_list;
			// 		//隐藏加载动画
			// 		this.showloading = false;
			// 		//开始监听滚动,到达一定位置就显示返回顶部按钮
			// 		showBack((status) => {this.showBackStatus = status})
			// 	}
			// }).catch((error) => {
			// 	console.log("你的请求出错了哦！")
			// })
		},
		mounted(){
			//订阅消息(添加到购物车的消息)
			PubSub.subscribe('homeAddToCart',(msg,goods)=>{
				if(msg === "homeAddToCart"){
					this.ADD_GOODS({
						goodsId:goods.id,
						goodsName:goods.name,
						smallImage:goods.small_image,
						goodsPrice:goods.price
					});
					//提示用户
					Toast({
						message:"添加到购物车成功！",
						duration:800
					});
				}
			})
		},
		components: {
			Header,
			Sowing,
			Nav,
			FlashSale,
			YouLike,
			MarkPage
		},
		methods: {
			//拿到mutations里的'ADD_GOODS'方法
			...mapMutations(['ADD_GOODS']),
			scrollToTop() {
				//做缓动动画返回顶部
				let docEl = document.documentElement || document.body;
				animate(docEl,{scrollTop:'0'},400,'ease-out');
			},
			async reqDate(){
				let res = await getHomeData();
				if(res.success){
					// console.log(res);
					this.sowing_list = res.data.list[0].icon_list;
					this.nav_list = res.data.list[2].icon_list;
					this.flash_sale_product_list = res.data.list[3].product_list;
					this.you_like_list = res.data.list[12].product_list;
					//隐藏加载动画
					this.showloading = false;
					//开始监听滚动,到达一定位置就显示返回顶部按钮
					showBack((status) => {this.showBackStatus = status})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	#home{
		width: 100%;
		height: 300rem;
	}
	.loading{
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%);
	}
	.van-loading__text{
		color: #75b341;
	}
</style>