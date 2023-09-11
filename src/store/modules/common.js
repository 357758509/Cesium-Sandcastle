import dynamicRouter from "@/assets/json/dynamicRouter.json"
import {getFlatArr,getShowMenuList}  from "@/utils/util.js"
import router from "@/router";
const modulesContext = require.context('@/views', true, /\.vue$/);

const modules = {};
  const modulePaths = modulesContext.keys();
modulePaths.forEach(modulePath => {
  const moduleKey = modulePath.replace(/\.\/([^/]+)\.vue$/, '$1');
  modules[moduleKey] = modulesContext(modulePath).default;
});
console.log(modules)
// common.js是公共vux模块
const state = {
   //  开户银行当前选中数据
   bankObj: {},
  //  开户支行当前选中数据
  subBranchObj: {},
  // 获取当前活跃页面的路径
  GetActivePageRoute: '',
  // 控制登录页元素的显示和隐藏
  loginDomShowHide: true,
  ThreeDdataThemeConfig: {
    // 折叠菜单
    isCollapse: false,
  },
  // 后端返回的菜单列表 ==> 这里没有经过任何处理
  menuData: [],
  // 扁平化之后的一维数组路由，主要用来添加动态路由
  flatMenuListGet: [],
  // 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true
  showMenuListGet: [],
  // 列表每一项的数据
  CesiumDomItem: localStorage.getItem("CesiumDomItem") || {}
}

const mutations = {
  GET_CESIUMDOMITEM: (state, payload) => {
    state.CesiumDomItem = payload
    localStorage.setItem("CesiumDomItem",payload)
  },
  GET_SHOWMENULISTGET: (state, payload) => {
    state.showMenuListGet = payload
  },
  GET_FLATMENULISTGET: (state, payload) => {
    state.flatMenuListGet = payload
  },
  GET_THREEDDATATHEMECONFIG: (state, payload) => {
    state.ThreeDdataThemeConfig.isCollapse = payload
  },
  GET_MENUDATA: (state, payload) => {
    state.menuData = payload
  },
  GET_BANKOBJ: (state, payload) => {
	  console.log('11111', payload)
     state.bankObj = payload
  },
  GET_SUbBRANCHOBJ: (state, payload) => {
	  state.subBranchObj = payload
  },
  GET_ACTIVEPAGEROUTE:(state, payload) => {
  	  state.GetActivePageRoute = payload
  },
  GET_LOGINDOMSHOWHIDE:(state, payload) => {
	  console.log('为什么不是true', payload)
  	  state.loginDomShowHide = payload
  },
}

const actions = {
	getBankObj({ commit }, payload) {
	  commit('GET_BANKOBJ', payload)
   },
   getsubbranchobj({ commit }, payload) {
	  commit('GET_SUbBRANCHOBJ', payload)
   },
   getactivepageroute({ commit }, payload) {
   	  commit('GET_ACTIVEPAGEROUTE', payload)
   },
   getloginDomShowHide({ commit }, payload){
	   commit('GET_LOGINDOMSHOWHIDE', payload)
   },
   setIsCollapse({ commit }, payload){
     commit('GET_THREEDDATATHEMECONFIG', payload)
  },
  setMenuData({ commit }, payload){
    return new Promise((resolve) => {
      commit('GET_MENUDATA', dynamicRouter.data)
      dynamicRouter.data.forEach((item) => {
        item.children && delete item.children;
        if (item.component) {
          item.component = modules["." + item.component + ".vue"];
        }
        if (item.meta.isFull) {
          router.addRoute(item);
        } else {
          router.addRoute("Layouts", item);
        }
      });
      resolve(dynamicRouter.data)
    })
  },
    setFlatMenuListGet({ commit }, payload){
      commit('GET_FLATMENULISTGET', getFlatArr(dynamicRouter.data))
    },
    setShowMenuListGet({ commit }, payload){
        commit('GET_SHOWMENULISTGET', getShowMenuList(dynamicRouter.data))
    },
    setCesiumDomItem({ commit }, payload){
      commit('GET_CESIUMDOMITEM', payload)
    },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
