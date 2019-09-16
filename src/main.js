import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

// 1.引入fastclick，目的：消除移动端浏览器上的物理点击和触发一个click事件之间的300ms的延迟 
import FastClick from 'fastclick'

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}
// 2.引入全局样式
import '@/style/common.less'

// 3.引入全局UI组件库vant
import '@/plugins/vant'

// 4.引入rem，强大的屏幕适配布局，相对于根元素的字体大小的单位
import '@/config/rem'

//引入全局过滤器
import '@/config/filters'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
