import axios from "axios";
import {useEffect, useState} from "react";

const ModalUpdateCard = ({visibleUpdate, setVisibleUpdate, cardForUpdate}) => {

    const token = localStorage.getItem('token');
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [cvv, setCvv] = useState("")
    const [nameDirty, setNameDirty] = useState(false);
    const [numberDirty, setNumberDirty] = useState(false);
    const [cvvDirty, setCvvDirty] = useState(false);
    const [errorName, setErrorName] = useState("")
    const [errorNumber, setErrorNumber] = useState("")
    const [errorCvv, setErrorCvv] = useState("")
    const [formValid, setFormValid] = useState(false);
    const [cardExist, setCardExist] = useState('');

    useEffect(() => {
        setName(cardForUpdate.name)
        setNumber(cardForUpdate.number)
        setCvv(cardForUpdate.cvv)
    }, [cardForUpdate.name, cardForUpdate.number, cardForUpdate.cvv])

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

    useEffect(() => {
        if (errorName || errorNumber || errorCvv) {
            setFormValid(false)
        } else setFormValid(true)
    }, [errorName, errorNumber, errorCvv])


    console.log(name)
    const rootClasses = ['modal'];
    if (visibleUpdate === true) {
        rootClasses.push('active');
    }
    const nameHandler = (e) => {
        setName(e.target.value)
        if (!e.target.value) {
            setErrorName('название не может быть пустым')
        } else {
            setErrorName('')
        }
    }
    const numberHandler = (e) => {
        setNumber(e.target.value)
        if (e.target.value.length < 16 || e.target.value.length > 16) {
            setErrorNumber('номер должен быть длиною 16 символов')
            if (!e.target.value) {
                setErrorNumber('номер не может быть пустым')
            }
        } else setErrorNumber('')
    }

    const cvvHandler = (e) => {
        setCvv(e.target.value)
        if (e.target.value.length < 3 || e.target.length > 3) {
            setErrorCvv("cvv должно быть длиною 3 цифры")
            if (!e.target.value) {
                setErrorCvv('cvv не может быть пустым')
            }
        } else {
            setErrorCvv('')
        }
    }

    const updateCard = () => {
        const card = {
            "id": cardForUpdate.id,
            "name": name,
            "number": number,
            "cvv": cvv
        }
        console.log(name);
        axios.put("http://localhost:8081/cards", card, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res)
            if (res.data.message === 'you already have this card') {
                setCardExist('you already have this card')
            } else {
                window.location = "/profile"
            }
        })
    }

    return (
        <div id="openModalUpdateCard" className={rootClasses.join(' ')}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Изменить карту</h3>
                        <a onClick={() => setVisibleUpdate(false)}
                           title="Close" id="closeUpdate" className="close">×</a>
                    </div>
                    <div className="modal-body">
                        <div className="dis">
                            <label htmlFor="cardNameUpdate">Введите новое
                                название</label>
                            <input type="text" id="cardNameUpdate" name="name"
                                   onBlur={e => blurHandler(e)}
                                   value={name}
                                   onChange={e => nameHandler(e)}
                                   className="inp-mod"/>
                        </div>
                        {(nameDirty && errorName) && <div className="er-col">{errorName}</div>}
                        <div className="dis">
                            <label htmlFor="numberUpdate">Введите новый номер</label>
                            <input type="number" id="numberUpdate" name="number" className="inp-mod"
                                   onBlur={e => blurHandler(e)}
                                   value={number}
                                   onChange={e => numberHandler(e)}/>
                        </div>
                        {(numberDirty && errorNumber) && <div className="er-col">{errorNumber}</div>}
                        <div className="dis">
                            <label htmlFor="CVVUpdate">Введите новый CVV</label>
                            <input type="number" id="CVVUpdate" name="cvv"
                                   onBlur={e => blurHandler(e)}
                                   value={cvv}
                                   onChange={e => cvvHandler(e)}
                                   className="inp-mod"/>
                        </div>
                        {(cvvDirty && errorCvv) && <div className="er-col">{errorCvv}</div>}
                        {cardExist&& <div className="er-col">{cardExist}</div>}
                        <div className="cont">
                            <div>
                                <button className="modal-btn-yes" type="submit"
                                        disabled={!formValid} onClick={updateCard}>Сохранить
                                </button>
                            </div>
                            <div>
                                <button type="button" className="modal-btn-no">
                                    <a onClick={() => setVisibleUpdate(false)} className="ref-close"
                                    >Отмена</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalUpdateCard