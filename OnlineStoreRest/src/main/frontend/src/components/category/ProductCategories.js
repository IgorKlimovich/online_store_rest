import cat from './ProductCategories.module.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

const Categories = () => {

    const [categories, setCaterories] = useState([]);

    const fetchCategories = () => {
        axios.get("http://localhost:8081/productCategories").then(res => {
            console.log(res);
            setCaterories(res.data);
        })
    }
    useEffect(() => {
        fetchCategories();
    }, [])
    return categories.map((category, index) => {

        return (
            <tr className={cat.tr} key={index}>
                <td className={cat.td}>
                    <h3 className={cat.titCat}>{category.name}</h3>
                    <img className={cat.bdPlaceholderImg}
                         src="https://diamedica.by/uploads/no-image.jpg"
                         width="100" height="100"/>
                    <div className={cat.tabTd}>
                        <button className={cat.btnLook}>
                            <NavLink to={'/products/'+category.id} className={cat.ref}>Посмотреть</NavLink>
                        </button>
                    </div>
                </td>
            </tr>
        )
    })
};
const ProductCategories=()=>{

    return(
        <div >
            <h2 className={cat.hTitle}>Выберите категорию</h2>
            <div >
                <div>
                    <table id="myTable">
                        <tbody className={cat.tbody}>
                       <Categories/>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductCategories;