import React, {useContext} from "react";
import { Route,Redirect, Switch, Routes} from 'react-router-dom'
import {createBrowserHistory} from "history";
import {authRoutes, publicRoutes} from "../route";
import ProductPage from "./product/ProductPage";
import Search from "./search/Search";
import {Context} from "../index";
import Header from "./header/Header";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const customHistory=createBrowserHistory();
    const {user} = useContext(Context)
    console.log(user)
    console.log(user.isAuth)
    return(
        <Routes>
            {user.isAuth===true&&authRoutes.map(({path,Component})=>
            <Route  key={path} path={path} element={<Component/>} exact />
            )}
            {publicRoutes.map(({path,Component})=>
                <Route history={customHistory} key={path} path={path} element={<Component/>} exact />
            )}
        </Routes>
    )
})
export default AppRouter
