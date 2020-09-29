import cookie from 'js-cookie'

export const setCookie = (name, value) => {
    if (process.browser) {
        cookie.set(name, value, { expires: 1 })
    }
}

export const removeCookie = (name) => {
    if (process.browser) {
        cookie.remove(name)
    }
}

export const getCookie = (name) => {
    if (process.browser) {
        return cookie.get(name)
    }
}
