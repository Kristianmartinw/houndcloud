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
                    <div className='list'>
                        {users.map((user) => <div className='userBox' key={user.id}><Link to={`/users/${user.id}`}><img className='userPic' alt="userPagePlaceholder" src='https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg'></img>{user.username}</Link></div>)}
                    </div>
                </div>
            </Route>
            <Route path='/users/:userId'>
                <UserPage setCurrentlyPlaying={setCurrentlyPlaying} />
            </Route>
        </>
    )
}

export default UserList
