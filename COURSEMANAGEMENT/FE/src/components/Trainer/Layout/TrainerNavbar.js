import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../../Image/logo1.png";

//Create by: TUANTA - 02/13/2023

class TrainerNavbar extends Component {
    render() {
        return (
            <>
                <div className="navbar">
                    <div className="vung1">
                    <img className="navbar_logo_img" alt="Logo" src={logo}></img>
                    <div className="navbar_logo">
                    </div>
                    </div>
                    <div className="vung2">

                        <div className="navbar_menu">
                            <Link to="/course">
                                <button className=" btn " type="button" >
                                    <i className="fas fa-book"></i>&ensp;
                                    Courses</button>
                            </Link>
                        </div>
                        <div className="navbar_menu">
                            <Link to= "/information">
                                <button className=" btn" type="button" >

                                    <i className="fas fa-info"></i>&ensp;
                                    Personal
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default TrainerNavbar;