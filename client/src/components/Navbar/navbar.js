import React, {useEffect} from 'react';
import axios from "axios";
import swal from "sweetalert";
import {Link} from "react-router-dom";



const Navbar = () =>  {

    const logout = () => {
        localStorage.setItem('access_token', "");
        localStorage.setItem('scope', "");
        localStorage.setItem('token_type', "");
        localStorage.setItem('expiry_date', "");
        localStorage.setItem('id_token', "");
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ssd-navbar">
            <Link to={'/'} className="navbar-brand"> SSD Assignment</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div style={{width:"350px", display:"inline-block"}} />
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={'/'} className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        {localStorage.getItem('access_token') == "" ?
                            <Link to={'/login'} className="nav-link">Login</Link> :
                            <Link to={'/'} className="nav-link" onClick={logout}>Logout</Link> }
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;