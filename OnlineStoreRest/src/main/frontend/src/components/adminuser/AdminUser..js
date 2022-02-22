import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const AdminUser = () => {
    const token = localStorage.getItem('token');
    const [user, setUser]=useState([]);
    const {id} = useParams()
    const fetchUser = () => {
        axios.get("http://localhost:8081/admin/users/"+id,{
        headers: {
            'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
        }
    }
        ).then(res => {
            console.log(res.data.id);
            setUser(res.data);
        })
    }
    useEffect(() => {
        fetchUser();
    }, [])
    return (
        <div className="user">
            <div className="product pr-w">
                <div><h1 className="tit-pr"></h1></div>
                <td>
                    <img src="https://i02.fotocdn.net/s121/fced1b9cb79eecf2/user_xl/2762630212.jpg" width="450"
                         height="450"
                         className="img-mb"/></td>
                {/*<td th:if="${userDto.namePhoto!=null}">*/}
                {/*    <img className="img-mb" th:src="@{${userDto.photosImagePath}}" width="450" height="450"/></td>*/}
                <div className="prof-items">
                    <div><h4>Имя</h4></div>
                    <div className="prof-data"><h4 className="text-prof">{user.firstName}</h4></div>
                </div>
                <div className="prof-items">
                    <div><h4>Фамилия</h4></div>
                    <div className="prof-data"><h4 className="text-prof">{user.lastName}</h4></div>
                </div>
                <div className="prof-items">
                    <div><h4>Email</h4></div>
                    <div className="prof-data"><h4 className="text-prof">{user.email}</h4></div>
                </div>
                <div className="prof-items">
                    <div><h4>Номер телефона</h4></div>
                    <div className="prof-data"><h4 className="text-prof">{user.phoneNumber}</h4></div>
                </div>
                <div className="prof-items">
                    <div><h4>Роль</h4></div>
                    <div className="prof-data"><h4 className="text-prof"></h4></div>
                </div>
                {/*<div className="prof-items">*/}
                {/*    <div><h4 th:text="#{state}">Статус</h4></div>*/}
                {/*    <div className="prof-data"><h4 className="text-prof" th:text="${userDto.stateDto.name}"></h4></div>*/}
                {/*</div>*/}
                <hr/>
                {/*<form th:method="post" th:action="@{/admin/user/{id}/ban(id=${userDto.id})}"*/}
                {/*      th:if="${userDto.stateDto.name.equals('ACTIVE')}">*/}
                {/*    <button type="submit" className="button add-card to-ord" th:text="#{ban}">Заблокировать</button>*/}
                {/*</form>*/}
                {/*<form th:method="post" th:action="@{/admin/user/{id}/unban(id=${userDto.id})}"*/}
                {/*      th:if="${userDto.stateDto.name.equals('BANNED')}">*/}
                {/*    <button type="submit" className="button add-card to-ord" th:text="#{unban}">Разблокировать*/}
                {/*    </button>*/}
                {/*</form>*/}
            </div>
        </div>
    )
}
export default AdminUser