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
            return {
                status: 0,
                err: err.response.data.error
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
            const token = state.token
            this.$axios.setToken(token, 'Bearer')
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
    }
}
