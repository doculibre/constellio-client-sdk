export default function authHeader() {
    const user:any = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user') || "") : {isLoggedIn:false};

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}