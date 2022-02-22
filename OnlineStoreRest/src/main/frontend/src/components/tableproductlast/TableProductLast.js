import './TableProductLast.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, NavLink} from "react-router-dom";

const TableProduct = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        axios.get("http://localhost:8081/products/last").then(res => {
            console.log(res);
            setProducts(res.data);
        })
    }
    useEffect(() => {
        fetchProducts();
    }, [])


    return products.map((product) => {

        return (

            <tr key={product.id} className='trLast'>
                <td className="wid-td"><Link to={'product/'+product.id}
                                                className="td-ref"> {product.name}</Link></td>

                <td>
                    <img src="https://diamedica.by/uploads/no-image.jpg" width="150" height="100"
                    alt={'photo'}/></td>
                <td>{product.productCategoryName}</td>
                <td>{product.price}</td>
            </tr>

        )
    })
};


const TableProductLast = () => {

    return (
        <div className="ai">
            <div><h2 className="tit">Последние поступления:</h2></div>
            <div className="tab">
                <table className="table ">
                    <thead>
                    <tr className='trLast'>
                        <th scope="col"> Название</th>
                        <th scope="col"> Фото</th>
                        <th scope="col"> Категория</th>
                        <th scope="col"> Цена</th>
                    </tr>
                    </thead>
                    <tbody>

                    <TableProduct />

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default TableProductLast;