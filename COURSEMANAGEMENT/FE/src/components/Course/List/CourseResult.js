import React, { Component } from "react";
import Common from "../../../common/Common";
import Swal from "sweetalert2";


//Màn hình thay đổi điểm cho Học viên
//Create by: TUANTA - 02/17/2023
//Modified by: TUANTA - 02/21/2023:
//                      + Thêm comment code cho các phương thức
//                   
//                      
//  
class CourseResult extends Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            score: 0,
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
              }
        }
        this.common = new Common();
    }

    //Gửi thông tin update khi thay đổi điểm
    handleApproveScore = (EmployeeID, CourseID, TestDate, event) => {
        if(parseFloat(event.target.value)<0 || parseFloat(event.target.value)>10){
          Swal.fire("Score is invalid!");
        }else{

            const formData = {
                courseID: CourseID,
                employeeID: EmployeeID,
                score: parseFloat(event.target.value),
                testDate: TestDate
            }
            this.props.putScore(formData);
        }
    }

    //Gửi thông tin update khi thay đổi ngày 
    handleApproveDate = (EmployeeID, CourseID, Score, event) => {
        const formData = {
            courseID: CourseID,
            employeeID: EmployeeID,
            score: Score,
            testDate: this.common.formatBindingDate(event.target.value)
        }
        this.props.putDate(formData);
    }

    //Hiểm thị danh sách nhân viên trong khóa học
    renderItem = () => {
        return (
            this.props.results.map((result) => {
                return (
                    <tr key={result.EmployeeID}>
                        <td>{result.EmployeeCode}</td>
                        <td>{result.EmployeeName}</td>
                        <td>
                            <input defaultValue={this.common.formatBindingDate(result.TestDate)} onChange={(event) => this.handleApproveDate(result.EmployeeID, this.props.courseID, result.Score, event)} type="date"></input>
                        </td>
                        <td>
                            <input defaultValue={result.Score} onChange={(event) => this.handleApproveScore(result.EmployeeID, this.props.courseID, result.TestDate, event)} ></input>
                        </td>
                    </tr>
                )
            })
        )
    }

    render() {
        if (this.props.showForm === false) return false;
        return (
            <>
                <div className="register_header" style={{ position: "absolute", top: '-5%', left: '50%', transform: 'translate(-50%, 0%)', zIndex: 1 }}>
                    <div className="register_table">
                        <table>
                            <thead style={{position: "sticky"}}>
                                <tr className="table_title ">
                                    <th className="col-3">EMPLOYEE CODE</th>
                                    <th className="col-3">EMPLOYEE NAME</th>
                                    <th className="col-3">TEST DAY</th>
                                    <th className="col-3">SCORE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderItem()}
                            </tbody>
                        </table>
                    </div>
                    <div className="register_btn">
                        <div></div>
                        <button
                            type="button" className="btn btn-success btn_register" onClick={this.props.handleHideResult}>Back
                        </button>
                    </div>
                </div>
            </>
        )
    }
}
export default CourseResult;