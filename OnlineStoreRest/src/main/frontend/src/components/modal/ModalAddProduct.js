import React, {useContext, useEffect, useState} from "react";
import './ModalAddProduct.css'
import axios from "axios";
import {Context} from "../../index";


const ModalAddProduct = ({visible, setVisible}) => {

    const rootClasses = ['modal'];
    if (visible === true) {
        rootClasses.push('active');
    }

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState([]);
    const [amount, setAmount] =useState('');
    const [productCategoryName, setProductCategoryName] = useState('');
    const [productCategories, setProductCategories] = useState([]);
    const [description, setDescription]=useState('');
    const [nameDirty, setNameDirty] = useState(false);
    const [priceDirty, setPriceDirty] = useState(false);
    const [amountDirty, setAmountDirty] = useState(false);
    const [nameError, setNameError] = useState('название не может быть пустым')
    const [priceError, setPriceError] = useState('цена не может быть пустой')
    const [amountError, setAmountError] = useState('колличество не может быть пустым')
    const [notExistCategory, setNotExistCategory] = useState('');
    const [formValid, setFormValid] = useState(false)

    let onFileChange = event => {
        setFile( event.target.files[0] )
    };

    useEffect (()=>{
        if (nameError||priceError||amountError){
            setFormValid(false)
        }
        else setFormValid(true)
    },[nameError,priceError,amountError])

    const nameHandler = (e) => {
        setName(e.target.value)
        if(!e.target.value){
            setNameError('имя не может быть пустым')
        }
        else {
            setNameError('')
        }
    }
    const priceHandler = (e) => {
        setPrice(e.target.value)
        if(!e.target.value){
            setPriceError('цена не может быть пустой')
        }
        else {
            setPriceError('')
        }
    }
    const amountHandler = (e) => {
        setAmount(e.target.value)
        if(!e.target.value){
            setAmountError('колличество не может быть пустым')
        }
        else {
            setAmountError('')
        }
    }

    useEffect(()=>{
        axios.get("http://localhost:8081/productCategories").then(res=>{
            setProductCategories(res.data);
            console.log(res.data)
        })
    },[])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "name":
                setNameDirty(true)
                break
            case "price":
                setPriceDirty(true)
                break
            case "amount":
                setAmountDirty(true)
                break
        }
    }


    const submitToServer = () => {
        const formData =  new FormData();
        formData.append('file', file)
        formData.append('product',new Blob([JSON.stringify({
            "name":name,"amount":amount,"price":price,"description":description,"productCategoryName":productCategoryName
        })],{type:"application/json"}))

        axios.post("http://localhost:8081/products", formData)
            .then(res => {
                if(res.data.message==='Такой категории не найдено'){
                    setNotExistCategory('такой категории не найдено')
                }
                else {
                    // setVisible(false)
                    console.log(res);
                    window.location='/admin/products'
                }

        })

    }
    //
    // const prod = useContext(Context)
    //
    // console.log(prod.product.types)

    return (
        <div id="openModal" className={rootClasses.join(' ')}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Добавить товар</h3>
                        <a onClick={() => setVisible(false)}
                           title="Close" id="close" className="close">×</a>
                    </div>
                    <div className="modal-body">
                        <div>
                            <form >
                                <div className="dis">
                                    <label htmlFor="name">Введите название</label>
                                    <input type="text" name='name'
                                           value={name}
                                           onBlur={e => blurHandler(e)}
                                           onChange={e=>nameHandler(e)}
                                           className="inp-mod"/>
                                </div>
                                {(nameDirty && nameError) && <div className="mb">{nameError}</div>}
                                {/*<div th:if="${emptyProductName}" className="mb"*/}
                                {/*     th:text="#{productNameCanNotBeEmpty}">*/}
                                {/*</div>*/}
                                {/*<div th:if="${existProductName}" className="mb"*/}
                                {/*     th:text="#{suchNameAlreadyExists}">*/}
                                {/*</div>*/}
                                <div className="dis">
                                    <label htmlFor="price">Введите цену</label>
                                    <input type="number" name='price'
                                           id="price" step="any" min="0.01"
                                           onBlur={e => blurHandler(e)}
                                           value={price}
                                           onChange={e=>priceHandler(e)}
                                           className="inp-mod"/>
                                </div>
                                {(priceDirty && priceError) && <div className="mb">{priceError}</div>}
                                {/*<div th:if="${emptyPriceProduct}" className="mb"*/}
                                {/*     th:text="#{productPriceCanNotBeEmpty}">*/}
                                {/*</div>*/}
                                <div className="dis">
                                    <label htmlFor="amount">Введите колличество</label>
                                    <input type="number" step="any" min="1" id="amount" name='amount'
                                           value={amount}
                                           onBlur={e => blurHandler(e)}
                                           onChange={e=>amountHandler(e)}
                                           className="inp-mod"/>
                                </div>
                                {(amountDirty && amountError) && <div className="mb">{amountError}</div>}
                                {/*<div th:if="${emptyAmountProduct}" className="mb"*/}
                                {/*     th:text="#{amountProductCanNotBeEmpty}">*/}
                                {/*</div>*/}
                                <div className="dis">
                                    <label htmlFor="file">Загрузите фото</label>
                                    <input type="file" name="file" id="file" className="inp-file"
                                           onChange={onFileChange}/>
                                </div>
                                <div className="dis">
                                    <label htmlFor="category"> Выберите категорию</label>
                                    {/*<input  type="text" className="inp-mod"*/}
                                    {/*       id="input"*/}
                                    {/*       value={productCategoryName}*/}
                                    {/*       onChange={e=>setProductCategoryName(e.target.value)}*/}
                                    {/*/>*/}
                                    {/*<datalist id="category" >*/}
                                    <select className="inp-mod"
                                            value={productCategoryName}
                                            onChange={e=>setProductCategoryName(e.target.value)} >
                                        <option>выберите категорию</option>
                                        {
                                            productCategories.map(productCategory=>
                                                <option >{productCategory.name}</option>
                                            )
                                        }
                                    </select>

                                    {/*</datalist>*/}
                                </div>
                                {notExistCategory  && <div className="mb">{notExistCategory}</div>}
                                {/*<div th:if="${categoryNotExist}" className="mb"*/}
                                {/*     th:text="#{noSuchCategoryFound}">*/}

                                <div className="dis">
                                    <label htmlFor="description">Описание</label>
                                    <textarea id="description" name="description"
                                              value={description}
                                              onChange={e=>setDescription(e.target.value)}
                                              className="inp-mod ml15">
                        </textarea>
                                </div>
                                <div className="cont">
                                    <div>
                                        <button className="modal-btn-yes" multiple="true" type="button"
                                                disabled={!formValid}
                                                onClick={submitToServer}>
                                            Сохранить
                                        </button>
                                    </div>
                                    <div>
                                        <button type="button" className="modal-btn-no">
                                            <a onClick={() => setVisible(false)} className="ref-close"
                                               >Отмена</a></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalAddProduct