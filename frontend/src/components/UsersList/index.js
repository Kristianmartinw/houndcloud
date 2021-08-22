import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../store/users';
import { Route, Link } from "react-router-dom";
import UserPage from "../UserPage"
import './userList.css';

const UserList = ({ setCurrentlyPlaying }) => {
    const dispatch = useDispatch()
    const users = useSelector(state => {
        const arr = Object.values(state.users)
        return arr;
    })

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    return (
        <>
            <Route exact path='/users'>
                <div id='users-div'>
                    <ul>
                        {users.map((user) => <li key={user.id}><Link to={`/users/${user.id}`}>{user.username}</Link></li>)}
                    </ul>
                </div>
            </Route>
            <Route path='/users/:userId'>
                <UserPage setCurrentlyPlaying={setCurrentlyPlaying} />
            </Route>
        </>
    )
}

export default UserList
