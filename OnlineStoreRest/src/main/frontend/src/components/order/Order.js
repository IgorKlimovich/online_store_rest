import {useEffect, useState} from "react";
import './Order.css'
import {useParams} from "react-router-dom";
import axios from "axios";
import ModalNoCards from "../modal/ModalNoCards";
import ModalChooseCard from "../modal/ModalChooseCard";

const Order = () => {
    const [modal, setModal] = useState(false)
    const [modalChooseCard, setModalChooseCard] = useState(false)
    const [order, setOrder] = useState([])
    const [stateOrder, setStateOrder] = useState("");
    const [cards, setCards] = useState([]);
    const [orderProducts, setOrderProducts] = useState([])

    const {id} = useParams();
    const fetchOrder = () => {
        axios.get("http://localhost:8081/orders/" + id,).then(res => {
            setOrder(res.data);
            setStateOrder(res.data.stateOrderDto);
            setOrderProducts(res.data.orderProductsDto)
            setCards(res.data.userDto.cardsDto)
        })
    }
    useEffect(() => {
        fetchOrder();
    }, [])

    const pay = () => {
        if (order.userDto.cardsDto.length === 0) {
            setModal(true)
        } else {
            setModalChooseCard(true)
        }
    }

    const OrderProduct = () => {
        return orderProducts.map((orderProduct) => {
            const deleteProduct = () => {
                axios.delete("http://localhost:8081/orders/" + orderProduct.id).then(res => {
                    console.log(res.data);
                    window.location='/orders/'+id
                })
            }
            return (
                <tr key={orderProduct.id} className='trTab'>
                    <td><h3>{orderProduct.productDto.name}</h3></td>
                    {orderProduct.productDto.namePhoto != null ?
                        <td><img src={'/images/product-photos-rest/' + orderProduct.productDto.id + '/'
                            + orderProduct.productDto.namePhoto} width="150" height="100"
                                 alt={'qq'}/></td>
                        : <div>
                            <td><img src="https://diamedica.by/uploads/no-image.jpg" width="150" height="100"
                                     alt={'qq'}/></td>
                        </div>
                    }
                    <td>
                        <form>
                            <div>
                                {order.stateOrderDto.name === 'NEW' &&
                                    <button className="del-ord" type="button" onClick={deleteProduct}>Удалить
                                    </button>}
                                {order.stateOrderDto.name === 'PAID' && <h2 className="success">Оплачено</h2>}
                                {order.stateOrderDto.name === 'DELIVERED' && <h2 className="success">Выполнено</h2>}
                            </div>
                        </form>
                    </td>
                    <td className="price">{orderProduct.productDto.price}</td>
                </tr>
            )
        })
    }

    const MyOrder = () => {
        return orderProducts.map((orderProduct) => {
            return (
                <tr key={orderProduct.id}>
                    <td><h3 className="order-price">{orderProduct.productDto.price}</h3></td>
                </tr>
            )
        })
    }

    if(orderProducts.length===0){
        return <div>
            <h1>В корзине нету товаров, добавьте товары в корзину </h1>
        </div>
    }

    return (


                // <div className="title-ord">Моя корзина:</div>
                <div className="container-ord">
                    <ModalNoCards visible={modal} setVisible={setModal}/>
                    <ModalChooseCard visible={modalChooseCard} setVisible={setModalChooseCard} order={order}
                                     cards={cards}/>
                    <div className="table-ord">
                        <table className="table1">
                            <thead>
                            {/*<tr>*/}
                            {/*</tr>*/}
                            </thead>
                            <tbody>
                            <OrderProduct/>
                            </tbody>
                        </table>
                    </div>
                    <div className="order">
                        <div className="order-main">
                            <div className="order-head">
                                <h2 className="h2-order">Ваш заказ</h2>
                            </div>
                            <div className="order-cont">
                                <div>
                                    <h3 className="order-cost"> Стоимость товаров:</h3>
                                    <MyOrder/>
                                </div>
                                <hr className='hrOrd'/>
                                <div className="order-full">
                                    <div>
                                        <h3 className="full-price">Итого:</h3>
                                    </div>
                                    <div>
                                        <h3>{order.fullPrice}</h3>
                                    </div>
                                </div>
                                <div className="order-btn">
                                    {stateOrder.name === 'NEW' &&
                                        <button className="btn-order" onClick={pay}>Оформить заказ
                                        </button>
                                    }
                                    {stateOrder.name === 'PAID' && <h3 className="success">Оплачено</h3>}
                                    {stateOrder.name === 'DELIVERED' &&
                                        <h3 className="success"> Ваш заказ успешно выполнен</h3>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

    )
}
export default Order