import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "./Products.css";

const TableProductByCategory = () => {
    const [products, setProducts] = useState([]);
    const {id} = useParams()
    console.log(id)
    const fetchProductsByCategory = () => {
        axios.get("http://localhost:8081/productCategories/products/"+id).then(res => {
            console.log(res);
            setProducts(res.data);
        })
    }
    useEffect(() => {
        fetchProductsByCategory();
    }, [])

    return products.map((product) => {
        return (
            <tr key={product.id}>
                <td className="wid-td"><Link to={'/product/'+product.id}
                                             className="td-ref"> {product.name}</Link></td>
                {product.namePhoto!=null ?
                    <td><img src={'/images/product-photos-rest/' + product.id+'/' +product.namePhoto} width="150" height="100"
                             alt={'qq'}/></td>
                    :
                    <td><img src="https://diamedica.by/uploads/no-image.jpg" width="150" height="100" alt={'qq'}/></td>
                }
                <td>{product.productCategoryName}</td>
                <td>{product.price}</td>
                {product.isExist?
                    <td><h4>+</h4></td>
                    :
                    <td><h4>-</h4></td>
                }
            </tr>
        )
    })
};

const Products = () => {
    return (
        <div>
            <div className="search-js">
                <div>
                    <h2>Поиск на странице, введите название
                        товара:</h2>
                </div>
                <div>
                    <input type="text" id="myInput" onKeyUp="search()"
                           className="input-js" title="Введите категорию"/>
                </div>
            </div>
            <hr/>
            <div className="tb-mt">
                <div className="tit-prod"><h2></h2></div>
                <div className="tab">
                    <table className="table " id="myTable">
                        <thead>
                        <tr>
                            <th scope="col"> Название</th>
                            <th scope="col"> Фото</th>
                            <th scope="col"> Категория</th>
                            <th scope="col"> Цена</th>
                            <th scope="col"> Наличие</th>
                        </tr>
                        </thead>
                        <tbody className="page">
                        <TableProductByCategory/>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Products;