import React,{Component} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Common from "../../../common/Common";
import FormEditEmployee from "../Form/FormEditEmployee";
import FormAddEmployee from "../Form/FormAddEmployee";
import Pagination from "react-js-pagination";
import EmployeeServices from "../../../services/EmployeeServices";

//Create by: TUANTA - 02/13/2023
//Modified: TUANTA - 02/15/2023:
//                  + Update: Tìm kiếm, phân trang cho danh sách khóa học
//                - 02/21/2023:
//                  + Thêm comment code cho phương thức 
//                - 02/22/2023:
//                  + Update Api theo file Services 
//                
//  
class ListEmployees extends Component{

    constructor(props){
        super(props);

        this.state = {
            employees: [],
            employee: '',
            showFormAdd:false,
            showFormEdit:false,
            defaultUrl: "https://localhost:7075/api/v1/Employee",
            totalPage:1,
            pageNumber: 1,
            pageSize: 10,   
            activePage: 1,
            search:"",
            headers : { 
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
              }
        }
        this.common = new Common();
        this.employeeServices = new EmployeeServices();
    }

    // Tìm kiếm và phân trang
    // Thay đổi số trang
    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
        this.handlePaging(pageNumber, this.state.search);
    }

    //Render dữ liệu khi thay đổi số trang và giá trị tìm kiếm
    handlePaging(pageNumber, search){
        if(pageNumber !== null){
            let url = this.state.defaultUrl + "/filter?pageSize=" + this.state.pageSize + "&pageNumber=" + pageNumber;
            if(search !== ""){
                url += "&employeeFilter=" + search;
            }
            this.componentDidMount(url, search);
        }
    }

    //Lấy ra dữ liệu khi load lần đầu tiên
    getData = (url) => {
        var getAllEmployee = {
            method: 'get',
            url: url,
            headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json'
            },
        }
        axios(getAllEmployee).then((respone) =>{
            this.setState({ employees: respone.data.Data});
          })
          .catch((error) => {
              Swal.fire(error);
          });
    }

    //Lấy ra dữ liệu với giá trị tìm kiếm nếu có
    getDataSearch = (search) => {
        let url = this.state.defaultUrl +"/filter?pageSize=" + this.state.pageSize + "&pageNumber=1";
        if(search !== ""){
            url += "&employeeFilter=" + search;
        }
        var getEmployeeBySearch = {
            method: 'get',
            url: url,
            headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json'
            },
        }

        axios(getEmployeeBySearch).then((response) =>{
            this.setState({ 
                totalPage: response.data.TotalPage  
            });
        }).catch((error) => {
            Swal.fire(error);
        });
    }

    //Load dữ liệu trang
    componentDidMount = (url = this.state.defaultUrl + "/filter?pageSize="+this.state.pageSize+"&pageNumber=1", search = "") => {
        this.getData(url);
        this.getDataSearch(search);
    }

    //Axios
    //Post Employee
    handlePost = (data) => {
        this.employeeServices.addEmployee(data, this.state.headers).then((response) => {
            this.componentDidMount();
            this.setState({showFormAdd:false});
            Swal.fire("Đã thêm thành công");
        })
        .catch((error) => {
            Swal.fire(error.response.data.userMsg);
        });
    }

    //Put Employee
    handlePut = (data) => {
        this.employeeServices.editEmployee(data, this.state.headers)
        .then((response) => {
            if(response.status === 200){
                this.setState({showFormEdit: false}); 
                this.componentDidMount();
                Swal.fire("Cập nhật thành công");
            }
        })
        .catch((error) => {
            Swal.fire(error.response.data.userMsg);
        });
    }

    //Show Hide Form Add
    handleShowFormAdd = () =>{
        this.setState({ showFormAdd: true });
    }

    handleCancleFormAdd = () =>{
        this.setState({ showFormAdd: false });
    }

    //Show hide form edit
    handleEditClick = (employee) => {
        this.setState({
            showFormEdit: true,
            employee: employee
        });
    }

    handleCancleFormEdit = () =>{
        this.setState({ showFormEdit: false });
    }

    //Delete Employee
    handleDelete = (id) => {
        this.employeeServices.deleteEmployee(id, this.state.headers).then((response) => {
            this.componentDidMount();
        })
        .catch((error) => {
            Swal.fire(error.response.data.userMsg);
        });
    }

    showDeleteConfirmAlert = (id, code) => {
        Swal.fire({
            title: `Do you want to delete Employee Code = ${code}?`,
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

    //Get search value
    handleInputSearch = (event) => {
        this.setState({ search: event.target.value });
    }

    //Render item
    renderItem = () => {
        return( this.state.employees.map(
            employee => {
                return(
                <tr key={employee.EmployeeID}  onDoubleClick ={() => this.handleEditClick(employee)}>
                    <td>{employee.EmployeeCode}</td>
                    <td>{employee.EmployeeName}</td>
                    <td>{employee.GenderName}</td>
                    <td>{employee.Email}</td>
                    <td>{employee.MobilePhone}</td>
                    <td>{employee.DepartmentName}</td>
                    <td onClick={() => this.showDeleteConfirmAlert(employee.EmployeeID, employee.EmployeeCode)}><i class="fas fa-trash delete_icon"></i></td>
                </tr>
                )
            }
        ));
    }
    render() {
        return (
            <div className="content">
                {   <FormAddEmployee
                    showFormAdd = {this.state.showFormAdd}
                    handleCancleFormAdd = {this.handleCancleFormAdd}
                    onPost = {this.handlePost}
                    />
                }
                {
                    <FormEditEmployee
                    showFormEdit = {this.state.showFormEdit}
                    handleEditClick = {this.handleEditClick}
                    employee = {this.state.employee}
                    handleCancleFormEdit = {this.handleCancleFormEdit}
                    onPut = {this.handlePut}
                    />
                }
                <div className="content_title">
                    <div className="content_title_txt">
                        <span>Employee Management</span>
                    </div>
                    <div className="content_btn">
                        <button type="button" style={{width: '150px', height:'60px', fontSize:'18px', fontWeight:'bold'}} className="btn btn-primary " onClick={this.handleShowFormAdd}>ADD EMPLOYEE</button>
                    </div>
                </div>

                
                <div className="content_table">
                <div className="content_search">
                    <div className="content_search_input" >
                        <i className="fas fa-search search_icon"></i>
                        <input className="content_search_input_text" onChange={(e) => {this.handlePaging(this.state.activePage, e.target.value)}}/>
                    </div>
                </div>
                    <div className="table">
                    <table style={{cursor:"pointer"}}>
                        <thead>
                            <tr className="table_title ">
                                <th>EMPLOYEECODE</th>
                                <th>EMPLOYEE NAME</th>
                                <th>GENDER</th>
                                <th>EMAIL</th>
                                <th>PHONE</th>
                                <th>DEPARTMENT</th>
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
export default ListEmployees;