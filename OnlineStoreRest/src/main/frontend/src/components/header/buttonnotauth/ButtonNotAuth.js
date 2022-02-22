import {NavLink, useLocation} from "react-router-dom";

const ButtonNotAuth = () => {

    const location = useLocation();
    const login = location.pathname === '/login';
    const registration = location.pathname === '/registration';
    return (
        <div>
            {!login && !registration ?
                <div className="text-end sign-up">
                    <NavLink to='/login'>
                        <button type="button" className="btn my-btn btn-outline-light me-2">Войти</button>
                    </NavLink>
                    <NavLink to='/registration'>
                        <button type="submit" className="btn btn-warning">Зарегистрироваться
                        </button>
                    </NavLink>
                </div>
                :
                <div></div>
            }
        </div>

    )
}

export default ButtonNotAuth;