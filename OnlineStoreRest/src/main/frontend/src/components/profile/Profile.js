import axios from "axios";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import ModalAddCard from "../modal/ModalAddCard";
import ModalUpdateCard from "../modal/ModalUpdateCard";
import {NavLink} from "react-router-dom";
import ModalUpdateProfile from "../modal/ModalUpdateProfile";

const Profile = () => {

    const token = localStorage.getItem('token');
    console.log(token);
    const [file, setFile] = useState([]);
    const [user, setUser] = useState([]);
    const [cards, setCards] = useState([])
    const [modal, setModal] = useState(false)
    const [modalUpdate, setModalUpdate] = useState(false)
    const [modalUpdateProfile, setModalUpdateProfile] = useState(false);
    let onFileChange = event => {
        setFile(event.target.files[0])
    };

    const fetchUser = () => {
        axios.get("http://localhost:8081/user", {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res);
            setUser(res.data);
            setCards(res.data.cardsDto)
            console.log(user.login)
        })
    }
    useEffect(() => {
        fetchUser();
    }, [])

    const addPhoto = () => {
        const formData = new FormData();
        formData.append('file', file)
        axios.post("http://localhost:8081/users/addPhoto", formData, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                setUser(res.data);
                setCards(res.data.cardsDto)
                console.log(res);
            })
    }
    const deletePhoto = () => {

        axios.post("http://localhost:8081/users/deletePhoto", user.id, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                setUser(res.data);
                setCards(res.data.cardsDto)
                console.log(res);
            })
    }

    const [newCard, setNewCard] = useState("");


    const Cards = () => {


        return cards.map((card => {
            const deleteCard = () => {
                console.log(card.id)
                axios.delete("http://localhost:8081/cards/"+card.id,{
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                }).then(res=>{
                    console.log(res)
                     window.location="/profile"
                })

            }

            return (
                <tr>
                    <td><a>{card.number}</a></td>
                    <td>
                        {/*<form>*/}
                            <button type="button" onClick={() => {setModalUpdate(true);
                                setNewCard(card);}}
                                    className="btn-choose-card">Изменить
                                {/*<NavLink to={"/profile/"+card.id} */}
                                {/*>change</NavLink>*/}
                            </button>
                        {/*</form>*/}
                    </td>
                    <td><h3 className="pref">|</h3></td>
                    <td>
                            <button type="button" className=" btn-del"
                            onClick={deleteCard}>Удалить
                            </button>
                    </td>
                </tr>
            )
        }))

    }

    return (
        <div className="user">
            <ModalUpdateCard visibleUpdate={modalUpdate} setVisibleUpdate={setModalUpdate} cardForUpdate={newCard}/>
            <ModalUpdateProfile visible={modalUpdateProfile} setVisible={setModalUpdateProfile} user={user}/>
            <div className="user-prof us-pr-col pr-w">
                <div><h1 className="tit-pr us-tit"></h1></div>

                {user.namePhoto == null ?
                    <td><img src="https://i02.fotocdn.net/s121/fced1b9cb79eecf2/user_xl/2762630212.jpg" width="450"
                             height="450"
                             className="img-mb"/></td>
                    :
                    <td>
                        <img className="img-mb" src={'/images/user-photos-rest/' + user.id + '/' + user.namePhoto}
                             width="450" height="450" alt={'qq'}/>
                    </td>
                }


                <div className="prof-items">
                    <div><h4>Имя</h4></div>
                    <div className="prof-data"><h4 className="text-prof">{user.firstName}</h4></div>
                </div>
                <div className="prof-items">
                    <div><h4>Фамилия</h4></div>
                    <div className="prof-data"><h4 className="text-prof">{user.lastName}</h4></div>
                </div>
                <div className="prof-items">
                    <div><h4>Номер</h4></div>
                    <div className="prof-data"><h4 className="text-prof">{user.phoneNumber}</h4></div>
                </div>
                <div className="prof-items">
                    <div><h4>email</h4></div>
                    <div className="prof-data"><h4 className="text-prof">{user.email}</h4></div>
                </div>
                <div className="prof-items">
                    <div><h4>Логин</h4></div>
                    <div className="prof-data"><h4 className="text-prof">{user.login}</h4></div>
                </div>
                <h3>{cards.name}</h3>
                <div className="btn-add">
                    <div>
                        <button className="add-card upd-btn" type="button"
                           onClick={()=>setModalUpdateProfile(true)}>Изменить
                        </button>
                    </div>
                </div>
                <hr/>
                <div>
                    <details className="det">
                        <summary className="sum">Мои карты</summary>
                        <div className="modal-body">
                            <div className="tab">
                                <table >
                                    <tbody>
                                    <Cards/>
                                    </tbody>
                                </table>
                            </div>
                            <div className="btn-add">
                                <div>
                                    <button className="add-card" type="button"
                                            onClick={() => setModal(true)}>Добавить
                                    </button>
                                </div>
                            </div>
                            <ModalAddCard visible={modal} setVisible={setModal}/>
                        </div>
                    </details>
                </div>
                <div>
                    <details className="det">
                        <summary className="sum">Мои фото</summary>
                        {user.namePhoto == null ?
                            <div className="add-photo-prof">
                                <div>
                                    <label htmlFor="file">Выберите фото
                                        <input type="file" id="file" name="file"
                                               onChange={onFileChange}/>
                                    </label>
                                </div>
                                <div className="add-card-div">
                                    <button className="add-card" type="submit" multiple="true"
                                            onClick={addPhoto}>Добавить
                                    </button>
                                </div>
                            </div>
                            :
                            <div>
                                <form>
                                    {/*<input type="hidden" name="id" />*/}
                                    <button className="add-card del-photo-prof" type="submit"
                                            onClick={deletePhoto}>Удалить
                                    </button>
                                </form>


                            </div>
                        }


                    </details>
                </div>
            </div>
        </div>
    )
}

export default Profile;