import React,{Component} from "react";
import Header from "../../common/Header";
import EmployeeNavbar from "./Layout/EmployeeNavbar";
import EmployeeContent from "./Layout/EmployeeContent";

//Create by: TUANTA - 02/13/2023

class Employee extends Component{
    render(){
        return(
            <div className="Admin">
                <div className='row g-0'>
                    <div className='col-xl-2'>
                        <EmployeeNavbar></EmployeeNavbar>
                    </div>
                    <div className='col-xl-10'>
                        <Header></Header>
                        <div className='col-xl-12'>
                           <EmployeeContent></EmployeeContent>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Employee;