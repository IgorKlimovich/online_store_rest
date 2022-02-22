import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useParams} from "react-router-dom";

const ModalAddCard = ({visible, setVisible}) => {
    const {id} = useParams();
    const token = localStorage.getItem('token');
    const rootClasses = ['modal'];
    const [name, setName] =useState("")
    const [number, setNumber] = useState("")
    const [cvv, setCvv] = useState("")
    const [nameDirty, setNameDirty] = useState(false);
    const [numberDirty, setNumberDirty] = useState(false);
    const [cvvDirty, setCvvDirty] = useState(false);
    const [errorName, setErrorName]= useState("название не может быть пустым")
    const [errorNumber, setErrorNumber]= useState("")
    const [errorCvv, setErrorCvv]= useState("")
    const [formValid, setFormValid] = useState(false);
    const [cardExist, setCardExist] = useState('');
    const location = useLocation()
    const profile = location.pathname === '/profile';
    useEffect (()=>{
        if (errorName||errorNumber||errorCvv){
            setFormValid(false)
        }
        else setFormValid(true)
    },[errorName,errorNumber,errorCvv])

    if (visible === true) {
        rootClasses.push('active');
    }
    const nameHandler = (e) => {
        setName(e.target.value)
        if(!e.target.value){
            setErrorName('название не может быть пустым')
        }
        else {
            setErrorName('')
        }
    }

    const numberHandler = (e)=>{
        setNumber(e.target.value)
            if (e.target.value.length<16||e.target.value.length>16){
                setErrorNumber('номер должен быть длиною 16 символов')
                if(!e.target.value){
                    setErrorNumber('номер не может быть пустым')
                }
            }
            else setErrorNumber('')
    }

    const cvvHandler = (e) => {
        setCvv(e.target.value)
        if(e.target.value.length<3||e.target.length>3) {
            setErrorCvv("cvv должно быть длиною 3 цифры")
            if (!e.target.value) {
                setErrorCvv('cvv не может быть пустым')
            }
        }
        else {
            setErrorCvv('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "name":
                setNameDirty(true)
                break
            case "number":
                setNumberDirty(true)
                break
            case "cvv":
                setCvvDirty(true)
                break
        }
    }

    const addCard = ()=>{
        const card= {
            "name": name,
            "number": number,
            "cvv" : cvv
        }
        console.log(name);
        axios.post("http://localhost:8081/cards", card,{
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.data.message==='card is already exist'){
                setCardExist('card is already exist')
            }
            else if(profile) {
                window.location='/profile'
            }
            else {
                window.location='/orders/'+id
            }
        })

    }
    return(
        <div id="openModalAddCard" className={rootClasses.join(' ')}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" >Добавить карту</h3>
                        <a onClick={() => setVisible(false)}
                           title="Close" id="closeAdd" className="close">×</a>
                    </div>
                    <div className="modal-body">
                        {/*<form >*/}
                            <div className="dis">
                                <label htmlFor="cardName" >Введите название</label>
                                <input type="text" id="cardName" name="name" className="inp-mod"
                                       onBlur={e => blurHandler(e)}
                                       value={name}
                                       onChange={e => nameHandler(e)}/>
                            </div>
                            {(nameDirty && errorName) && <div className="er-col">{errorName}</div>}
                            {/*<div className="mb" th:if="${#fields.hasErrors('name')}"*/}
                            {/*     th:errors="*{name}"></div>*/}
                            <div className="dis">
                                <label htmlFor="number" >Введите номер</label>
                                <input type="number" id="number" name="number" className="inp-mod"
                                       onBlur={e => blurHandler(e)}
                                       value={number}
                                       onChange={e => numberHandler(e)} />
                            </div>
                            {(numberDirty && errorNumber) && <div className="er-col">{errorNumber}</div>}
                            {/*<div className="mb" th:if="${#fields.hasErrors('number')}"*/}
                            {/*     th:errors="*{number}"></div>*/}
                            <div className="dis">
                                <label htmlFor="CVV" >Введите CVV</label>
                                <input type="number" id="CVV" name="cvv" className="inp-mod"
                                       onBlur={e => blurHandler(e)}
                                       value={cvv}
                                       onChange={e => cvvHandler(e)}/>
                            </div>
                            {(cvvDirty && errorCvv) && <div className="er-col">{errorCvv}</div>}
                            {cardExist&&<div className="er-col">{cardExist}</div>}
                            {/*<div className="mb" th:if="${#fields.hasErrors('cvv')}"*/}
                            {/*     th:errors="*{cvv}"></div>*/}
                            {/*<div className="mb" th:if="${#fields.hasGlobalErrors()}">*/}
                            {/*    <div th:each="err : ${#fields.errors('global')}">*/}
                            {/*        <div th:if="${err.equals('existCard')}"*/}
                            {/*             th:text="#{youAlreadyHaveSuchACard}">*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}


                            <div className="cont">
                                <div>
                                    <button className="modal-btn-yes" type="submit"
                                    disabled={!formValid} onClick={addCard}>Сохранить</button>
                                </div>
                                <div>
                                    <button type="button" className="modal-btn-no">
                                        <a onClick={() => setVisible(false)} className="ref-close">Отмена</a></button>
                                </div>
                            </div>
                        {/*</form>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAddCard;