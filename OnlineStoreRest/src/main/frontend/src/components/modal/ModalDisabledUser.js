import axios from "axios";

const ModalDisabledUser = ({visible, setVisible, login})=>{

    const rootClasses = ['modal'];
    if (visible === true) {
        rootClasses.push('active');
    }
    const restore = () => {
        axios.post("http://localhost:8081/users/restore",{login})
            .then(res => {
                console.log(res);
            })
    }

    return(
        <div  id="openModal" className={rootClasses.join(' ')}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" >Ваша страница была удалена</h3>
                        <a href="#" title="Close" onClick={()=>setVisible(false)}
                           className="close">×</a>
                    </div>
                    <div className="modal-body">
                        <div className="mb-head" >
                            Хотите восстановить страницу?
                        </div>
                        <div className="cont">
                            <div>
                                <form>
                                    <button type="submit" className="modal-btn-yes"
                                            onClick={restore}
                                            name="login" >Да
                                    </button>
                                </form>
                            </div>
                            <div>
                                    <button type="button" className="modal-btn-no"
                                    onClick={()=>setVisible(false)}>Отмена</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDisabledUser;