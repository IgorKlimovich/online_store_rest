import axios from "axios";
import {useEffect, useState} from "react";
 import classes from "./AdminUsers.module.css";
import {NavLink} from "react-router-dom";

const Users = () => {
    const token = localStorage.getItem('token');
    console.log(token);
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        axios.get("http://localhost:8081/admin/users", {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res);
            setUsers(res.data);
            // console.log(user.firstName)
        })
    }
    useEffect(() => {
        fetchUsers();
    }, [])

    return users.map((user) => {
        return (
            <tr key={user.id} className='trTab'>
                <td className={classes.nameProd}><NavLink to={'/admin/user/' + user.id}
                                                         className={classes.nameProd}>{user.firstName}</NavLink></td>

                <td className={classes.tdTab}><h3 >{user.lastName}</h3></td>
                <td className={classes.tdTab}>
                    <img src="https://i02.fotocdn.net/s121/fced1b9cb79eecf2/user_xl/2762630212.jpg"
                         width="150" height="100" className="img-mb"/></td>
                {/*<td th:if="${userDto.namePhoto!=null}">*/}
                {/*    <img th:src="@{${userDto.photosImagePath}}" width="150" height="100"/>*/}
                {/*</td>*/}
                <td className={classes.tdTab}><h3 >{user.email}</h3></td>
                <td className={classes.tdTab}><h3 >{user.login}</h3></td>
                <td className={classes.tdTab}><h3 >{user.phoneNumber}</h3></td>
            </tr>
        )
    })
}


const AdminUsers = () => {


    return (
        <div>
            <hr className='hrUs'/>
            <div className={classes.tab}>
                <table className={classes.table3} id="myTable">
                    <thead>
                    <tr className='trTab'>
                        <th scope="col"> Имя</th>
                        <th scope="col"> Фамилия</th>
                        <th scope="col"> Фото</th>
                        <th scope="col"> email</th>
                        <th scope="col"> логин</th>
                        <th scope="col"> номер телефона</th>
                    </tr>
                    </thead>
                    <tbody>
                    <Users/>
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default AdminUsers;