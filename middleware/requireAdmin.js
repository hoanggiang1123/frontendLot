export default function({ userAuth, redirect }) {
    if (userAuth.isAdmin !== true) {
        return redirect('/')
    }
}