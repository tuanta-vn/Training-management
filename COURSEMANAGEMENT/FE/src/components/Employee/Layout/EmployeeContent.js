import React,{Component} from "react";
import { Routes,Route } from "react-router-dom";
import CourseRegister from "../../Course/List/CourseRegister";
import CoursesInformation from "../../Course/List/CoursesInformation";
import EmployeePersonal from "../EmployeePersonal";

//Create by: TUANTA - 02/13/2023

class EmployeeContent extends Component{
    render(){
        return(
            <div className="content">
                <Routes>
                    <Route path="/coures" element={<CoursesInformation/>}></Route>
                    <Route path="/register_courses" element={<CourseRegister/>}></Route>
                    <Route path="/information" element={<EmployeePersonal/>}></Route>
                </Routes>
            </div>
        )
    }
}
export default EmployeeContent;