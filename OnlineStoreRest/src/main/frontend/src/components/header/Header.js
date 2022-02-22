import './Header.css'
import {NavLink, useLocation} from "react-router-dom";
import ButtonNotAuth from "./buttonnotauth/ButtonNotAuth";
import {useContext} from "react";
import {Context} from "../../index";
import ButtonAuth from "./buttonauth/ButtonAuth";
import {observer} from "mobx-react-lite";

const Header = observer(() => {

    const {user} = useContext(Context);

    console.log(user.role)
    console.log(user.isAuth)
    return (<div>
            <header className="color-head nav  p-3" id="hd">
                <div>
                    <div className="mg-tp justify-content-center ">
                        <ul className="nav col-12  justify-content-center ">
                            <li><a href="#" className="nav-link px-2 px mf text-secondary ">My Shop</a></li>
                            <form className="col-12  mb-3 me-lg-3 " action="/search/header">
                                <input type="text" className=" wdi"
                                       name="searchHeader"/>
                                <button type="submit" className="btn my-btn sc search-btn">Найти
                                </button>
                            </form>
                            {user.role==='ROLE_ADMIN'?
                                <li className="mt"><NavLink to="/admin" id="a1"
                                                            className="nav-link fs mg px-2 add dd text-white hc">Админ</NavLink>
                                </li>
                                :<div></div>
                            }
                            <li className="mt"><NavLink to="/" id="a2"
                                                        className="nav-link fs mg px-2 text-white mt hc">Главная</NavLink>
                            </li>
                            <li className="mt"><NavLink to="/products" id="a3"
                                                        className="nav-link fs px-2 text-white hc">Товары</NavLink></li>
                            <li className="mt"><NavLink to="/orders" id="a4"
                                                  className="nav-link fs px-2 text-white hc">Корзина</NavLink></li>
                            <li className="mt"><NavLink to="/contacts" id="a5"
                                                        className="nav-link fs px-2 text-white hc">Контакты</NavLink>
                            </li>
                            <li className="mt"><NavLink to="/about" id="a6"
                                                        className="nav-link fs px-2 text-white hc">О нас</NavLink></li>


                            {!user.isAuth ?
                                <ButtonNotAuth/>
                                :
                                <ButtonAuth/>
                            }


                        </ul>
                    </div>
                </div>
            </header>
        </div>
    )
})
export default Header