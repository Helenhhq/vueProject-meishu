<template>
	<div id="dashboard">
		<van-tabbar v-model="active" active-color="#75b341">
			<van-tabbar-item replace to="/dashboard/home">
				<span>首页</span>
				<img
				slot="icon"
				slot-scope="props"
				:src="props.active ? home_icon.active : home_icon.normal"
				>
			</van-tabbar-item>
			<van-tabbar-item replace to="/dashboard/category">
				<span>分类</span>
				<img
				slot="icon"
				slot-scope="props"
				:src="props.active ? category_icon.active : category_icon.normal"
				>
			</van-tabbar-item>
			<van-tabbar-item replace to="/dashboard/cart" :info="goodsNum > 0 ? goodsNum :''">
				<span>购物车</span>
				<img
				slot="icon"
				slot-scope="props"
				:src="props.active ? cart_icon.active : cart_icon.normal"
				>
			</van-tabbar-item>
			<van-tabbar-item replace to="/dashboard/mine">
				<span>我的</span>
				<img
				slot="icon"
				slot-scope="props"
				:src="props.active ? mine_icon.active : mine_icon.normal"
				>
			</van-tabbar-item>
		</van-tabbar>
		<!-- 是否缓存 -->
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"/>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"/>
	</div>
</template>
<!-- 问题：第一次进到dashboard里时，不管是哪一个（mine，category，cart），下面的bar都是显示的首页active颜色，然后点击过又恢复正常 -->
<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		name: "dashboard",
		data() {
			return {
				active: Number(sessionStorage.getItem('tabBarActiveIndex')) || 0,
				home_icon: {
					normal: require('@/images/tabbar/home_default.png'),
					active: require('@/images/tabbar/home_selected.png')
				},
				category_icon: {
					normal: require('@/images/tabbar/category_default.png'),
					active: require('@/images/tabbar/category_selected.png')
				},
				cart_icon: {
					normal: require('@/images/tabbar/shoppingcart_default.png'),
					active: require('@/images/tabbar/shoppingcart_selected.png')
				},
				mine_icon: {
					normal: require('@/images/tabbar/mine_default.png'),
					active: require('@/images/tabbar/mine_selected.png')
				},
			}
		},
		computed: {
			...mapState(['shopCart']),
			goodsNum(){
				if(this.shopCart){
					//总的购物车商品数量
					let num = 0;
					Object.values(this.shopCart).forEach((goods,index) => {
						num += goods.num;
					});
					return num;
				}else {
					return 0;
				}
			}
		},
		methods: {
			...mapMutations(['INIT_SHOP_CART']),
		},
		mounted(){
			//获取购物车的数据
			this.INIT_SHOP_CART()
		},
		watch:{
			active(value){
				// console.log(value);
				let tabBarActiveIndex = value > 0 ? value : 0;
				// 缓存到本地
				sessionStorage.setItem('tabBarActiveIndex',value);
			}
		}
	}
</script>

<style lang="less" scoped>
	#dashboard{
		width: 100%;
		height: 100%;
	}
</style>