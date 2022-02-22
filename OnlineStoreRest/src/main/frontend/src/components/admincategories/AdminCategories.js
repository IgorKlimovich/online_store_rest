import {useEffect, useState} from "react";
import ModalAddCategory from "../modal/ModalAddCategory";
import axios from "axios";
import classes from "../adminproducts/AdminProducts.module.css";
import {Link} from "react-router-dom";

const Categories = () => {

    const [categories, setCategories] = useState([]);

    const fetchCaregories = () => {
        axios.get("http://localhost:8081/productCategories").then(res => {
            console.log(res);
            setCategories(res.data);
        })
    }
    useEffect(() => {
        fetchCaregories();
    }, [])
    return categories.map((category) => {
        return (
            <tr key={category.id}>
                <td className={classes.tdWidth}><Link to={'/admin/category/'+category.id}
                                                      className="td-ref">{category.name}</Link></td>
                <td><h4>{category.amount}</h4></td>
                <td><img src="https://diamedica.by/uploads/no-image.jpg" width="150" height="100"/></td>
            </tr>
        )
    })
};

const AdminCategories = ()=>{
    const [modal, setModal] = useState(false);
    return(
        <div>
            <ModalAddCategory visible={modal} setVisible={setModal} />
            <hr/>
                <div className="tab">
                    <table className="table " id="myTable">
                        <thead>
                        <tr>
                            <th scope="col"> Название</th>
                            <th scope="col"> Колличество</th>
                            <th scope="col"> Фото</th>
                        </tr>
                        </thead>
                        <tbody>
                        <Categories/>
                        {/*<tr th:each="productCategoryDto : ${productCategoriesDto}">*/}
                        {/*    <td><a th:text="${productCategoryDto.name}" className="name-prod"*/}
                        {/*           th:href="@{/admin/product_category/{id}(id=${productCategoryDto.id})}"></a></td>*/}
                        {/*    <td><h3 th:text="${productCategoryDto.amount}"></h3></td>*/}
                        {/*</tr>*/}
                        </tbody>
                    </table>
                </div>
            <button className="add-card">
                <a href="#" className="add-pr" onClick={()=>setModal(true)}>Добавить категорию</a>
            </button>
        </div>
    )
}

export default AdminCategories