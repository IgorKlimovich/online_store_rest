import {useEffect, useState} from "react";
import './AdminCategory.css'
import {useParams} from "react-router-dom";
import axios from "axios";

const AdminCategory = () => {
    const [category, setCategory] = useState([]);
    const {id} = useParams()
    const fetchCategory = () => {
        axios.get("http://localhost:8081/productCategories/" + id).then(res => {
            console.log(res.data.id);
            setCategory(res.data);
        })
    }
    useEffect(() => {
        fetchCategory();
    }, [])

    return (

        <div className="user">
            <div className="ord pr-w">
                <div className="tit-ord">
                    <h1>{category.name}</h1>

                </div>
                <div>
                    <img className="img-mb" src="https://diamedica.by/uploads/no-image.jpg"
                         width="450" height="450"/>
                </div>
                <div className="prof-items">
                    <div><h4>Название категории</h4></div>
                    <div className="prof-data"><h4 className="text-prof">{category.name}</h4>
                    </div>
                </div>
                <div className="prof-items">
                    <div><h4>Колличество товаров</h4></div>
                    <div className="prof-data"><h4 className="text-prof">{category.amount}</h4>
                    </div>
                </div>


                <hr className='hrCategory'/>
                <div>
                    <div>
                        <form>
                            <button type="button" onClick="return openMod();" className="add-card ord-btn">Изменить
                            </button>
                        </form>
                    </div>
                    {/*<div>*/}
                    {/*    <form th:if="${productCategoryDto.getAmount()<=0}">*/}
                    {/*        <button type="button" className="del-cat" onClick="return openModalDel();">Удалить*/}
                    {/*        </button>*/}
                    {/*    </form>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>

    )
}
export default AdminCategory;