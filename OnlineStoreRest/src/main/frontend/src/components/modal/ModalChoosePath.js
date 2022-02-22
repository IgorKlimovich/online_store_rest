import {NavLink} from "react-router-dom";

const ModalChoosePath = ({visible, setVisible}) => {
    const rootClasses = ['modal'];
    if (visible === true) {
        rootClasses.push('active');
    }
    return(
        <div id="openModalChoosePath" className={rootClasses.join(' ')}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Выбрать действие</h3>
                        <a onClick={()=>setVisible(false)}
                            title="Close" id="closeChoosePath" className="close">×</a>
                    </div>
                    <div className="modal-body">
                        <div>
                            <div className="mb-head" >
                                остаться в товарах или перейти к заказам
                            </div>
                            <div className="cont">
                                <div>
                                    <button type="button" className="modal-btn-yes">
                                        <NavLink to="/products"
                                           className="ref-close">В товары</NavLink></button>
                                </div>
                                <div>
                                    <button type="button" className="modal-btn-no">
                                        <NavLink to="/orders" className="ref-close"
                                        >К заказам</NavLink></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalChoosePath;