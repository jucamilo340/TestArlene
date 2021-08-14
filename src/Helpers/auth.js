export const TOKEN = "token";
export const USER = "user";

const Auth ={
    signOut() {
        localStorage.removeItem(TOKEN)
        localStorage.removeItem(USER)
    },
    //token
    setToken(token) {
         localStorage.setItem(TOKEN, JSON.stringify(token));
    },
    getToken() {
        return localStorage.getItem(TOKEN);
    },

    //user
    setUser(user) {
         localStorage.setItem(USER, JSON.stringify(user));
    },
    getUser() {
        return JSON.parse(localStorage.getItem(USER));
    }

}

export default Auth;