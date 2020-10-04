import { setCookie, removeCookie } from '@/helpers/auth'

const userInfoDefault = {
    _id: '',
    username: '',
    name: '',
    email: '',
    role: '',
    avatar: ''
}

export const state = () => {
    return {
        userInfo: userInfoDefault,
        token: null
    }
}

export const getters = {
    Auth(state) {
        if (state.userInfo._id !== '') {
            return state.userInfo
        } else {
            return false
        }
    }
}

export const mutations = {
    SET_USER_INFO (state, userInfo) {
        state.userInfo = userInfo
    },
    SET_USER_TOKEN (state, token) {
        state.token = token
    }
}

export const actions = {
    async userSignIn({ commit }, userInfo) {
        try {
            const resp = await this.$axios.$post('/api/user/signin', userInfo)
            if (resp.status === 1) {
                commit('SET_USER_INFO', resp.user)
                commit('SET_USER_TOKEN', resp.token)
                setCookie('token', resp.token)
                return resp
            }
            return {
                status: 0,
                err: 'An Error Occurr'
            }
        } catch (err) {
            const error = err.response.status === 504 ? 'An error Occurr' : err.response.data.error
            return {
                status: 0,
                err: error
            }
        }
    },
    async getUserInfo({ commit }) {
        try {
            const resp = await this.$axios.$get('/api/user')
            if(resp.status === 1) {
                commit('SET_USER_INFO', resp.user)
                commit('SET_USER_TOKEN', resp.token)
                setCookie('token', resp.token)
                return resp
            }
            return {
                status: 0,
                err: 'Error Occurr'
            }
        } catch (err) {
            console.log(err)
            commit('SET_USER_INFO', userInfoDefault)
            commit('SET_USER_TOKEN', null)
        }
    },
    async userSignOut ({ commit, state }) {
        try {
            const resp = await this.$axios.$get('/api/user/signout')
            if (resp.status === 1) {
                commit('SET_USER_INFO', userInfoDefault)
                commit('SET_USER_TOKEN', null)
                removeCookie('token')
                return resp
            }
        } catch (err) {
            return {
                status: 0,
                err: 'Error Occurr'
            }
        }
    },
    async userSignUp ({ commit }, userRegInfo) {
        try {
            const resp = await this.$axios.$post('/api/user/signup', userRegInfo)
            if (resp.status === 1) {
                commit('SET_USER_INFO', resp.user)
                commit('SET_USER_TOKEN', resp.token)
                setCookie('token', resp.token)
                return resp
            }

        } catch (err) {
            return {
                status: 0,
                err: err.response.data.error
            }
        }
    },
    async getUserList({ commit }) {
        try {
            const resp = await this.$axios.$get('/api/user/list')
            if (resp.status === 1) {
                return resp
            }
            return {
                status: 0,
                err: 'Error Occur'
            }
        } catch (err) {
            return {
                status: 0,
                err
            }
        }
    },
    async userEditInfo({ commit }, formData) {
        try {
            this.$axios.setHeader('Content-Type', 'multipart/form-data')
            const resp = await this.$axios.$post('/api/user/edit', formData)
            if (resp.status === 1) {
                return resp
            }
            return {
                status: 0,
                err: 'An error occurr'
            }
        } catch (err) {
            return {
                status: 0,
                err: err.response.data.error
            }
        }
    },
    async getUserInfoById({ commit }, id) {
        try {
            const resp = await this.$axios.$get('/api/user/' + id)
            if (resp.status === 1) {
                return resp
            }
            return {
                status: 0,
                err: 'An error occurr'
            }
        } catch (err) {
            return {
                status: 0,
                err: err.response.data.error
            }
        }
    },
    async userChangeStatus({ commit }, data) {
        try {
            const resp = await this.$axios.$post('/api/user/change-status', data)
            if (resp.status === 1) {
                return resp
            }
            return {
                status: 0,
                err: 'An error occurr'
            }
        } catch (err) {
            return {
                status: 0,
                err: err.response.data.error
            }
        }
    },
    async userChangePassword({ commit }, userObj) {
        try {
            const resp = await this.$axios.$post('/api/user/change-password', userObj)
            console.log(resp)
            if (resp.status === 1) {
                return resp
            }
            return {
                status: 0,
                err: 'An error occurr'
            }
        } catch (err) {
            return {
                status: 0,
                err: err.response.data.error
            }
        }
    }
}
