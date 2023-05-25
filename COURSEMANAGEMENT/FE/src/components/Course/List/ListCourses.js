import React, { Component } from "react";
import axios from "axios";
import Common from "../../../common/Common";
import FormAddCourse from "../Form/FormAddCourse";
import FormEditCourse from "../Form/FormEditCourse";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
import CourseServices from "../../../services/CourseServices";

//Create by: TUANTA - 02/13/2023
//Modified: TUANTA - 02/15/2023:
//                  + Update: Tìm kiếm, phân trang cho danh sách khóa học
//                - 02/21/2023:
//                  + Thêm comment code cho phương thức 
//                - 02/22/2023:
//                  + Update Api theo file Services 
//                
//                
// Hiển thị danh sách khóa học
class ListCourses extends Component {
    constructor(props){
        super(props);
        this.state = {
            courses: [],
            course: '',
            showForm: false,
            showFormAdd: false,
            defaultUrl: "https://localhost:7075/api/v1/Course",
            totalPage:1,
            pageNumber:1,
            pageSize:10,
            activePage:1,
            search:"",
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
              }
        };
        this.common = new Common();
        this.courseServices = new CourseServices();
    }

    //Lấy ra vị trí trang hiển thị
    handlePageChange = (pageNumber) =>{
        this.setState({ activePage: pageNumber});
        this.handlePaging(pageNumber,this.state.search);
    }

    //Lấy danh sách theo số trang
    handlePaging = (pageNumber, search) => {
        if(pageNumber !== null){
            let url = this.state.defaultUrl + "/filter?pageSize=" + this.state.pageSize + "&pageNumber=" + pageNumber;
            if(search !== ""){
                url += "&courseFilter=" + search;
            }
            this.componentDidMount(url,search);
        }
    }

    //Api lấy danh sách course
    getData = (url) =>{
        var getAllCourse = {
            method: 'get',
            url: url,
            headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json'
            },
        }
        axios(getAllCourse).then((response) =>{
            this.setState({ courses: response.data.Data });
        })
        .catch((error) =>{
            Swal.fire(error);
        });
    }

    //Api lấy danh danh sách khóa học với tìm kiếm, phân trang
    getDataSearch = (search) => {
        let url = this.state.defaultUrl + "/filter?pageSize=" + this.state.pageSize +"&pageNumber=1";
        if(search !== ""){
            url += "&courseFilter=" + search;
        }

        var getCourseBySearch = {
            method: 'get',
            url: url,
            headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json'
            },
        }

        axios(getCourseBySearch).then((response) =>{
            this.setState({ totalPage: response.data.TotalPage });
        })
        .catch((error) =>{
            Swal.fire(error);
        });
    }

    //Lấy giá trị tìm kiếm
    handleInputSearch = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    //Load Data
    componentDidMount = (url = this.state.defaultUrl + "/filter?pageSize="+this.state.pageSize+"&pageNumber=1", search = "") =>{
        this.getData(url);
        this.getDataSearch(search);
    }

    //Thêm khóa học
    handlePost = (data) => {
        this.courseServices.addCourse(data, this.state.headers).then((response) => {
            if(response.status === 200){
                this.setState({
                    showFormAdd: false
                });
                Swal.fire("Đã thêm thành công");
                this.componentDidMount();
            }
        }).catch((error) => {
            Swal.fire({title: error.response.data.userMsg});
        });
    }

    //Sửa thông tin khóa học
    handlePut = (data) => {
        this.courseServices.editCourse(data, this.state.headers).then((response) => {
            if(response.status === 200){
                this.setState({showForm: false});
                this.componentDidMount();
                Swal.fire({title: "Đã cập nhật thành công!"});
            }
        }).catch((error) => {
        Swal.fire({title: error.response.data.userMsg});
        });
    }
    //Xóa thông tin khóa học
    handleDelete = (id) => {
        this.courseServices.deleteCourse(id, this.state.headers).then((response) => {
            if(response.status === 200){
                this.componentDidMount();
            }
        }).catch((error) => {
        Swal.fire({title: error.response.data.userMsg});
        });
    }

    showDeleteConfirmAlert = (id, code) => {
        Swal.fire({
            title: `Do you want to delete Course Code = ${code}?`,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: 'red'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.handleDelete(id)
            }
          })
      }

    //Hiển thị, đóng form Thêm khóa học
    handleShowHideFormAdd = () => {
        this.setState({
          showFormAdd: !this.state.showFormAdd    
        });
    }

    //Click hiển thị Form Sửa khóa học
    handleEditClick = (course) => {
    this.setState({
        showForm: !this.state.showForm,
        course: course
        });
    }

    //Hiển thị danh sách khóa học
    renderItem = () => {
        return(
            this.state.courses.map((course) => {
                return(
                <tr key={course.CourseID} onDoubleClick={() => this.handleEditClick(course)}>
                    <td>{course.CourseCode}</td>
                    <td style={{textAlign:"left"}} ><div className="CourseName">{course.CourseName}</div></td>
                    {
                        course.NumberOfParticipants !== null ? <td>{course.NumberOfParticipants}</td> : <td>0</td>
                    }
                    <td>{course.TrainingTime}</td>
                    <td>{this.common.formatBindingDate(course.StartDate)}</td>
                    <td>{this.common.formatBindingDate(course.EndDate)}</td>
                    <td onClick={() => this.showDeleteConfirmAlert(course.CourseID, course.CourseCode)}><i class="fas fa-trash delete_icon"></i></td>
                </tr>
                );})
            );
    }

    render() {
        return (
            <div className="content">
                {
                    <FormAddCourse
                    showFormAdd = {this.state.showFormAdd}
                    handleShowHideFormAdd = {this.handleShowHideFormAdd}
                    updateTable = {this.componentDidMount}
                    onPost = {this.handlePost}
                    />
                }
                {
                    <FormEditCourse
                    showForm = {this.state.showForm}
                    course = {this.state.course}
                    handleEditClick = {this.handleEditClick}
                    onPut = {this.handlePut}
                    />
                }
                
                <div className="content_title">
                    <div className="content_title_txt">
                        <span>Courses Management</span>
                    </div>
                    <div className="content_btn">
                        <button type="button" style={{width: '150px', height:'60px', fontSize:'20px', fontWeight:'bold'}} className="btn btn-primary " onClick={this.handleShowHideFormAdd}>ADD COURSE</button>
                    </div>
                </div>

                
                <div className="content_table">
                <div className="content_search">
                    <div className="content_search_input">
                        <i className="fas fa-search search_icon"></i>
                        <input className="content_search_input_text" onChange={(e) => {this.handlePaging(this.state.activePage, e.target.value)}} >
                        </input>
                    </div>
                </div>
                   <div className="table">
                   <table>
                        <thead className="table_title ">
                            <tr >
                                <th className="coursesCode">COURSE CODE</th>
                                <th className="coursesname">COURSE NAME</th>
                                <th className="participants">PARTICIPANTS</th>
                                <th className="time">TRAINING TIME</th>
                                <th className="startday">START DAY</th>
                                <th className="endday">END DAY</th>
                                <th></th>
                            </tr>
                        </thead>
                            <tbody>
                                {this.renderItem()}
                            </tbody>
                    </table>
                   </div>
                  
                   
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.pageSize}
                            totalItemsCount={this.state.totalPage * this.state.pageSize}
                            pageRangeDisplayed={3}
                            onChange={this.handlePageChange.bind(this)}
                        />
                </div>
            </div>
        )
    }
}
export default ListCourses;