export default function ({ $axios, store }) {
    // if (store.state.user.token) {
    //     $axios.setToken(store.state.user.token, 'Bearer')
    // }
    $axios.onRequest(config => {
        if (store.state.user.token) {
            config.headers.common['Authorization'] = `Bearer ${store.state.user.token}`
        }
        return config
    })
}

