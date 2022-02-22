import axios from "axios";
import {Context} from "../../index";
import {useContext} from "react";

const ModalDeleteProfile = ({visibleDelete, setVisibleDelete}) => {
    const {user} = useContext(Context)
    const token = localStorage.getItem('token');
    const rootClasses = ['modal'];
    if (visibleDelete === true) {
        rootClasses.push('active');
    }

    const deleteProfile = () => {
        // const formData =  new FormData();
        // formData.append('file', file)
        axios.post("http://localhost:8081/users/delete", {}, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                // setUser(res.data);
                // setCards(res.data.cardsDto)
                user.setUser({})
                user.setIsAuth(false)
                user.setRole('')
                localStorage.removeItem("token")
                window.location="/"
                console.log(res);
            })
    }
    return(
        <div id="openModalDeleteProfile" className={rootClasses.join(' ')}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" >Удаление профиля</h3>
                        <a href="#" onClick={()=>setVisibleDelete(false)}
                           title="Close" id="closeDel" className="close">×</a>
                    </div>
                    <div className="modal-body">
                        <div>
                            <div className="mb-head" >
                                Вы действительно хотите удалить профиль?
                            </div>
                            <div className="cont">
                                <form  >
                                    <div className="del-prof-btn">
                                        <button className="modal-btn-yes" type="submit"
                                        onClick={deleteProfile}>Да</button>
                                    </div>
                                </form>

                                <div>
                                    <button type="button" className="modal-btn-no">
                                        <a onClick={()=>setVisibleDelete(false)} className="ref-close"
                                           href="#">Отмена</a></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDeleteProfile