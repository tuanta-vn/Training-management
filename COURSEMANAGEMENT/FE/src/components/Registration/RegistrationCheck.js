import React, { Component } from "react";

//Create by: TUANTA - 02/15/2023
//Modified by: TUANTA - 02/23/2023:
//                      + Comment lại các phương thức 
// 

class RegistrationCheck extends Component {

    constructor(props) {
        super(props);

        this.state = {
            registrations: [],
            status: 0
        }
    }

    // Xác nhận phiếu đăng ký của Học viên
    handleApprove = (EmployeeID, CourseID) => {
        const formData = {
            courseID: CourseID,
            employeeID: EmployeeID,
            status: 1
        };
        this.props.onPut(formData);
    }

    // Hủy phiếu đăng ký của Học viên
    handleCancel = (EmployeeID, CourseID) => {
        const formData = {
            courseID: CourseID,
            employeeID: EmployeeID,
            status: 0
        };
        this.props.onPut(formData);
    }

    //Hiển thị danh sách phiếu đăng ký của 1 khóa học
    renderItem = () => {
        return (
            this.props.registrations.map(registration => {
                return (
                    <tr key={registration.EmployeeID} >
                        <td>{registration.EmployeeCode}</td>
                        <td>{registration.EmployeeName}</td>
                        <td className="col-2">
                            <button
                                onClick={(e) => { this.handleApprove(registration.EmployeeID, registration.CourseID) }}
                                type="button" className="btn btn-success btn_register">Approve
                            </button>
                        </td>
                        <td className="col-2">
                            <button
                                onClick={() => { this.handleCancel(registration.EmployeeID, registration.CourseID) }}
                                type="button" className="btn btn-success btn_register unapprove">Unapprove
                            </button>
                        </td>
                    </tr>
                )
            })

        )
    }

    //render dữ liệu
    render() {
        if (this.props.showForm === false) return false;
        return (
            <>
                <div className="register_header" style={{ position: "absolute", top: '-5%', left: '50%', transform: 'translate(-50%, 0%)', zIndex: 1 }}>
                    <div className="register_table">
                        <table>
                            <thead>
                                <tr className="table_title ">
                                    <th className="col-2">EMPLOYEE CODE</th>
                                    <th className="col-3">EMPLOYEE NAME</th>
                                    <th className="col-2"></th>
                                    <th className="col-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderItem()}
                            </tbody>
                        </table>
                    </div>
                    <div className="register_btn">
                        <div>

                        </div>
                        <button
                            type="button" className="btn btn-success btn_register" onClick={this.props.hideForm}>Back
                        </button>
                    </div>

                </div>

            </>
        )
    }
}
export default RegistrationCheck;