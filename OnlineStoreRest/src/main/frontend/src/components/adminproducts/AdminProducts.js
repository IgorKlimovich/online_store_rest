import classes from './AdminProducts.module.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, NavLink} from "react-router-dom";
import AdminSearchProduct from "../adminsearchproduct/AdminSearchProduct";
import ModalAddProduct from "../modal/ModalAddProduct";

const Products = () => {
    const token = localStorage.getItem('token');
    console.log(token);
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        axios.get("http://localhost:8081/admin/products",{
            headers:{
                'Authorization' : 'Bearer '+token,
                'Content-Type':'application/json'
            }
        }).then(res => {
            console.log(res);
            setProducts(res.data);
            console.log(products.namePhoto)
        })
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    return products.map((product) => {
        return (
            <tr key={product.id} className='trTab'>
                <td className={classes.tdWidth}><NavLink to={'/admin/product/'+product.id}
                                                         className={classes.nameProd}>{product.name}</NavLink></td>
                {product.namePhoto!=null ?
                    <td className={classes.tdTab}><img src={'/images/product-photos-rest/' + product.id+'/' +product.namePhoto} width="150" height="100"
                             alt={'qq'}/></td>
                    :
                    <td className={classes.tdTab}><img src="https://diamedica.by/uploads/no-image.jpg" width="150" height="100" alt={'qq'}/></td>
                }
                <td className={classes.tdTab}><h4>{product.productCategoryName}</h4></td>
                <td className={classes.tdTab}><h4>{product.price}</h4></td>
                {product.isExist?
                    <td className={classes.tdTab}><h4>+</h4></td>
                    :
                    <td className={classes.tdTab}><h4>-</h4></td>
                }
            </tr>
        )
    })
};

const AdminProducts = () => {

    const [modal, setModal] = useState(false);

    return (
        <div>
            <AdminSearchProduct/>
            <ModalAddProduct visible={modal} setVisible={setModal} />
            <hr className={classes.hrProducts}/>
            <div className={classes.tab}>
                <table id="myTable" className={classes.table4}>
                    <thead>
                    <tr className='trTab'>
                        <th scope="col"> Название</th>
                        <th scope="col"> Фото</th>
                        <th scope="col"> Категория</th>
                        <th scope="col"> Цена</th>
                        <th scope="col"> Наличие</th>
                    </tr>
                    </thead>
                    <tbody>
                    <Products/>
                    </tbody>
                </table>
            </div>
            <button className={classes.addCard}>
                <a href="#" className={classes.addPr} onClick={()=>setModal(true)}>Добавить товар</a>
            </button>
        </div>
    )
}

export default AdminProducts;