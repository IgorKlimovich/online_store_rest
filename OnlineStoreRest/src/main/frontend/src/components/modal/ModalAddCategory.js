import React, {useState} from "react";
import axios from "axios";

const ModalAddCategory = ({visible, setVisible}) => {
    const [name, setName] = useState('');
    const rootClasses = ['modal'];
    if (visible === true) {
        rootClasses.push('active');
    }
    const submitToServer = (s) => {
        s.preventDefault();
        const category = {
            'name': name,
        }
        console.log(name);
        axios.post("http://localhost:8081/productCategories", category).then(res => {
            console.log(res);
            setVisible(false);
        })

    }
    return(
        <div id="openModalCategory" className={rootClasses.join(' ')}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" >Добавить категорию</h3>
                        <a onClick={() => setVisible(false)}
                           title="Close" id="close" className="close">×</a>
                    </div>
                    <div className="modal-body">
                        <div>
                            <form method="post" action="/admin/saveCategory">
                                <div className="dis">
                                    <label htmlFor="cardName" >Введите название
                                        категории</label>
                                    <input type="text" id="cardName" name="addCategory"
                                           value={name}
                                           onChange={e=>setName(e.target.value)}
                                           className="inp-mod"/>
                                </div>
                                {/*<div th:if="${moreNumber}" className="mb"*/}
                                {/*     th:text="#{theNumberOfCharactersCanNotBeMore}">*/}
                                {/*</div>*/}
                                {/*<div th:if="${emptyCategoryName}" className="mb"*/}
                                {/*     th:text="#{categoryNameCanNotBeEmpty}">*/}
                                {/*</div>*/}
                                {/*<div th:if="${existCategory}" className="mb"*/}
                                {/*     th:text="#{categoryAlreadyExist}">*/}
                                {/*</div>*/}
                                <div className="cont">
                                    <div>
                                        <button className="modal-btn-yes" type="submit"
                                        onClick={submitToServer}>Сохранить
                                        </button>
                                    </div>
                                    <div>
                                        <button type="button" className="modal-btn-no">
                                            <a onClick={() => setVisible(false)} className="ref-close"
                                            >Отмена</a></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAddCategory;