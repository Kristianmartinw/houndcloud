import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <NavLink className='navLinks' to="/login">Log In</NavLink>
                <NavLink className='navLinks' to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (
        <div className='navbar'>
            <NavLink className='navLinks' exact to="/">Home</NavLink>
            <NavLink className='navLinks' to='/breeds'>Breeds</NavLink>
            <NavLink className='navLinks' to='/users'>Users</NavLink>
            <input placeholder="Sorry! Currently WIP 🚧🚧"></input>
            {isLoaded && sessionLinks}
        </div>
    );
}

export default Navigation;
