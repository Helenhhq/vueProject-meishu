import {
	ADD_GOODS,
	INIT_SHOP_CART,
	REMOVE_CART,
	SELECTED_SINGLE_GOODS,
	SELECTED_ALL_GOODS,
	CLEAR_CART
} from "./mutations-type"

import {getStore,setStore} from '@/config/global'
import Vue from 'vue'

export default {
	// 1.往购物车中添加数据
	[ADD_GOODS](state,{goodsId,goodsName,smallImage,goodsPrice}){
		let shopCart = state.shopCart;
		//判断商品是否存在
		if(shopCart[goodsId]){//存在
			shopCart[goodsId]['num']++
		}else{
			shopCart[goodsId] = {
				"num":1,
				"id":goodsId,
				"name":goodsName,
				"small_image":smallImage,
				"price":goodsPrice,
				"checked":true
			}
		}
		//产生新对象
		state.shopCart = {...shopCart};
		//存入本地
		setStore('shopCart',state.shopCart)
	},
	//2.页面初始化，获取购物车的数据（本地）
	[INIT_SHOP_CART](state){
		let initCart = getStore('shopCart');
		if(initCart){
			state.shopCart = JSON.parse(initCart);
		}
	},
	//3.把商品移出购物车
	[REMOVE_CART](state,{goodsId}){
		let shopCart = state.shopCart;
		console.log(shopCart);
		let goods = shopCart[goodsId];
		console.log(goods);
		if(goods){
			if(goods['num']> 0){
				goods['num']--;
				//判断是否只有0个
				if(goods['num'] === 0){
					delete shopCart[goodsId]
				}
			}else{
				goods = null;
			}
			//同步数据
			state.shopCart = {...shopCart};
			setStore('shopCart',state.shopCart)
		}
	},
	//4.单个商品的选中和取消选中
	[SELECTED_SINGLE_GOODS](state,{goodsId}){
		let shopCart = state.shopCart;
		let goods = shopCart[goodsId];
		if(goods){
			if(goods.checked){
				goods.checked = !goods.checked;
			} else {
				//往goods对象里面追加checked属性，属性值默认为true
				Vue.set(goods,'checked',true)
			}
			//同步数据
			state.shopCart = {...shopCart};
			setStore('shopCart',state.shopCart)
		}
	},
	//5.全选和取消全选
	[SELECTED_ALL_GOODS](state,{isSelected}){
		let shopCart = state.shopCart;
		Object.values(shopCart).forEach((goods,index) => {
			if(goods.checked){
				goods.checked = !isSelected;
			}else{
				Vue.set(goods,'checked',!isSelected)
			}
		});
		state.shopCart = {...shopCart};
	},
	//6.清空购物车
	[CLEAR_CART](state){
		state.shopCart = null;
		state.shopCart = {...state.shopCart};
		setStore('shopCart',state.shopCart)
	}
}