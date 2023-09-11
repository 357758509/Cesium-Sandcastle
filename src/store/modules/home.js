

const state = {
  // 服务商管理 -> 当前选项卡数据(只给返现配置用)
  CashBackTab: {},
  // 终端管理 -> 下拨 -> 复选框所有选中posSn
  posSnArray: [],
  // 终端管理 -> 批量设置费率 -> 复选框所有选中posSn
  setRatelnBatchPosSn: []
}

const mutations = {
  GET_CashBackTab: (state, payload) => {
	  state.CashBackTab = payload
  },
  GET_POSSNARRAY: (state, payload) => {
	  state.posSnArray = payload
  },
  GET_SETRATELNBATCHPOSSN: (state, payload) => {
	  state.setRatelnBatchPosSn = payload
  },
  // TOGGLE_SIDEBAR: state => {
  //   state.sidebar.opened = !state.sidebar.opened
  //   state.sidebar.withoutAnimation = false
  //   if (state.sidebar.opened) {
  //     Cookies.set('sidebarStatus', 1)
  //   } else {
  //     Cookies.set('sidebarStatus', 0)
  //   }
  // },
  // CLOSE_SIDEBAR: (state, withoutAnimation) => {
  //   Cookies.set('sidebarStatus', 0)
  //   state.sidebar.opened = false
  //   state.sidebar.withoutAnimation = withoutAnimation
  // },
  // TOGGLE_DEVICE: (state, device) => {
  //   state.device = device
  // },
  // SET_SIZE: (state, size) => {
  //   state.size = size
  //   Cookies.set('size', size)
  // }
}

const actions = {
	getCashBackTab({ commit }, payload) {
	  commit('GET_CashBackTab', payload)
   },
   getpossnarray({ commit }, payload) {
	  commit('GET_POSSNARRAY', payload)
   },
   getsetRatelnBatchPosSn({ commit }, payload) {
	  commit('GET_SETRATELNBATCHPOSSN', payload)
   },
  // toggleSideBar({ commit }) {
  //   commit('TOGGLE_SIDEBAR')
  // },
  // closeSideBar({ commit }, { withoutAnimation }) {
  //   commit('CLOSE_SIDEBAR', withoutAnimation)
  // },
  // toggleDevice({ commit }, device) {
  //   commit('TOGGLE_DEVICE', device)
  // },
  // setSize({ commit }, size) {
  //   commit('SET_SIZE', size)
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
