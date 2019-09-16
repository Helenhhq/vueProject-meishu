import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 引入一级组件
import DashBoard from './../views/dashboard/DashBoard.vue';
//路由懒加载
const Home = () => import('./../views/home/Home.vue');
const Mine = () => import('./../views/mine/Mine.vue');
const Category = () => import('./../views/category/Category.vue');
const Cart = () => import('./../views/cart/Cart.vue');



export default new Router({
	routes:[
	{path:'/',redirect:'/dashboard'},
	{
		path:'/dashboard',
		name:'dashboard',
		component:DashBoard,
		children:[
			{path:'/dashboard',redirect:'/dashboard/home'},
			{path:'home',name:'home',component:Home,meta:{keepAlive:true}},
			{path:'mine',name:'mine',component:Mine},
			{path:'category',name:'category',component:Category,meta:{keepAlive:true}},
			{path:'cart',name:'cart',component:Cart},
		]
	}
	]
})