import './Login.css'
import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import {login} from "../../http/userApi";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import ModalDisabledUser from "../modal/ModalDisabledUser";


const Login = observer(() => {
    const {user} = useContext(Context)
    const [loginDirty, setLoginDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [errorLogin, setErrorLogin] = useState('логин не может быть пустым');
    const [errorPassword, setErrorPassword] = useState('пароль не может быть пустым');
    const [log, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState('');
    const [userBanned, setUserBanned] = useState('');
    const [modal, setModal] = useState(false);
    useEffect(() => {
        if (errorLogin || errorPassword) {
            setFormValid(false)
        } else setFormValid(true)
    }, [errorLogin, errorPassword])
    const loginHandler = (e) => {
        setLogin(e.target.value)
        if (!e.target.value) {
            setErrorLogin('логин не может быть пустым')
        } else {
            setErrorLogin('')
        }
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 1 || e.target.value.length > 12) {
            setErrorPassword('пароль должен быть длиною от 1 до 12 символов')
            if (!e.target.value) {
                setErrorPassword('пароль не может быть пустым')
            }
        } else setErrorPassword('')
    }
    const blurHandler = (e) => {
        switch (e.target.name) {
            case "login":
                setLoginDirty(true)
                break
            case "password":
                setPasswordDirty(true)
                break
        }
    }
    const sign = async (e) => {
        let data;
        e.preventDefault()
        data = await login(log, password)
        // console.log(data)
        if (data === 'Неверные учетные данные пользователя') {
            setInvalidCredentials('invalid login or password')
            setUserBanned('')
        } else if (data === 'Пользователь отключен') {
            setModal(true)
            user.setUser(user)
            // console.log(user.id)
            setInvalidCredentials('')
            setUserBanned('')
        } else if (data === 'Учетная запись пользователя заблокирована') {
            setUserBanned('user is banned')
            setInvalidCredentials('')
        } else {
            // console.log(data)
            user.setUser(user)
            user.setIsAuth(true)

            // console.log(data)
            user.setRole(data.roles)
            // console.log(user.role)
            //
            // console.log(user)
            window.location = "/"
        }


    }
   return (
        <div>
            <ModalDisabledUser visible={modal} setVisible={setModal} login={log}/>
            <main className="form-signin">
                <form method="post" action="/login">
                    <h1 className="h3">Войдите</h1>
                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder='Логин'
                               name="login"
                               onFocus="return myfunc();"
                               onBlur={e => blurHandler(e)}
                            // onBlur="return myfunc1();"
                               value={log}
                               onChange={e => loginHandler(e)}/>
                        <label htmlFor="floatingInput" className="ls" id="log">Логин</label>
                    </div>
                    {loginDirty && errorLogin &&
                        <div className="er-col">{errorLogin}</div>}
                    <div className="form-floating pass">
                        <input type="password" className="form-control "
                               id="floatingPassword" placeholder='Пароль'
                               onFocus="return myfunc2();" name="password"
                            // onBlur="return myfunc3();"
                               onBlur={e => blurHandler(e)}
                               value={password}
                               onChange={e => passwordHandler(e)}/>
                        <label htmlFor="floatingPassword" id="log1">Пароль</label>
                        <div>
                            <a className="password-control "
                               onClick="return show_hide_password(this);"></a>
                        </div>
                        <div>
                        </div>
                    </div>
                    {passwordDirty && errorPassword && <div className="er-col">{errorPassword}</div>}
                    {invalidCredentials && <div className="er-col">{invalidCredentials}</div>}
                    {userBanned && <div className="er-col">{userBanned}</div>}
                    <button className="w-100  btn-lg my-btn-log" type="submit"
                            disabled={!formValid}
                            onClick={sign}>Войти
                    </button>
                </form>
                <NavLink to='/registration'>
                    <button className="w-100  btn-lg btn-reg my-btn-reg mtb" type="submit"
                    >Зарегистрироваться
                    </button>
                </NavLink>
            </main>
        </div>
    )
})

export default Login;