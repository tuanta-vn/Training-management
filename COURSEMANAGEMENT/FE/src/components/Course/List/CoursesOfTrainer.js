import React, { Component } from "react";
import Swal from "sweetalert2";
import Common from "../../../common/Common";
import CourseResult from "./CourseResult";
import CourseServices from "../../../services/CourseServices";
import ResultServices from "../../../services/ResultServices";

//Create by: TUANTA - 02/13/2023
//Modified by: TUANTA - 02/21/2023:
//                      + Thêm comment code cho các phương thức
//                      + Thay đổi cách hiển thị thông báo
//                   - 02/22/2023:
//                      + Update Api theo file Services 
//  
class CoursesOfTrainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            courses: [],
            results:[],
            showForm : false,
            courseID: "",
            trainerID: localStorage.getItem("ID"),
            headers : { 
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
              }

        };
        this.common = new Common();
        this.courseServices = new CourseServices();
        this.resultServices = new ResultServices();
    };


    //Load dữ liệu khi gọi Component
    componentDidMount =()=>{
        this.getData();
    }

    //Lấy danh sách Khóa học theo TrainerID
    getData = () => {
        this.courseServices.getCoursesOpenOfTrainer(this.state.trainerID, this.state.headers).then((respone) => {
            this.setState({ courses: respone.data});
        }).catch((error)=>{
            Swal.fire(error.respone.data.userMsg);
        });
    };

    //Hiển thị Kết quả trong 1 khóa học
    handleShowResult = (courseID) => {
        this.resultServices.getResultsByCourseID(courseID, this.state.headers).then((respone) => {
            this.setState({ 
                showForm: true,
                results: respone.data,
                courseID: courseID
            });
        }).catch((error)=>{
            Swal.fire(error.respone.data.userMsg);

        });
    };

    // Đóng danh sách Result
    handleHideResult = () => {
        this.setState({ showForm: false });
    };

    //Cập nhật Ngày Test cho kết quả của Học viên
    handlePutDate = (formData) => {
        this.resultServices.editResult(formData, this.state.headers).then((respone) => {
            this.handleShowResult(formData.courseID);
        }).catch((error)=>{
            Swal.fire(error.respone.data.userMsg);

        });
    };

    //Cập nhật Điểm cho kết quả của Học viên
    handlePutScore = (formData) => {
        this.resultServices.editResult(formData, this.state.headers).then((respone) => {
            this.handleShowResult(formData.courseID);
        }).catch((error)=>{
            Swal.fire(error.respone.data.userMsg);

        });
    }

    //Hiển thị dữ liệu cho danh sách khóa học của Trainer
    renderItem = () => {
        return(
            this.state.courses.map((course)=>{
                return(
                    <tr key={course.CourseID} onDoubleClick={(e)=> this.handleShowResult(course.CourseID)}>
                        <td>{course.CourseCode}</td>
                        <td>{course.CourseName}</td>
                        <td>{course.TrainingTime}</td>
                        <td>{this.common.formatBindingDate(course.StartDate)}</td>
                        <td>{this.common.formatBindingDate(course.EndDate)}</td>
                    </tr>
                )
            })
        )
    }

    render() {
        return (
            <>
            <CourseResult
                showForm = {this.state.showForm}
                results = {this.state.results}
                handleHideResult = {this.handleHideResult}
                courseID = {this.state.courseID}
                putDate = {this.handlePutDate}
                putScore = {this.handlePutScore}
            />
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
                                <th className="time">TRAINING TIME</th>
                                <th className="startday">START DAY</th>
                                <th className="endday">END DAY</th>
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
export default CoursesOfTrainer;