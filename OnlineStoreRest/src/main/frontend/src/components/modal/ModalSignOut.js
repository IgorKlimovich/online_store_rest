
import {useContext} from "react";
import {Context} from "../../index";

const ModalSignOut = ({visible,setVisible}) => {
    const {user} = useContext(Context);

    console.log(user.role)
    console.log(user.isAuth)
    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setRole('')
        localStorage.removeItem("token")
    }
    const rootClasses = ['modal'];
    if (visible === true) {
        rootClasses.push('active');
    }
    return(
        <div id="openModalSignOut" className={rootClasses.join(' ')}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" >Выйти</h3>
                        <a  onClick={() => setVisible(false)}
                           title="Close" id="sign-out" className="close">×</a>
                    </div>
                    <div className="modal-body">
                        <div>
                            <div className="mb-head" >
                                Вы действительно хотите выйти?
                            </div>
                            <div className="cont">
                                {/*<form method="post" >*/}
                                    <div className="del-prof-btn">
                                        <button className="modal-btn-yes" type="submit"
                                        onClick={()=>logout()}>Да</button>
                                    </div>
                                {/*</form>*/}

                                <div>
                                    <button type="button" className="modal-btn-no">
                                        <a onClick={() => setVisible(false)} className="ref-close"
                                           >Отмена</a></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalSignOut;