import {useState} from "react";
import ModalAddCard from "./ModalAddCard";

const ModalNoCards = ({visible, setVisible}) => {
    const [modalAddCard, setModalAddCard] = useState(false);
    const rootClasses = ['modal'];
    if (visible === true) {
        rootClasses.push('active');
    }

    // const addCard =()=>{
    //     setModalAddCard(true);
    //     console.log("eee")
    //     return(<div>
    //             <h1>rr</h1>
    //
    //     </div>
    //
    //     )
    // }

    return (
        <div>
            <div>
                <ModalAddCard visible={modalAddCard} setVisible={setModalAddCard}/>
            </div>
            <div id="openModalErrorPay" className={rootClasses.join(' ')}>

                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Не найдено ни одной карты</h3>
                            <a onClick={() => setVisible(false)}
                               title="Close" id="closeDel" className="close">×</a>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="mb-head">
                                    Хотите добавить карту?
                                </div>
                                {/*<form>*/}
                                <div className="cont1">
                                    <div className="btns">
                                        <button className="modal-btn" type="button"
                                                onClick={() => {
                                                    setVisible(false);
                                                    setModalAddCard(true)
                                                }}
                                        >Да
                                        </button>
                                    </div>
                                    <div>
                                        <button type="button" className="modal-btn-no">
                                            <a onClick={() => setVisible(false)} className="ref-close"
                                            >Нет</a></button>
                                    </div>
                                </div>
                                {/*</form>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalNoCards