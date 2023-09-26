// import { googleLogout } from '@react-oauth/google';
import decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Search from './Search';
import logo from '../logo/logo.jpeg'

const AppBar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    // const user = null;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        // googleLogout();
        navigate('/')
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        // JWT ...
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
                window.location.reload();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <div className='app-bar-con'>
            <div className="logo-search">
                <Link className='app-bar-label' to='/'>
                    <h2 className='label-name'>Social</h2>
                    {/* <img src='logo.jpeg' alt='' /> */}
                    <img src={logo} alt='' />
                </Link>
                <div className="app-bar-search">
                    <Search />
                </div>
            </div>
            <div className="app-bar-nav">
                {user ? (
                    <div className="current-user">
                        <div className="user-info">
                            <img 
                                src={user.result?.imageUrl} alt="user"
                                className='user-image' 
                            />
                            {/* <p className='current-username'>
                                {user?.result?.name.charAt(0)}
                            </p> */}
                            <p className='current-username'>{user?.result?.name}</p>
                        </div>
                        <button 
                            className='reg-log-btn'
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>                
                ): (
                    <Link to='/auth' className='app-bar-label'>
                        <button 
                            className='reg-log-btn'     
                        >
                            Sign In
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default AppBar;