import React, { Component } from "react";
import Swal from "sweetalert2";
import Common from "../../../common/Common";
import CourseServices from "../../../services/CourseServices";

//Thông tin tất cả khóa học của Học viên
//Create by: TUANTA - 02/17/2023
//Modified by: TUANTA - 02/21/2023:
//                      + Thêm comment code cho các phương thức
//                      + Thay đổi cách hiển thị thông báo
//                   - 02/22/2023:
//                      + Update Api theo file Services 
//  

class CoursesInformation extends Component {
    constructor(props){
        super(props);
        this.state = {
            courses: [],
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
              }
        }
        this.common = new Common();
        this.courseServices = new CourseServices();
    }

    
    //Load dữ liệu khi gọi Component
    componentDidMount =()=>{
        this.courseServices.getCourseByEmployeeID(localStorage.getItem("ID"), this.state.headers).then((respone) => {
            this.setState({ courses: respone.data});
        }).catch((error)=>{
            Swal.fire(error.respone.data.userMsg);
        });
    }

    //Hiển thị dữ liệu cho danh sách khóa học của Trainer
    renderItem = () => {
        return(
            this.state.courses.map((course)=>{
                return(
                    <tr key={course.CourseID}>
                        <td>{course.CourseCode}</td>
                        <td>{course.CourseName}</td>
                        <td>{course.TrainingTime}</td>
                        <td>{this.common.formatBindingDate(course.StartDate)}</td>
                        <td>{this.common.formatBindingDate(course.EndDate)}</td>
                        <td>{course.Score}</td>
                    </tr>
                )
            })
        )
    }

    render() {
        return (
            <>
                <div className="content_table">
                    <div className="content_table_title">
                        <div className="table_header">
                            <h2 >Lastest courses </h2>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr className="table_title ">
                                <th className="coursesid">COURSE CODE</th>
                                <th className="coursesname">COURSE NAME</th>
                                <th className="time">DURATION</th>
                                <th className="startday">START DAY</th>
                                <th className="endday">END DAY</th>
                                <th className="endday">SCORE</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.renderItem()}
                        </tbody>
                    </table>

                </div>
            </>
        )
    }
}
export default CoursesInformation;