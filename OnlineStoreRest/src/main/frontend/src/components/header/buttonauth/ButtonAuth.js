import {NavLink, useLocation} from "react-router-dom";
import ModalAddProduct from "../../modal/ModalAddProduct";
import ModalSignOut from "../../modal/ModalSignOut";
import {useEffect, useState} from "react";
import axios from "axios";
import {observer} from "mobx-react-lite";
import ModalDeleteProfile from "../../modal/ModalDeleteProfile";

const ButtonAuth =  () => {
    const token = localStorage.getItem('token');
    const location = useLocation()
    const login = location.pathname === '/login';
    const registration = location.pathname ==='/registration';
    let list=document.getElementById('list');
    const [user, setUser]=useState("");

    const fetchUser = () => {
        axios.get("http://localhost:8081/user", {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res);
            setUser(res.data);
            // setCards(res.data.cardsDto)
            console.log(user.login)
        })
    }
    useEffect(() => {
        fetchUser();
    }, [])

    function openListProfile(){
        document.getElementById("list").classList.toggle("show");
    }

    // function closeListProfile(){
    //     list.style.display='none';
    // }
    window.onclick = function(event) {
        if (!event.target.matches('.dropdown-toggle')) {
            var dropdowns = document.getElementsByClassName("dropdown-menu");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }


    // let openModalDeleteProfile= document.getElementById('openModalDeleteProfile')
    // let openModalSignOut= document.getElementById('openModalSignOut')
    //
    // function openModelDeleteProfile(){
    //     openModalDeleteProfile.style.opacity='1';
    //     openModalDeleteProfile.style.pointerEvents='auto';
    // }

    const [modal, setModal] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);

    return (
        <div>

            {!login&&!registration ?
                <div className="text-end">
                    <div className="prof">
                        <a href="#" className="dropdown-toggle" onClick={openListProfile}>
                            {user.namePhoto==null?
                                <img src="https://i02.fotocdn.net/s121/fced1b9cb79eecf2/user_xl/2762630212.jpg"
                                     width="45"
                                     className="prof-img"/>
                                :
                                <img src={'/images/user-photos-rest/' + user.id+'/' +user.namePhoto} width="50" height="50"
                                     className="prof-img"/>
                            }
                        </a>
                    </div>
                    <div id="list-profile">
                        <ul id="list" className="dropdown-menu ">
                            <li className="color-item">
                                <NavLink to="/profile" className="list-item">Мой профиль</NavLink>
                            </li>
                            <li className="color-item">
                                <a href="/orders" className="list-item">Мои покупки</a>
                            </li>
                            <li className="color-item">
                                <a href="#" onClick={()=>setModal(true)}
                                         className="list-item">Выйти </a>
                            </li>
                            <li className="color-item">
                                <a href="#" className="list-item"
                                   onClick={()=>setModalDelete(true)}>Удалить профиль</a>
                            </li>
                        </ul>
                    </div>
                    <ModalSignOut visible={modal} setVisible={setModal} />
                    <ModalDeleteProfile visibleDelete={modalDelete} setVisibleDelete={setModalDelete}/>
                </div>
                :
                <div></div>
            }
        </div>

    )

}

export default ButtonAuth