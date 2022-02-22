import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import './AdminProduct.css';
import './../profile/Profile.css'

const AdminProduct = () => {
    const [product, setProduct]=useState([]);
    const {id} = useParams()
    const fetchProduct = () => {
        axios.get("http://localhost:8081/admin/products/"+id).then(res => {
            console.log(res.data.id);
            setProduct(res.data);
        })
    }
    useEffect(() => {
        fetchProduct();
    }, [])
  return(
      <div className="user">
          <div className="product pr-w">
              <div><h1 className="tit-pr">{product.name}</h1></div>
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
                  <div><h4 >Колличество</h4></div>
                  <div className="prof-data"><h4 className="text-prof" >{product.amount}</h4></div>
              </div>
              <div className="prof-items">
                  <div><h4>Наличие</h4></div>
                  <div className="prof-data">
                      {product.isExist?
                          <h4 className="text-prof" >+</h4>
                          :
                          <h4 className="text-prof" >-</h4>
                      }
                  </div>
              </div>

              <hr className='hrProduct'/>
                  <div>
                      <details className="det-prod">
                          <summary className="sum" >Описание</summary>
                          <div className="modal-body">
                              <h4 className="desc" >{product.description}</h4>
                          </div>
                      </details>
                  </div>
                  <button className="button add-card to-ord ml-b" type="button"
                          onClick="return openModalUpdateProduct();">Изменить
                  </button>
                  <div>
                      <details className="det">
                          <summary className="sum">Фото</summary>
                          <div  className="add-photo-prod">
                              <form method="post" action="/admin/product/add_photo" encType="multipart/form-data">
                                  <div>
                                      <div>
                                          <label htmlFor="file-add">Выберите фото
                                              <input type="file" id="file-add" name="file"/>
                                          </label>
                                          <input type="hidden" name="id"/>
                                      </div>
                                      <div className="btn-add-photo">
                                          <button className="add-card" type="submit" multiple="true">Добавить
                                          </button>
                                      </div>
                                  </div>
                              </form>
                          </div>
                          {/*<div th:if="${productDto.namePhoto!=null}">*/}

                          {/*    <form method="post" action="/admin/product/delete_photo">*/}
                          {/*        <input type="hidden" name="id" th:value="${productDto.id}">*/}
                          {/*            <button className="add-card del-photo" type="submit" multiple="true"*/}
                          {/*                    th:text="#{delete}">Удалить*/}
                          {/*            </button>*/}
                          {/*    </form>*/}
                          {/*</div>*/}
                      </details>
                  </div>
          </div>
      </div>
  )

}
export default AdminProduct