import axios from "axios";
import {useState} from "react";
import {useParams} from "react-router-dom";
import ModalErrorPay from "./ModalErrorPay";

const ModalChooseCard = ({visible, setVisible, order, cards}) => {
    const {id} = useParams();
    const token = localStorage.getItem('token');
    console.log(order);
    console.log(cards)
    const [cardNumber, setCardNumber] = useState("");
    const [modal, setModal] = useState(false);
    // const [error, setError] = useState("")
    const [cardError, setCardError] = useState("");
    const rootClasses = ['modal'];
    if (visible === true) {
        rootClasses.push('active');
    }

    const cardHandler = (e) => {
        setCardNumber(e.target.value)

    }

    const pay = () => {
        axios.post("http://localhost:8081/orders/pay", cardNumber, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res.data.message);
            if (res.data.message === 'you nave not this card') {
                console.log("nnnnnnnnnnn")
                setCardError("не найдено такой карты");
            } else if (res.data.message === 'no money') {
                setVisible(false);
                setModal(true);
            } else {
                window.location = '/orders/' + id
            }
        })
    }

    const ChooseCards = () => {
        return cards.map((card => {
            return (
                <option>{card.number}</option>
            )
        }))
    }


    return (
        <div>
            <ModalErrorPay visible={modal} setVisible={setModal}/>
            <div id="openModalChooseCard" className={rootClasses.join(' ')}>
                {/*<ChooseCards/>*/}
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Выберите карту</h3>
                            <a onClick={() => setVisible(false)}
                               title="Close" id="chooseCard" className="close">×</a>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div>
                                    {/*<form>*/}
                                    <div className="form-group8">
                                        <label htmlFor="card"> Введите номер</label>
                                        <input autoComplete="off" list="cards" id="card" type="number"
                                               name="number" className="inp-mod  inp-choose"
                                               onChange={e => cardHandler(e)}/>
                                        <datalist id="cards">
                                            <ChooseCards/>
                                            {/*    <option th:each="cardDto : ${userProf.getCardsDto()}"*/}
                                            {/*            th:text="${cardDto.number}"*/}
                                            {/*            th:value="${cardDto.number}"*/}
                                            {/*    ></option>*/}
                                        </datalist>
                                    </div>

                                    <div style={{display: 'flex'}}>
                                        {cardError && <div className="err-choose">{cardError}</div>}
                                    </div>
                                    <div className="cont">
                                        <div>
                                            <button className="modal-btn-yes" type="submit"
                                                    onClick={pay}>Оплатить
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" className="modal-btn-no">
                                                <a onClick={() => setVisible(false)} className="ref-close"
                                                >Отмена</a></button>
                                        </div>
                                    </div>
                                    {/*</form>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ModalChooseCard