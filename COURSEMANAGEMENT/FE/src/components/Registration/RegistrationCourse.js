import React,{Component} from "react";
import Swal from "sweetalert2";
import Common from "../../common/Common";
import RegistrationCheck from "./RegistrationCheck";
import CourseServices from "../../services/CourseServices";
import RegistrationServices from "../../services/RegistrationServices";


//Admin xem các khóa học đang mở
//Create by: TUANTA - 02/15/2023
//Modified by: TUANTA - 02/23/2023:
//                      + Comment lại các phương thức 
//                      + Thay đổi cách thông báo
//                      + Thay đổi APi theo Services

class RegistrationCourse extends Component{

    constructor(props){
        super(props);

        this.state = {
            courses: [],
            registrations:[],
            showForm: false,
            
            headers :{ 
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        }
        this.common = new Common();
        this.courseServices = new CourseServices();
        this.registrationServices = new RegistrationServices();
    }

    // Lấy danh sách Khóa học đang mở
    componentDidMount = () => {
       this.courseServices.getCoursesOpen(this.state.headers).then((respone) => {
            this.setState({ courses: respone.data });
        });
    }

    //Cập nhật thông tin phiếu đăng ký của Học viên
    handlePut = (formData) => {
        this.registrationServices.editRegistration(formData, this.state.headers).then((respone) => {
            this.componentDidMount();
            this.registrationServices.getRegistrationsByCourseID(formData.courseID, this.state.headers)
            .then((respone) => {
                this.setState({ registrations: respone.data});
            })
            .catch((error) =>{            
                Swal.fire(error.respone.data.userMsg);
            });
            })
        .catch((error) => {
            Swal.fire(error.respone.data.userMsg);
        });
    }

    //Hiển thị danh sách phiếu đăng ký theo Khóa học
    handleShowList = (course) => {
        this.setState({ showForm: true});
        this.registrationServices.getRegistrationsByCourseID(course.CourseID, this.state.headers)
        .then((respone) => {
            this.setState({ registrations: respone.data});
        })
        .catch((error) =>{
            Swal.fire(error.respone.data.userMsg);
        });
    }

    // Đóng danh sách phiếu đăng ký theo Khóa học
    handleCloseList = () => {
        this.setState({ showForm: false});
    }

    //Hiển thị danh sách khóa học đang mở đăng ký
    renderItem = () => {
        return(
            this.state.courses.map(course => {
                return(
                <tr key={course.CourseID} onDoubleClick ={() => this.handleShowList(course)}>
                    <td>{course.CourseCode}</td>
                    <td>{course.CourseName}</td>
                    <td>{course.TrainerName}</td>
                    <td>{course.TrainingTypeName}</td>
            {course.NumberOfParticipants !== null ? <td>{course.NumberOfParticipants}/10</td> : <td>0/10</td>}

                </tr>
                )
            })
        );
    }

    render(){
        return(
            <>
            <div className="content_title">
                <div className="content_title_txt"></div>
                <div className="content_btn"></div>
            </div>
            <div className="content_table">
                <div className="content_table_title">
                    <div className="table_header">
                    <h2 >Lastest Register </h2> 
                    </div>
                </div>
                <table>
                    <thead>
                        <tr className="table_title ">
                            <th className="coursesid">COURSE CODE</th>
                            <th className="coursesname">COURSE NAME</th>
                            <th className="participants">TRAINER</th>
                            <th className="participants">TRAINING TYPE</th>
                            <th className="participants">PARTICIPANTS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderItem()}
                    </tbody>
                    
                </table>
                    <RegistrationCheck
                        showForm = {this.state.showForm}
                        registrations = {this.state.registrations}
                        onPut = {this.handlePut}
                        hideForm = {this.handleCloseList}
                    />
                    
            </div>
            </>
        )
    }
}
export default RegistrationCourse;