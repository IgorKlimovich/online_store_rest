import './Search.css'
import TableProductLast from "../tableproductlast/TableProductLast";
import {useEffect, useState} from "react";
import InputSearchCategory from "../input/InputSearchCategory";
import axios from "axios";

const Search = () => {

    // const [name, setName] = useState('');
    // const [price, setPrice] = useState('');
    //
    //
    //
    // const submitToServer = (s) => {
    //     s.preventDefault();
    //     const product = {
    //         'name': name,
    //         'price': price
    //     }
    //     console.log(name);
    //     console.log(price)
    //
    //     axios.post("http://localhost:8081/products", product).then(res => {
    //         console.log(res);
    //     })
    //
    // }



    return (
        <div className="displayTable">
            <div className="search">
                <h2 className="sf"> Поиск по фильтрам</h2>
                <hr className="ha"/>
                <div>
                    <form action="/search" method="get">
                        <div className="form-group1">
                            <label htmlFor="category"> Введите категорию</label>
                            <input autoComplete="off" list="category" type="text"
                                   id="input" name="category"/>
                            <datalist id="category">
                                <option>
                                </option>
                            </datalist>
                            <div className="ser">
                            </div>
                        </div>
                        <div className="form-group1">
                            <label htmlFor="name"> Введите название</label>
                            <input autoComplete="off" list="name" type="text" name="name"/>
                            <datalist id="name">
                                <option></option>
                            </datalist>
                        </div>
                        <div className="ser">
                        </div>
                        <div className="form-group2">
                            <label htmlFor="minPrice"> Введите минимальную цену</label>
                            <input type="number" id="minPrice" name="minPrice"/>
                        </div>
                        <div className="ser">
                        </div>
                        <div className="form-group2">
                            <label htmlFor="maxPrice"> Введите максимальную цену</label>
                            <input type="number" id="maxPrice" name="maxPrice"/>
                        </div>
                        <div className="ser">
                        </div>
                        {/*<InputSearchCategory*/}
                        {/*    value={name}*/}
                        {/*    onChange={a => setName(a.target.value)}*/}
                        {/*/>*/}
                        {/*<InputSearchCategory*/}
                        {/*    value={price}*/}
                        {/*    onChange={z => setPrice(z.target.value)}*/}
                        {/*/>*/}
                        <input type="submit" className="btn-search btn-search-color"/>
                        {/*<button onClick={submitToServer}>send</button>*/}
                    </form>
                </div>

            </div>
            <TableProductLast/>
        </div>
    )
}

export default Search