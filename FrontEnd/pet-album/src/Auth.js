export function isAuthenticated(){
    return !!localStorage.getItem("token")
}

export function getToken(){
    return localStorage.getItem("token")
}

export function getCurrentUser(){
    const user = localStorage.getItem("user")
    if (user){
        return JSON.parse(user)
    }
    return null 
}

export function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
}
