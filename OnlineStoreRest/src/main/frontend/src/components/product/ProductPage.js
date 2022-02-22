import  './ProductPage.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Route, useParams, useRoutes} from "react-router-dom";
import './../profile/Profile.css'
import ModalChoosePath from "../modal/ModalChoosePath";

const ProductPage = () => {
    const token = localStorage.getItem('token');
    const [modal, setModal] = useState("");
    const [product, setProduct]=useState([]);
    const {id} = useParams()
    const fetchProducts = () => {
        axios.get("http://localhost:8081/products/"+id).then(res => {
            console.log(res.data.id);
            setProduct(res.data);
        })
    }
    useEffect(() => {
        fetchProducts();
    }, [])

    const toOrder = ()=>{
        axios.post("http://localhost:8081/orders/add",product,{
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(res=>{
            console.log(res)
            setModal(true)
        })
    }

    return(
        <div className="user">
            <ModalChoosePath visible={modal} setVisible={setModal}/>
            <div className="product pr-w">
                <div><h1 className="tit-pr">{product.name}</h1></div>
                {/*<h3>{product.namePhoto}</h3>*/}
                {product.namePhoto!=null ?
                    <td><img src={'/images/product-photos-rest/' + product.id+'/' +product.namePhoto} width="450" height="450"
                             alt={'qq'}/></td>
                    :<div>
                        <td><img src="https://diamedica.by/uploads/no-image.jpg" width="450" height="450" alt={'qq'}/></td>
                    </div>
                }
                <div className="prof-items">
                    <div><h4 >Название</h4></div>
                    <div className="prof-data"><h4 className="text-prof" >{product.name}</h4></div>
                </div>
                <div className="prof-items">
                    <div><h4 >Категория</h4></div>
                    <div className="prof-data"><h4 className="text-prof"
                    >{product.productCategoryName}</h4></div>
                </div>
                <div className="prof-items">
                    <div><h4 >Цена</h4></div>
                    <div className="prof-data"><h4 className="text-prof">{product.price}</h4></div>
                </div>
                <div className="prof-items">
                    <div><h4>Наличие</h4></div>
                    <div className="prof-data">
                        <h4 className="text-prof" >+</h4>
                        {/*<h4 className="text-prof" th:if="${!productDto.isExist}">-</h4>*/}
                    </div>
                </div>
                <hr/>
                    <div>
                        <details className="det-prod">
                            <summary className="sum">Описание</summary>
                            <div className="modal-body">
                                <h4 className="desc">{product.description}</h4>
                            </div>
                        </details>
                    </div>
                    {/*<form >*/}
                        <input type="hidden" name="id"/>
                            <button type="submit" className="add-card to-ord1" id="choose"
                            onClick={toOrder}> В
                                корзину
                            </button>
                    {/*</form>*/}
            </div>
        </div>
    )
}

export default ProductPage;