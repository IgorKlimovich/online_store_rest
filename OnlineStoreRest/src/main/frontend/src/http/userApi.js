import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (firstName,lastName,email,phoneNumber,login,password) => {
    const {data} = await $host.post('/registration', {firstName, lastName, email, phoneNumber, login, password})
    return jwtDecode(data.token);
}
export const login = async (login,password) => {
    const {data} = await $host.post('/login',{login,password})
    localStorage.setItem('token', data.token)
    localStorage.setItem('role',data.roles)
    if (data.message==='Неверные учетные данные пользователя'){
        return data.message
    }
    if (data.message==='Пользователь отключен'){
        return data.message
    }
    if(data.message==='Учетная запись пользователя заблокирована'){
        return data.message
    }
    return jwtDecode(data.token);
}

export const check = async () => {
    const {data} = await $authHost.get('/auth',{})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
}