import admin from './Admin.module.css'
import {NavLink} from "react-router-dom";

const Admin = () => {

    return (

        <div className={admin.container}>
            <div className={admin.us}>
                <div className={admin.findUser}>
                    <form method="get" className={admin.formUs} action="/admin/search">
                        <h2 className={admin.titUs}> Найти пользователя</h2>
                        <label className={admin.labelUs} htmlFor="parameter">Выберите
                            параметр</label>
                        <select className={admin.selectUs} name="parameter" id="parameter"> Найти пользователя по:
                            <option value="all">Показать всех</option>
                            <option value="login">Логин</option>
                            <option value="email">email</option>
                            <option value="phoneNumber">Номер телефона</option>
                        </select>
                        <input className={admin.inputUs} type="text" name="name"/>
                        <div className={admin.end}>
                            <div className={admin.btnMr}>
                                <button className={admin.findBtn} type="submit"><NavLink to="/admin/users">
                                    Найти
                                </NavLink></button>
                            </div>
                            <div>
                                <h3 className={admin.errorUs}></h3>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={admin.findOrder}>
                    <form method="get" className={admin.formUs} action="/admin/searchOrders">
                        <h2 className={admin.titUs}> Найти заказы</h2>
                        <label className={admin.labelUs} htmlFor="parameter">Выберите
                            параметр</label>
                        <select className={admin.selectUs} name="parameterOrder" id="parameterOrder">
                            <option value="all">Показать все</option>
                            <option value="new">Все новые</option>
                            <option value="paid">Все оплаченные</option>
                            <option value="delivered">Все обработанные</option>
                        </select>
                        <input className={admin.inputUs} type="text" name="name"/>
                        <div className={admin.end}>
                            <div className={admin.btnMr}>
                                <button className={admin.findBtn} type="submit"> Найти</button>
                            </div>
                            <div>
                                <h3 className={admin.errorUs}></h3>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className={admin.prod}>
                <div className={admin.findProd}>
                    <div className={admin.formProd} >
                        <h2 className={admin.titProd}>Найти товар</h2>
                        <label className={admin.labelUs} htmlFor="parameterProd">Выберите
                            параметр</label>
                        <select className={admin.selectUs} name="parameterProd" id="parameterProd">
                            <option value="allProd">Показать все</option>
                            <option value="category" className={admin.aa}>Категория</option>
                            <option value="nameProd">Название</option>
                        </select>
                        <input className={admin.inputUs} type="text" name="nameProd"/>
                        <div className={admin.end} >
                            <div className={admin.btnMr}>
                                <button className={admin.findBtn} type="submit">
                                    <NavLink to="/admin/products">Найти</NavLink></button>
                            </div>
                            <div>
                                <h3 className={admin.errorUs}></h3>
                                <h3 className={admin.errorUs}></h3>
                                <h3 className={admin.errorUs}></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={admin.findCat}>
                    <div className={admin.formProd} >
                        <h2 className={admin.titProd}>Найти категорию</h2>
                        <label className={admin.labelUs} htmlFor="parameterProductCategory"
                        >Выберите параметр</label>
                        <select className={admin.selectUs} name="parameterProductCategory"
                                id="parameterProductCategory"> Найти категорию по:
                            <option value="allCategories">Показать все</option>
                            <option value="categoryName" className={admin.aa}>Название</option>
                        </select>
                        <input className={admin.inputUs} type="text" name="nameProdCat"/>
                        <div className={admin.end}>
                            <div className={admin.btnMr}>
                                <button className={admin.findBtn} type="submit">
                                <NavLink to="/admin/categories">Найти</NavLink></button>
                            </div>
                            <div>
                                <h3 className={admin.errorUs}></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;