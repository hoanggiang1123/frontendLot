export default function ({ userAuth, redirect }) {
    if (userAuth.isAuth === false) {
        redirect('/')
    }
}