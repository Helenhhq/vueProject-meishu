import axios from 'axios'

/*
	url格式：hhh?name=小何&age=22&sex=女
*/
export default function ajax(url = '',params = {},type = 'GET'){
	// 1.用于接收最终输出的变量
	let promise;

	// 2.返回一个promise对象
	return new Promise((resolve,reject) => {
		// 2.1判断请求的类型
		if(type.toUpperCase() === 'GET'){
			// 2.2拼接字符串
			let paramsStr = '';
			// 2.3将拿到的params的属性key放到数组中然后遍历一下
			Object.keys(params).forEach(key => {
				paramsStr += key + '=' + params[key] + '&';
			})
			// 2.4 有值时，过滤掉最后一个&
			if(paramsStr){
				//stringObject.substr(start,length)
				// paramsStr.lastIndexOf('&')返回最后一个&的下标位置
				paramsStr = paramsStr.substr(0,paramsStr.lastIndexOf('&'))
			}
			// 2.5拼接完整路径
			url += '?' + paramsStr;
			// 2.6发起get请求
			promise = axios.get(url);
		}else if(type.toUpperCase() === 'POST'){
			// 2.7发起post请求
			promise = axios.post(url,params);
		}
		// 2.8处理结果并返回
		promise.then((response) => {
			resolve(response.data);
		}).catch((error) => {
			reject(error);
		})
	});
}