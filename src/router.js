import Edit from '@/pages/edit/Index.vue'
import Preview from '@/pages/edit/Preview.vue'
import Embed from '@/pages/embed/Index.vue'
import Layouts from '@/pages/layouts/index.vue'
import FlyingRoam from '@/views/FlyingRoam/index.vue'
import Home from '@/views/home/index.vue'
import dynamicRouter from "@/assets/json/dynamicRouter.json"
import { useStore } from 'vuex'
import { isType } from "@/utils/util.js"
import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import { routerMode, base } from './config'
// 引入 views 文件夹下所有 vue 文件
// const modules = import.meta.glob("@/views/**/*.vue");
// 创建一个 context，传入需要匹配的文件路径

/**
 * @description 动态路由参数配置简介 📚
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 是否外链
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否缓存
 * */
// const modulesContext = require.context('@/views', true, /\/[^/]+\.vue$/);
const modulesContext = require.context('@/views', true, /\.vue$/);


const routes = [
  {
    path: '/',
    name: 'Layouts',
    component: Layouts,
    redirect: '/FlyingRoam/index',
		children: [
      // {
      //   path: "/FlyingRoam",
      //   name: "FlyingRoam",
      //   component: () => import(`@/views/FlyingRoam/index`),
      //   meta: {
      //       icon: "icon-shujujieru",
      //       title: "飞行漫游",
      //       isLink: "",
      //       isHide: false,
      //       isFull: false,
      //       isAffix: false,
      //       isKeepAlive: true
      //   }
      // },
      // {
      //   path: "/home/index",
      //   name: "home",
      //   component: Home,
      //   meta: {
      //       icon: "icon-shouye",
      //       title: "首页",
      //       isLink: "",
      //       isHide: true,
      //       isFull: false,
      //       isAffix: true,
      //       isKeepAlive: true
      //   }
      // },
      {
        path: '/Editor',
        name: 'Editor',
        component: Edit
      }
    ]
  },
  // {
  //   path: '/Editor',
  //   name: 'Editor',
  //   component: Edit
  // },
  {
    path: '/:id',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/share/:id',
    name: 'Share',
    component: Edit
  },
  {
    path: '/preview',
    name: 'Preview',
    component: Preview
  },
  {
    path: '/embed/:id',
    name: 'Embed',
    component: Embed
  },
  {
    path: '/embed/',
    name: 'QueryEmbed',
    component: Embed
  }
]

const router = createRouter({
  history:
    routerMode === 'hash' ? createWebHashHistory(base) : createWebHistory(base),
  routes
})


let registerRouteFresh = true
router.beforeEach(async (to, from, next) => {
  const store = useStore();
  // console.log('iii',store)
  if(registerRouteFresh) {
    await store.dispatch('common/setMenuData')
	next({...to, replace: true});
    registerRouteFresh = false
  } else {
    next()
  }
});

/**
 * @description 重置路由
 * */
// export const resetRouter = (store) => {
	
//   store.state.common.menuData.forEach(route => {
// 		const { name } = route;
// 		if (name && router.hasRoute(name)) router.removeRoute(name);
// 	});
// };

export default router
