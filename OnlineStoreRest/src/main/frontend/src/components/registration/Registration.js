import './Registration.css';
import {registration} from "../../http/userApi";
import {useContext, useEffect, useState} from "react";

import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import axios from "axios";
import Login from "../login/Login";


const Registration = observer(() => {

    const  [existLogin, setExistLogin] = useState('');
    const  [existEmail, setExistEmail] = useState('');
    const  [existPhoneNumber, setExistPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstNameDirty, setFirstNameDirty] = useState(false);
    const [lastNameDirty, setLastNameDirty] = useState(false);
    const [phoneNumberDirty, setPhoneNumberDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [loginDirty, setLoginDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [errorFirstName, setErrorFirstName] = useState('имя не может быть пустым');
    const [errorLastName, setErrorLastName] = useState('фамилия не может быть пустым');
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('телефон не может быть пустым');
    const [errorEmail, setErrorEmail] = useState('email не может быть пустым');
    const [errorLogin, setErrorLogin] = useState('логин не может быть пустым');
    const [errorPassword, setErrorPassword] = useState('пароль не может быть пустым');
    const [formValid, setFormValid] = useState(false);

    useEffect (()=>{
        if (errorFirstName||errorLastName||errorPhoneNumber||errorEmail||errorLogin||errorPassword){
            setFormValid(false)
        }
        else setFormValid(true)
    },[errorFirstName,errorLastName,errorPhoneNumber,errorEmail,errorLogin,errorPassword])

    const firstNameHandler = (e) => {
        setFirstName(e.target.value)
        if(!e.target.value){
            setErrorFirstName('имя не может быть пустым')
        }
        else {
            setErrorFirstName('')
        }
    }

    const lastNameHandler = (e) => {
        setLastName(e.target.value)
        if(!e.target.value){
            setErrorLastName('имя не может быть пустым')
        }
        else {
            setErrorLastName('')
        }
    }

    const phoneNumberHandler = (e) => {
        setPhoneNumber(e.target.value)
        if(!e.target.value){
            setErrorPhoneNumber('номер телефона не может быть пустым')
        }
        else {
            setErrorPhoneNumber('')
        }
    }

    const loginHandler = (e) => {
        setLogin(e.target.value)
        if(!e.target.value){
            setErrorLogin('логин не может быть пустым')
        }
        else {
            setErrorLogin('')
        }
    }

    const emailHundler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!re.test(String(e.target.value).toLowerCase())) {
            setErrorEmail('некорректный email')
            if(!e.target.value){
                setErrorEmail('email не может быть пустым')
            }
        }
        else setErrorEmail('')
    }
    const passwordHandler = (e)=>{
        setPassword(e.target.value)
        if (e.target.value.length<3||e.target.value.length>12){
            setErrorPassword('пароль должен быть длиною от 3 до 12 символов')
            if(!e.target.value){
                setErrorPassword('пароль не может быть пустым')
            }
        }
        else setErrorPassword('')
    }

    const blurHundler = (e) => {
        switch (e.target.name) {
            case "firstName":
                setFirstNameDirty(true)
                break
            case "lastName":
                setLastNameDirty(true)
                break
            case "phoneNumber":
                setPhoneNumberDirty(true)
                break
            case "email":
                setEmailDirty(true)
                break
            case "login":
                setLoginDirty(true)
                break
            case "password":
                setPasswordDirty(true)
                break
        }
    }

    const regist = async (e) => {
        e.preventDefault()
        const user= {
            "firstName": firstName,
            "lastName": lastName,
            "email" : email,
            "phoneNumber" : phoneNumber,
            "login" : login,
            "password" : password
         }
        axios.post("http://localhost:8081/registration", user).then(res => {
            if(res.data.message==='login is already exist'){
                setExistLogin('login is already exist')
                setExistEmail('')
                setExistPhoneNumber('')
            }
            if(res.data.message==='phone number is already exist'){
                setExistPhoneNumber('phone number is already exist')
                setExistLogin('')
                setExistEmail('')
            }
            if(res.data.message==='email is already exist'){
                setExistPhoneNumber('')
                setExistLogin('')
                setExistEmail('email is already exist')
            }
            else {
                window.location = "/login"
            }
        })
    }

    return (
        <div>
            <div className="container5">
                <main>
                    <h4 className="h3 mb-3 fw-normal">Зарегистрируйтесь</h4>
                    <form method="post">
                        <div className="row">
                            <div className="col-sm-6">
                                <label htmlFor="firstName" id="labelName" className="form-label">Имя</label>
                                <input type="text" className="form-control" placeholder="Имя"
                                       onFocus="return signNameFocus();" name="firstName"
                                    // onBlur="return signNameBlur();"
                                       onBlur={e => blurHundler(e)}
                                       value={firstName}
                                       onChange={e => firstNameHandler(e)}/>
                                {(firstNameDirty && errorFirstName) && <div className="er-col">{errorFirstName}</div>}
                                {/*<div className="er-col" th:if="${#fields.hasErrors('firstName')}"*/}
                                {/*     th:errors="*{firstName}">*/}
                                {/*</div>*/}
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="lastName" id="labelLastName" className="form-label">Фамилия</label>
                                <input type="text" className="form-control" placeholder="Фамилия" name="lastName"
                                       onFocus="return signLastNameFocus();"
                                    // onBlur="return signLastNameBlur();"
                                       onBlur={e => blurHundler(e)}
                                       value={lastName}
                                       onChange={e => lastNameHandler(e)}/>
                                {lastNameDirty && errorLastName &&
                                    <div className="er-col">{errorLastName}</div>}
                                {/*<div className="er-col" th:if="${#fields.hasErrors('lastName')}"*/}
                                {/*     th:errors="*{lastName}">*/}
                                {/*</div>*/}
                            </div>
                            <div className="col-13">
                                <label htmlFor="email" id="labelEmail" className="form-label">Email</label>
                                <input type="text" className="form-control" placeholder="Email" name="email"
                                       onFocus="return signEmailFocus();"
                                    // onBlur="return signEmailBlur();"
                                       onBlur={e => blurHundler(e)}
                                       value={email}
                                       onChange={e => emailHundler(e)}/>
                                {emailDirty && errorEmail &&
                                    <div className="er-col">{errorEmail}</div>}
                                {existEmail&&<div className="er-col">{existEmail}</div>}
                                {/*<div className="er-col" th:if="${#fields.hasErrors('email')}"*/}
                                {/*     th:errors="*{email}"></div>*/}
                                {/*<div className="er-col" th:if="${existEmail}"*/}
                                {/*     th:text="#{thisEmailAlreadyExists}"></div>*/}
                            </div>
                            <div className="col-13">
                                <label htmlFor="phoneNumber" id="labelPhoneNumber" className="form-label">
                                    Номер телефона</label>
                                <input type="text" className="form-control"
                                       placeholder="Номер телефона" onFocus="return signPhoneNumberFocus();"
                                    // onBlur="return signPhoneNumberBlur();"
                                       onBlur={e => blurHundler(e)}
                                       name="phoneNumber"
                                       value={phoneNumber}
                                       onChange={e => phoneNumberHandler(e)}/>
                                {phoneNumberDirty && errorPhoneNumber &&
                                    <div className="er-col">{errorPhoneNumber}</div>}
                                {existPhoneNumber&&<div className="er-col">{existPhoneNumber}</div>}
                                {/*<div className="er-col" th:if="${#fields.hasErrors('phoneNumber')}"*/}
                                {/*     th:errors="*{phoneNumber}"></div>*/}
                                {/*<div className="er-col" th:if="${existPhoneNumber}"*/}
                                {/*     th:text="#{thisPhoneNumberAlreadyExists}"></div>*/}
                            </div>
                            <div className="col-13">
                                <label htmlFor="login" id="labelLogin" className="form-label"> Логин</label>
                                <input type="text" className="form-control"
                                       placeholder="Логин" onFocus="return signLoginFocus();"
                                    // onBlur="return signLoginBlur();"
                                       onBlur={e => blurHundler(e)}
                                       name="login"
                                       value={login}
                                       onChange={e => loginHandler(e)}/>
                                {loginDirty && errorLogin &&
                                    <div className="er-col">{errorLogin}</div>}
                                {existLogin&&<div className="er-col">{existLogin}</div>}
                                {/*<div className="er-col" th:if="${#fields.hasErrors('login')}"*/}
                                {/*     th:errors="*{login}"></div>*/}
                                {/*<div className="er-col" th:if="${existLogin}"*/}
                                {/*     th:text="#{thisLoginAlreadyExists}"></div>*/}
                            </div>
                            <div className="col-13 pass">
                                <label htmlFor="password" id="labelPassword" className="form-label"
                                >Пароль</label>
                                <input type="text" className="form-control"
                                       placeholder="Пароль" onFocus="return signPasswordFocus();"
                                    // onBlur="return signPasswordBlur();"
                                       onBlur={e => blurHundler(e)}
                                       name="password"
                                       value={password}
                                       onChange={e => passwordHandler(e)}/>
                                <a href="#" className="password-control"
                                   onClick="return show_hide_password(this);"></a>
                                {passwordDirty && errorPassword &&
                                    <div className="er-col">{errorPassword}</div>}
                                {/*<div className="er-col "*/}
                                {/*     th:if="${#fields.hasErrors('password')}" th:errors="*{password}">*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <button
                             className="bts w-100 btns my-btn-log"
                                type="submit"
                                disabled={!formValid}
                                onClick={regist}>
                            Зарегистрироваться
                        </button>
                    </form>
                    <form action="/login">
                        <button className="col-log w-100  btns btn-reg"
                                type="submit">Войти
                        </button>
                    </form>
                    {/*<div>*/}
                    {/* <a href="/" >В магазин</a>*/}
                    {/*</div>*/}
                </main>
            </div>
        </div>
    )
});
export default Registration;