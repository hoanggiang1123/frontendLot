export default function (ctx) {
    const { store } = ctx;
    const role = store.state.user.userInfo.role
    let userAuth = {}
    switch (role) {
        case 1:
            userAuth = { isAuth: true, isAdmin: true, isMember: false }
            break
        case 0:
            userAuth = { isAuth: true, isAdmin: false, isMember: true }
            break
        case '':
            userAuth = { isAuth: false, isAdmin: false, isMember: false }
    }
    ctx.userAuth = userAuth
}