import {useEffect, useState} from "react";
import axios from "axios";

const ModalUpdateProfile = ({visible, setVisible, user}) => {
    const token = localStorage.getItem('token')
    const [existLogin, setExistLogin] = useState('');
    const [existEmail, setExistEmail] = useState('');
    const [existPhoneNumber, setExistPhoneNumber] = useState('');
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
    console.log(user)
    const rootClasses = ['modal'];
    if (visible === true) {
        rootClasses.push('active');
    }

    useEffect(() => {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        setLogin(user.login)
        // setPassword(user.password)
    }, [user.firstName, user.lastName, user.email, user.phoneNumber, user.login])

    useEffect(() => {
        if (errorFirstName || errorLastName || errorPhoneNumber || errorEmail || errorLogin || errorPassword) {
            setFormValid(false)
        } else setFormValid(true)
    }, [errorFirstName, errorLastName, errorPhoneNumber, errorEmail, errorLogin, errorPassword])

    const firstNameHandler = (e) => {
        setFirstName(e.target.value)
        if (!e.target.value) {
            setErrorFirstName('имя не может быть пустым')
        } else {
            setErrorFirstName('')
        }
    }

    const lastNameHandler = (e) => {
        setLastName(e.target.value)
        if (!e.target.value) {
            setErrorLastName('фамилия не может быть пустой')
        } else {
            setErrorLastName('')
        }
    }

    const phoneNumberHandler = (e) => {
        setPhoneNumber(e.target.value)
        const reg = /[^a-zA-Z]{7,15}/
        if (!reg.test(String(e.target.value).toLowerCase())) {
            setErrorPhoneNumber('номер должен содержать от 7 до 16 символов и не содержать буквы')
            if (!e.target.value) {
                setErrorPhoneNumber('email не может быть пустым')
            }
        }
        else setErrorPhoneNumber('')
    }

    const loginHandler = (e) => {
        setLogin(e.target.value)
        if (!e.target.value) {
            setErrorLogin('логин не может быть пустым')
        } else {
            setErrorLogin('')
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!re.test(String(e.target.value).toLowerCase())) {
            setErrorEmail('некорректный email')
            if (!e.target.value) {
                setErrorEmail('email не может быть пустым')
            }
        } else setErrorEmail('')
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 12) {
            setErrorPassword('пароль должен быть длиною от 3 до 12 символов')
            if (!e.target.value) {
                setErrorPassword('пароль не может быть пустым')
            }
        } else setErrorPassword('')
    }

    const blurHandler = (e) => {
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

    const updateUser = (e) => {
        // e.preventDefault()
        const userForUpdate = {
            "id": user.id,
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phoneNumber": phoneNumber,
            "login": login,
            "password": password
        }
        axios.put("http://localhost:8081/users", userForUpdate, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res)
            if (res.data.message === 'login is already exist') {
                setExistLogin('login is already exist')
                setExistEmail('')
                setExistPhoneNumber('')
            } else if (res.data.message === 'phone number is already exist') {
                setExistPhoneNumber('phone number is already exist')
                setExistLogin('')
                setExistEmail('')
            } else if (res.data.message === 'email is already exist') {
                setExistPhoneNumber('')
                setExistLogin('')
                setExistEmail('email is already exist')
            } else {
                localStorage.removeItem('token')
                window.location = "/login"
            }
        })
    }


    return (

        <div id="openModalUpdateProfile" className={rootClasses.join(' ')}>
            <div className="modal-dialog modal-dialog-update-profile">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Изменить Профиль</h3>
                        <a onClick={() => setVisible(false)}
                           title="Close" id="close" className="close">×</a>
                    </div>
                    <div className="modal-body">
                        <div>
                            {/*<form>*/}
                            <div className="dis">
                                <label htmlFor="name">Введите новое имя </label>
                                <input type="text" id="name" name="firstName" className="inp-mod"
                                       onBlur={e => blurHandler(e)}
                                       defaultValue={user.firstName}
                                       value={firstName}
                                       onChange={e => firstNameHandler(e)}/>
                            </div>
                            {(firstNameDirty && errorFirstName) && <div className="er-col">{errorFirstName}</div>}
                            <div className="dis">
                                <label htmlFor="lastName">Введите новую
                                    фамилию</label>
                                <input type="text" id="lastName" name="lastName" className="inp-mod"
                                       onBlur={e => blurHandler(e)}
                                       value={lastName}
                                       onChange={e => lastNameHandler(e)}/>
                            </div>
                            {lastNameDirty && errorLastName &&
                                <div className="er-col">{errorLastName}</div>}
                            {/*<div className="mb" th:if="${#fields.hasErrors('lastName')}"*/}
                            {/*     th:errors="*{lastName}"></div>*/}
                            <div className="dis">
                                <label htmlFor="email">Введите новый email</label>
                                <input type="email" id="email" name="email" className="inp-mod"
                                       onBlur={e => blurHandler(e)}
                                       value={email}
                                       onChange={e => emailHandler(e)}/>
                            </div>
                            {emailDirty && errorEmail &&
                                <div className="er-col">{errorEmail}</div>}
                            {existEmail && <div className="er-col">{existEmail}</div>}
                            {/*<div className="mb" th:if="${#fields.hasErrors('email')}"*/}
                            {/*     th:errors="*{email}"></div>*/}
                            {/*<div className="mb" th:if="${#fields.hasGlobalErrors()}">*/}
                            {/*    <div th:each="err : ${#fields.errors('global')}">*/}
                            {/*        <div th:if="${err.equals('existEmail')}" th:text="#{thisEmailAlreadyExists}"*/}
                            {/*        ></div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="dis">
                                <label htmlFor="phoneNumber">
                                    Введите новый номер телефона</label>
                                <input type="text" id="phoneNumber"
                                       className="inp-mod"
                                       onBlur={e => blurHandler(e)}
                                       name="phoneNumber"
                                       value={phoneNumber}
                                       onChange={e => phoneNumberHandler(e)}/>
                            </div>
                            {phoneNumberDirty && errorPhoneNumber &&
                                <div className="er-col">{errorPhoneNumber}</div>}
                            {existPhoneNumber && <div className="er-col">{existPhoneNumber}</div>}
                            {/*<div className="mb" th:if="${#fields.hasErrors('phoneNumber')}"*/}
                            {/*     th:errors="*{phoneNumber}"></div>*/}
                            {/*<div className="mb" th:if="${#fields.hasGlobalErrors()}">*/}
                            {/*    <div th:each="err : ${#fields.errors('global')}">*/}
                            {/*        <div th:if="${err.equals('existPhoneNumber')}"*/}
                            {/*             th:text="#{thisPhoneNumberAlreadyExists}">*/}
                            {/*            >*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            <div className="dis">
                                <label htmlFor="login"> Введите новый логин</label>
                                <input type="text" id="login"
                                       className="inp-mod"
                                       onBlur={e => blurHandler(e)}
                                       name="login"
                                       value={login}
                                       onChange={e => loginHandler(e)}/>
                            </div>
                            {loginDirty && errorLogin &&
                                <div className="er-col">{errorLogin}</div>}
                            {existLogin && <div className="er-col">{existLogin}</div>}
                            {/*<div className="mb" th:if="${#fields.hasErrors('login')}"*/}
                            {/*     th:errors="*{login}"></div>*/}

                            {/*<div className="mb" th:if="${#fields.hasGlobalErrors()}">*/}
                            {/*    <div th:each="err : ${#fields.errors('global')}">*/}
                            {/*        <div th:if="${err.equals('existLogin')}"*/}
                            {/*             th:text="#{thisLoginAlreadyExists}">*/}

                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            <div className="dis pass">
                                <label htmlFor="password"> Введите новый
                                    пароль</label>
                                <input type="password" id="password"
                                       className="inp-mod ml-password"
                                       onBlur={e => blurHandler(e)}
                                       name="password"
                                       value={password}
                                       onChange={e => passwordHandler(e)}/>
                                <a href="#" className="password-control"
                                   onClick="return show_hide_password(this);"></a>
                            </div>
                            {passwordDirty && errorPassword &&
                                <div className="er-col">{errorPassword}</div>}
                            {/*<div className="mb" th:if="${#fields.hasErrors('password')}"*/}
                            {/*     th:errors="*{password}"></div>*/}
                            <div className="cont">
                                <div className="ml-btn">
                                    <button className="modal-btn-yes" type="button"
                                            disabled={!formValid} onClick={updateUser}
                                    >Сохранить
                                    </button>
                                </div>
                                <div>
                                    <button type="button" className="modal-btn-no">
                                        <a className="ref-close" onClick={() => setVisible(false)}
                                        >Отмена</a></button>
                                </div>
                            </div>
                            {/*</form>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalUpdateProfile;
