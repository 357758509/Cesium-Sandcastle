import { Octokit } from '@octokit/core'

let octokit = null

/**
 * javascript comment
 * @Desc: 创建实例
 */
export const create = token => {
  octokit = token
    ? new Octokit({
        auth: token
      })
    : new Octokit()
}

/**
 * javascript comment
 * @Desc: 发送请求
 */
export const request = (...args) => {
  if (!octokit) {
    return
  }
  return octokit.request(...args)
}
