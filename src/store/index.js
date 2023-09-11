import { createStore } from 'vuex'
import { generateUUID, atou } from '@/utils'
import { create, request } from '@/utils/octokit'
import { ElMessage } from 'element-plus'
import templateList from "@/config/templates.js"
import home from './modules/home'
import common from './modules/common'
import getters from './getters'
// 存储github token的本地存储的key
const githubTokenSaveKey = 'codeRun:githubToken'



// export default store
// 生成默认编辑数据
const createDefaultData = () => {
  return {
    config: {
      codeTheme: 'OneDarkPro',
      pageThemeSyncCodeTheme: true,
      openAlmightyConsole: false,
      autoRun: false,
      layout: 'default',
      keepPreviousLogs: true,
      codeFontSize: 16
    },
    title: '未命名',
    code: {
      HTML: {
        language: 'html',
        content: ``
      },
      CSS: {
        language: 'css',
        content: ``,
        resources: []
      },
      JS: {
        language: 'javascript',
        content: ``,
        resources: []
      },
      VUE: {
        language: 'vue2',
        content: ``,
        resources: []
      }
    }
  }
}



const store = createStore({
  state() {
    return {
      uuid: generateUUID(),
      editData: createDefaultData(),
      githubToken: '',
      previewDoc: ''
    }
  },
  mutations: {
    /**
     * javascript comment
     * @Desc: 设置编辑数据
     */
    setEditData(state, data) {
      state.editData = data
    },

    /**
     * javascript comment
     * @Desc: 设置代码内容
     */
    setCodeContent(state, { type, code }) {
      state.editData.code[type].content = code
    },

    /**
     * javascript comment
     * @Desc: 设置代码预处理器
     */
    setCodePreprocessor(state, { type, preprocessor }) {
      state.editData.code[type].language = preprocessor
    },

    /**
     * javascript comment
     * @Desc: 设置资源
     */
    setCodeResource(state, { type, resources }) {
      state.editData.code[type].resources = resources
    },

    /**
     * javascript comment
     * @Desc: 设置import map
     */
    setImportMap(state, importMap) {
      state.editData.code.JS.importMap = importMap
    },

    /**
     * javascript comment
     * @Desc: 设置代码数据
     */
    setCode(state, data) {
      state.editData.code = data
      console.log('传送的数据', data)
    },

    /**
     * @Desc: 设置代码主题
     */
    setCodeTheme(state, theme) {
      state.editData.config.codeTheme = theme
    },

    /**
     * @Desc: 设置自动运行的状态
     */
    setAutoRun(state, autoRun) {
      state.editData.config.autoRun = autoRun
    },

    /**
     * @Desc: 设置全能调试
     */
    setOpenAlmightyConsole(state, openAlmightyConsole) {
      state.editData.config.openAlmightyConsole = openAlmightyConsole
    },

    /**
     * @Desc: 设置布局
     */
    setLayout(state, layout) {
      state.editData.config.layout = layout
    },

    /**
     * javascript comment
     * @Desc: 设置是否保留之前的日志
     */
    setKeepPreviousLogs(state, keepPreviousLogs) {
      state.editData.config.keepPreviousLogs = keepPreviousLogs
    },

    /**
     * javascript comment
     * @Desc: 设置编辑器字号
     */
    setCodeFontSize(state, codeFontSize) {
      state.editData.config.codeFontSize = codeFontSize
    },

    /**
     * javascript comment
     * @Desc: 设置主题同步
     */
    setPageThemeSyncCodeTheme(state, pageThemeSyncCodeTheme) {
      state.editData.config.pageThemeSyncCodeTheme = pageThemeSyncCodeTheme
    },

    /**
     * javascript comment
     * @Desc: 设置github token
     */
    setGithubToken(state, githubToken) {
      state.githubToken = githubToken || ''
      create(githubToken)
    },

    /**
     * @Desc: 设置代码标题
     */
    setCodeTitle(state, title) {
      state.editData.title = title
    },

    /**
     * javascript comment
     * @Desc: 设置当前编译完成进行预览的文档
     */
    setPreviewDoc(state, previewDoc) {
      state.previewDoc = previewDoc
    }
  },
  actions: {
    /**
     * javascript comment
     * @Desc:  获取数据
     */
    getData(ctx, { id, data }) {
      return new Promise(async (resolve, reject) => {
        try {
          let parseData = createDefaultData()
          if (id) {
            let { data } = await request(`GET /gists/${id}`, {
              gist_id: id
            })
            parseData = JSON.parse(data.files['coderun.json'].content)
          } else if (data) {
            parseData = JSON.parse(atou(data))
          }
          ctx.commit('setEditData', parseData)
          resolve()
        } catch (e) {
          console.log(e)
          ElMessage.error('请求失败')
          reject(e)
        }
      })
    },

    /**
     * javascript comment
     * @Desc: 保存github token
     */
    saveGithubToken(ctx, githubToken) {
      ctx.commit('setGithubToken', githubToken)
      if (githubToken) {
        localStorage.setItem(githubTokenSaveKey, githubToken)
      } else {
        localStorage.removeItem(githubTokenSaveKey)
      }
    },

    /**
     * javascript comment
       * @Desc:  从本地存储获取github token
     */
    getGithubToken(ctx) {
      let githubToken = localStorage.getItem(githubTokenSaveKey)
      ctx.commit('setGithubToken', githubToken)
    }
  },
  modules: {
  home,
	common
  },
  getters
})

export default store

