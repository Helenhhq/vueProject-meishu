import Vue from 'vue'

// 人民币过滤器
Vue.filter('moneyFormat',(val) => {
	return '￥' + Number(val).toFixed(2);
})