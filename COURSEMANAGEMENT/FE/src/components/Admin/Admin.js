import React, { Component } from "react";
import Header from "../../common/Header";
import AdminContent from "./Layout/AdminContent";
import AdminNavbar from "./Layout/AdminNavbar";

//Create by: TUANTA - 02/13/2023
class Admin extends Component {
    render() {
        return (
            <div className="Admin">
                <div className='row g-0'>
                    <div className='col-xl-2'>
                        <AdminNavbar></AdminNavbar>
                    </div>
                    <div className='col-xl-10'>
                        <Header></Header>
                        <div className='col-xl-12'>
                            <AdminContent></AdminContent>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Admin;