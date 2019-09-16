<template>
	<div id="category">
		<!-- 头部 -->
		<Header />
		<!-- 内容 -->
		<div class="listWrapper" v-if="!showloading">
			<!-- 左边 -->
			<div class="leftWrapper">
				<ul class="wrapper">
					<li 
						class="categoryItem" 
						v-for="(cate,index) in categoriesData"
						:key="cate.id"
						:class="{selected:currentIndex === index}"
						@click="clickLeftLi(index)"
						ref="menuList"
						>
						<span class="textWrapper">{{cate.name}}</span>
					</li>
				</ul>
			</div>
			<!-- 右边 -->
			<ContentView :categoriesDetailData="categoriesDetailData"/>
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
	import Header from './components/Header'
	import ContentView from './components/ContentView'

	//引入滚动组件
	import BScroll from 'better-scroll'

	//引入接口
	import { getCategories,getCategoriesDetail } from './../../service/api/index'

	//引入通知插件
	import PubSub from 'pubsub-js'
	import { Toast } from 'vant';

	import {mapMutations} from 'vuex'

	export default {
		name: "category",
		data(){
			return {
				//是否显示加载图标
				showloading:true,
				//左边列表数据
				categoriesData:[],
				//右边列表数据
				categoriesDetailData:[],
				//左边item选中与否
				currentIndex:0
			}
		},
		created(){
			this.initData()
		},
		components: {
			Header,
			ContentView
		},
		mounted(){
			//订阅消息(添加到购物车的消息)
			PubSub.subscribe('categoryAddToCart',(msg,goods)=>{
				if(msg === "categoryAddToCart"){
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
		methods:{
			...mapMutations(['ADD_GOODS']),
			//初始化操作（数据和界面）
			async initData(){
				// 获取左边的数据
				let leftRes = await getCategories();
				if(leftRes.success){
					this.categoriesData = leftRes.data.cate;
				}
				// console.log(this.categoriesData);
				// 获取右边的数据
				let rightRes = await getCategoriesDetail('/lk001');
				if(rightRes.success){
					this.categoriesDetailData = rightRes.data.cate;
				}
				// console.log(this.categoriesDetailData);
				//隐藏loading
				this.showloading = false;
				//初始化滚动框架
				this.$nextTick(() => {
					this.leftScroll = new BScroll('.leftWrapper',{
						probeType:3,
					})
				});

			},
			//处理左边的点击事件
			async clickLeftLi(index){
				this.currentIndex = index;
				// 滚动到对应的位置
				let menuLists = this.$refs.menuList;
				// console.log(menuLists);
				let el = menuLists[index];
				// console.log(el);
				//滚动到对应的元素上
				this.leftScroll.scrollToElement(el,300);
				// 获取右边的数据
				let rightRes = await getCategoriesDetail(`/lk00${index+1}`);
				if(rightRes.success){
					this.categoriesDetailData = rightRes.data.cate;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	#category{
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
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
	.listWrapper{
		display: flex;
		position: absolute;
		top: 2.75rem;
		bottom: 3rem;
		width: 100%;
		overflow: hidden;
	}
	.leftWrapper {
        background-color: #F4F4F4;
        width: 5.3125rem;
        flex: 0 0 5.3125rem;
    }
	.categoryItem {
		padding: 0.75rem 0;
		border-bottom: solid 1px #E8E9E8;
	}
	.categoryItem .textWrapper {
		line-height: 1.25rem;
		border-left: solid 0.1875rem transparent;
		padding: 0.3125rem 0.6875rem;
		font-size: 0.8125rem;
		color: #666;
	}
	.categoryItem.selected {
		background: #FFF;
	}
	.categoryItem.selected .textWrapper {
		border-left-color: #3cb963;
		font-weight: bold;
		font-size: 0.875rem;
		color: #333;
	}
	@media (min-width: 960px) {
		.wrapper {
			border-right: 1px solid #E8E9E8;
		}
		.wrapper .categoryItem {
			background: #fff;
		}
	}
</style>