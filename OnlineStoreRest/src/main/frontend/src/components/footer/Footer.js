
import './Footer.css'
import {NavLink} from "react-router-dom";
const Footer=()=>{
    return(
        <div>
            <footer className="my-4">
                <ul className="nav-1 justify-content-center border-bottom pb-3 mb-3 ">
                    <li><NavLink to="/" className="nav-link pxy-2 text-muted">Главная</NavLink></li>
                    <li><NavLink to="/products" className="nav-link pxy-2 text-muted">Товары</NavLink></li>
                    <li><NavLink to="/orders" className="nav-link pxy-2 text-muted">Корзина</NavLink></li>
                    <li><NavLink to="/contacts" className="nav-link pxy-2 text-muted">Контакты</NavLink></li>
                    <li><NavLink to="/about" className="nav-link pxy-2 text-muted">О нас</NavLink></li>
                </ul>
                <p className="text-center text-muted">© 2021 My Shop Company, Inc</p>
            </footer>
        </div>
    )
}

export default Footer;