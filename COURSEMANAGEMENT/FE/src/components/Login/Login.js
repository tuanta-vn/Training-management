import React, { Component } from "react";
import Swal from "sweetalert2";
import Admin from "../Admin/Admin";
import Employee from "../Employee/Employee";
import Trainer from "../Trainer/Trainer";
import jwtDecode from "jwt-decode";
import AdminServices from "../../services/AdminServices"

// Create by:TUANTA - 02/15/2023
//	Modified by:TUANTA-02/21/2023:
//                          + thêm comment code cho các phương thức
//                          + thay đổi cách hiện thị thông báo
//                          + thêm validate cho form 
class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            "userName": "",
            "passWord": "",
            "isLogin": false,
            "role":""
        }
        this.adminServices = new AdminServices();
    }

    // setparams 
    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    // lấy dữ liệu username từ input
    handleUserName = (event) => {
        this.setState({
            userName: event.target.value
        })
    }

    // lấy dữ liệu password từ input
    handlePassword = (event) => {
        this.setState({
            passWord: event.target.value
        })
    }

    // Validate input
    handleValidation = () => {
        let returnData = {
            formIsValid: true,
            errMes: ''
        }
        if (this.state.userName.trim() === '') {
            returnData = {
                errMes: "Username is not empty!",
                formIsValid: false
            }
        }
        else if (this.state.passWord.trim() === '') {
            returnData = {
                errMes: "Password is not empty!",
                formIsValid: false
            }
        }
        return returnData;
    }

    // Login data
    login = (event) => {
        event.preventDefault();
        const valiadtion = this.handleValidation();
        if (!valiadtion.formIsValid) {
            Swal.fire(valiadtion.errMes);
        }
        else {
            const formData = {
                userName: this.state.userName,
                passWord: this.state.passWord
            }

            this.adminServices.login(formData)
                .then((response) => {
                    const decode = jwtDecode(response.data.token)
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("role", decode.role);
                    localStorage.setItem("ID", decode.userID);
                    localStorage.setItem("UserName", decode.unique_name);
                    this.setState({
                        isLogin: true,
                        role: decode.role
                    });
                })
                .catch((error) => {
                    Swal.fire("Invalid account information or password!")
                });
        }
    }

    render() {
        if(this.state.isLogin){
            if(localStorage.getItem("role") === "admin"){
                return(
                    <Admin key={localStorage.getItem("role")}></Admin>
                )
            }
            else if(localStorage.getItem("role") ==="employee"){
                return(
                    <Employee key={localStorage.getItem("role")}></Employee>
                )
            }
            else if(localStorage.getItem("role")==="trainer"){
                return(
                    <Trainer key={localStorage.getItem("role")}> </Trainer>
                )
            }
        }
        else {
            return (

                <div className="login_main">
                    <div className="content">
                        <div className="login">
                            <div className="login_content">
                                <h1>Login</h1>
                                <form className="p-3 mt-3" >
                                    <div className="form-field align-items-center">
                                        <input type="text"
                                            name="userName"
                                            id="userName"
                                            value={this.state.userName}
                                            onChange={this.handleUserName}
                                            placeholder="Username"
                                        />
                                    </div>
                                    <div className="form-field align-items-center">
                                        <input type="password"
                                            name="password"
                                            id="password"
                                            value={this.state.passWord}
                                            onChange={this.handlePassword}
                                            placeholder="Password"
                                        />
                                    </div>
                                    <div>
                                        <button type="button" id="btn_nav" className="btn mt-3 login" name="Login" onClick={this.login}>Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default Login;