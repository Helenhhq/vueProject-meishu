import Vue from 'vue'

//底部的导航条
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);

//加载
import { Loading } from 'vant';
Vue.use(Loading);

//图片懒加载
import { Image } from 'vant';
Vue.use(Image);

//提示
import { Toast } from 'vant';
Vue.use(Toast);

//弹出框
import { Dialog } from 'vant';
Vue.use(Dialog);