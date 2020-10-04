export default function ({ $axios, store, from }) {
    // console.log(from)
    if (process.browser) {
        if (store.state.user.token) {
            $axios.setToken(store.state.user.token, 'Bearer')
        }
    }
}