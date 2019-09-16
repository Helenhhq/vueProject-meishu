(function(doc,win){
	
	/*网易的一种配置方案
	*当设备的方向变化（设备横向持或纵向持）此事件被触发。orientationchange
    *注意现在当浏览器不支持orientationChange事件的时候我们绑定了resize 事件。
    *总之就是监听当前窗口的变化，一旦有变化就需要重新设置根字体的值
    */

    //页面具有 DTD，使用 document.documentElement。页面不具有 DTD，使用 document.body。
	var docEl = doc.documentElment || doc.body,
		resizeEvt = 'orientationchange' in window ? 'orientationchange':'resize',
		recalc = function(){
			var clientWidth = docEl.clientWidth;
			if(!clientWidth)return
			docEl.style.fontSize = 15 * (clientWidth/320) + 'px';
			// docEl.style.fontSize = 20 * (clientWidth/320) + 'px';(慕课)
		};
	if(!doc.addEventListener)return
	win.addEventListener(resizeEvt,recalc,false);
	doc.addEventListener('DOMContentLoaded',recalc,false)
})(document,window);