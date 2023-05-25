import React,{Component} from "react";
import Swal from "sweetalert2";
import EmployeeServices from "../../services/EmployeeServices";

//Create by: TUANTA - 02/17/2023
//Modified by TUANTA - 02/23/2023
//                   + Thay đổi phương thức thông báo 
//                   + Update Api theo file Services 
//

class EmployeePersonal extends Component{

    constructor(props){
        super(props);
        this.state = {
            employee: {},
            headers : { 
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
              }
        }
        this.employeeServices = new EmployeeServices();
    }

    componentDidMount = () => {
        this.employeeServices.getEmployeeByID(localStorage.getItem("ID"), this.state.headers).then((respone) => {
            this.setState({ employee: respone.data});
        }).catch((error)=>{
            Swal.fire(error.respone.data.userMsg);
        })
    }

    renderItem = () => {
        return(
            <><ul>
                <li>
                    CODE :
                    <input defaultValue={this.state.employee.EmployeeCode} disabled></input>
                </li>
                <li>
                    NAME :
                    <input defaultValue={this.state.employee.EmployeeName} disabled></input>
                </li>
                <li>
                    DEPARTMENT :
                    <input defaultValue={this.state.employee.DepartmentName} disabled></input>
                </li>
                <li>
                    POSITION :
                    <input defaultValue={this.state.employee.PositionName} disabled></input>
                </li>
            </ul>
            <ul>
                    <li>
                        GMAIL :
                        <input defaultValue={this.state.employee.Email} disabled></input>
                    </li>
                    <li>
                        PHONE :
                        <input defaultValue={this.state.employee.MobilePhone} disabled></input>
                    </li>
                    <li>
                        BIRTHDAY :
                        <input value={this.state.employee.DateOfBirth} disabled></input>
                    </li>
                    <li>
                        GENDER :
                        <input defaultValue={this.state.employee.Gender === 0 ? "Male" : "Female"} disabled></input>
                    </li>
                </ul>
                </>
        )
    }

    render(){
        return(
            <>
            <div className="information">
                <div className="information_title">
                <h1>EMPLOYEE INFORMATION</h1>
                </div>
                <div className="information_content">
                    {this.renderItem()}
                </div>
            </div>
            </>
        )
    }
}
export default EmployeePersonal;