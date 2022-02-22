import Footer from "./components/footer/Footer";
import './App.css';
import Header from "./components/header/Header";
import {Route, BrowserRouter, Routes} from "react-router-dom"
import React, {useContext, useEffect, useState} from "react";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import axios from "axios";
import jwtDecode from "jwt-decode";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token');

    console.log(user.isAuth)

    useEffect(() => {
        setTimeout(() => {
                axios.get("http://localhost:8081/auth", {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    console.log(res.data);
                    let user1 = jwtDecode(res.data.token)
                    console.log(user1)
                    user.setUser(user1)
                    user.setIsAuth(true)
                    user.setRole(user1.roles)
                    console.log(user.role)
                    console.log(user)
                }).finally(()=>setLoading(false))
            }, 1000)
    }, [])
    if(loading){
        return(
            <div></div>
        )
    }
    return (
        <BrowserRouter>
            <Header/>

            <AppRouter/>

            <Footer/>
        </BrowserRouter>

    );
})

export default App;
