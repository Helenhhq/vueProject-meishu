import ajax from './ajax'

// 接口：http://demo.itlike.com/web/xlmc/api/homeApi
// http://demo.itlike.com/web/xlmc/api/homeApi 
// http://demo.itlike.com/web/xlmc/api/homeApi/categories 
// http://demo.itlike.com/web/xlmc/api/homeApi/categoriesdetail

// 1.定义基础路径
const BASE_URL = 'http://demo.itlike.com/web/xlmc'

//这个只有url,没有params,默认GET请求，外界请求数据可以直接用getHomeData
export const getHomeData = () => ajax(BASE_URL+'/api/homeApi');
export const getCategories = () => ajax(BASE_URL+'/api/homeApi/categories');
export const getCategoriesDetail = (preParams) => ajax(BASE_URL+'/api/homeApi/categoriesdetail'+preParams);