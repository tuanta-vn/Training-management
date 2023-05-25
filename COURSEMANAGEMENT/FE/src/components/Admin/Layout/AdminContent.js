import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import ListCourses from "../../Course/List/ListCourses";
import ListEmployees from "../../Employee/List/ListEmployees";
import RegistrationCourse from "../../Registration/RegistrationCourse";
import ListTrainers from "../../Trainer/List/ListTrainers";
//Create by: TUANTA - 02/13/2023
//Modified by:  TUANTA - 02/22/2023 - Import lại các file 
class ContentAdmin extends Component {
    render() {
        return (
            <div className="content">
                {/* Sử dụng Routes để chuyển đổi nội dung được hiển thị */}
                <Routes>
                    <Route index element ={<ListCourses/>}></Route>
                    <Route path="/coures" element={<ListCourses/>}></Route>
                    <Route path="/student" element={<ListEmployees />}></Route>
                    <Route path="/trainer" element={<ListTrainers />}></Route>
                    <Route path="/register" element={<RegistrationCourse/>}></Route>
                </Routes>
            </div>
        )
    }
}
export default ContentAdmin;