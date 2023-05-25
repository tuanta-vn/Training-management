import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../Image/logo1.png";

//Create by: TUANTA - 02/13/2023
class AdminNavbar extends Component {
    render() {
        return (
            <div  className="navbar">
                <div className="vung1">
                <img className="navbar_logo_img" alt="Logo" src={logo}></img>
                    <div className="navbar_logo">
                    </div>
                </div>
                <div className="vung2">
                    <div className="navbar_menu">
                        <NavLink to="/coures" className="NavLinkItem">
                            <button className="btn" type="button" >
                                <i className="fas fa-book"></i>
                                &ensp;Courses
                            </button>
                        </NavLink>
                    </div>
                    <div className="navbar_menu">
                        <NavLink to="/trainer" className="NavLinkItem">
                            <button className="btn" type="button">
                                <i className="fas fa-chalkboard-teacher"></i>
                                &ensp;Trainers
                            </button>
                        </NavLink>
                    </div>
                    <div className="navbar_menu">
                        <NavLink to="/student" className="NavLinkItem">
                        <button className="btn" type="button" >
                            <i className="fas fa-users"></i>
                            &ensp;Employees</button>
                        </NavLink>
                    </div>
                    <div className="navbar_menu">
                        <NavLink to="/register" className="NavLinkItem">
                        <button className="btn" id="btn-nav" type="button" >
                            <i className="fas fa-users"></i>
                            &ensp;Registrations Check
                        </button>
                        </NavLink>
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default AdminNavbar;