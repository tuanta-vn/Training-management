import React, { Component } from "react";
import Swal from "sweetalert2";
import Common from "../../../common/Common";
import CourseServices from "../../../services/CourseServices";
import RegistrationServices from "../../../services/RegistrationServices";

//Màn hình Học viên đăng ký khóa học đang mở
//Create by: TUANTA - 02/17/2023
//Modified by: TUANTA - 02/21/2023:
//                      + Thêm comment code cho các phương thức
//                      + Thay đổi cách hiển thị thông báo
//                   - 02/22/2023:
//                      + Update Api theo file Services
//
class CourseRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    this.common = new Common();
    this.courseServices = new CourseServices();
    this.registrationServices = new RegistrationServices();
  }

  //Lấy danh sách Course đang mở đăng ký
  componentDidMount = () => {
    this.courseServices.getCourseToRegis(localStorage.getItem("ID"), this.state.headers).then((respone) => {
      this.setState({ courses: respone.data });
    });
  };

  // Sinh viên nhấn đăng ký khóa học
  handlePost = (courseID) => {
    const formData = {
      courseID: courseID,
      employeeID: localStorage.getItem("ID"),
    };
    console.log(formData);
    this.registrationServices
      .addRegistration(formData, this.state.headers)
      .then((respone) => {
        if (respone.status === 200) {
          this.componentDidMount();
          Swal.fire("Course registration successful! Pending approval...");
        }
      })
      .catch((error) => {
        Swal.fire(error.response.data.userMsg);
      });
  };

  //Hiển thị danh sách khóa học
  renderItem = () => {
    if (this.state.courses.length === 0) {
      return (
        <tr>
          <td colSpan={6}>You cannot register for courses for this quarter!</td>
        </tr>
      );
    } else {
      return this.state.courses.map((course) => {
        return (
          <tr key={course.CourseID}>
            <td>{course.CourseCode}</td>
            <td>{course.CourseName}</td>
            <td>{course.TrainingTime}</td>
            <td>{this.common.formatBindingDate(course.StartDate)}</td>
            <td>{this.common.formatBindingDate(course.EndDate)}</td>
            {course.NumberOfParticipants !== null ? <td>{course.NumberOfParticipants}/10</td> : <td>0/10</td>}
            {course.NumberOfParticipants >= 10 ? (
              <td>
                <button
                  type="button"
                  className="btn btn-secondary btn_register"
                  disabled
                >
                  Register
                </button>
              </td>
            ) : (
              <td>
                <button onClick={() => 
                    this.handlePost(course.CourseID)
                  } type="button" className="btn btn-success btn_register">
                  Register
                </button>
              </td>
            )}
            {/* <td>
              <button
                onClick={() => {
                  this.handlePost(course.CourseID);
                }}
                type="button"
                className="btn btn-success btn_register"
              >
                Register
              </button>
            </td> */}
          </tr>
        );
      });
    }
  };

  render() {
    return (
      <>
        <div className="content_table">
          <div className="content_table_title">
            <div className="table_header">
              <h2>Lastest courses </h2>
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
                <th className="participants">PARTICIPANTS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.renderItem()}</tbody>
          </table>
        </div>
      </>
    );
  }
}
export default CourseRegister;
