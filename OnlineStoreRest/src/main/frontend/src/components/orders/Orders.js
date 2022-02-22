import {useEffect, useState} from "react";
import axios from "axios";
import './Orders.css'
import {NavLink} from "react-router-dom";

const Ord = () => {

    const token  = localStorage.getItem("token");
    const [orders, setOrders] = useState([])

    const fetchOrders = () => {
        axios.get("http://localhost:8081/orders", {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setOrders(res.data)
            console.log(res.data)

        })
    }
    useEffect(() => {
            fetchOrders()
        },[])
    return orders.map((order) => {
        console.log(order.date)
        return (
            <tr className="orderTr">
                <td className="orderTd">
                    <div className="prof-items">
                        <div><h4>Номер заказ</h4></div>
                        <div className="prof-data"><h4 className="text-prof">{order.id}</h4>
                        </div>
                    </div>
                    <div className="prof-items">
                        <div><h4>Дата создания</h4></div>
                        <div className="prof-data"><h4 className="text-prof">{order.date}</h4>
                        </div>
                    </div>
                    <div className="prof-items mb-ord">
                        <div><h4>Стоимость товаров</h4></div>
                        <div className="prof-data"><h4 className="text-prof">{order.fullPrice}</h4></div>
                    </div>
                    <div>
                        <div className="tab-td">
                            <form >

                                <button className="add-card upd-btn1 mt-btn" type="submit"
                                ><NavLink to={"/orders/"+order.id} >Посмотреть</NavLink>
                                </button>
                            </form>
                            <div className="state">
                                {order.stateOrderDto.name==='NEW' &&
                                    <h3 className="state-text">Новый</h3>
                                }
                                {order.stateOrderDto.name==='PAID' &&
                                    <h3 className="state-text">Оплачено</h3>
                                }
                                {order.stateOrderDto.name==='DELIVERED' &&
                                    <h3 className="state-text">Выполнено</h3>
                                }
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        )
    })
}


const Orders = () => {


    return (
        <div>
            <div className="container">
                <div className="row">
                    <table className="table ">
                        <tbody className="tbodyOrder">
                        <Ord/>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Orders;