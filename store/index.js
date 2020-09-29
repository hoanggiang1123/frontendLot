import cookie from 'cookie'
export const state = () => {

}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { redirect, req, res }) {
    const cookieStr = req.headers.cookie
    if (cookieStr) {
      const cookieObj = cookie.parse(cookieStr)
      if (cookieObj && cookieObj.token) {
        const { token } = cookieObj
        this.$axios.setToken(token, 'Bearer')
        await dispatch('user/getUserInfo')
      }
    }
  }
}
