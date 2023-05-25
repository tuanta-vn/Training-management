import React,{Component} from "react";
import Swal from "sweetalert2";
import Common from "../../../common/Common";
import DepartmentServices from "../../../services/DepartmentServices"
import PositionServices from "../../../services/PositionServices"

//Create by: TUANTA - 02/13/2023
//Modified by: TUANTA - 02/22/2023:
//                      + Thay đổi cách thông báo
//                      + Update Api theo file Services 
//    
class FormAddEmployee extends Component{
    constructor(props){
          super(props);

          this.state = {
              departments:[],
              positions:[],
              showListDepartment: false,
              showListPosition: false,
              employeeCode:'',
              employeeName:'',
              mobilephone:'',
              email:'',
              gender:0,
              dateOfBirth:"",
              positionID:'',
              positionName:'',
              departmentID:'',
              departmentName:'',
              errorMessage:'',
              headers : { 
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
              }
        }
        this.common = new Common();
        this.departmentServices = new DepartmentServices();
        this.positionServices = new PositionServices();
    }

    // Lấy dữ liệu từ input
    handleInputChangeEmployeeCode = (event) => {
      this.setState({ employeeCode: event.target.value});
    }
    handleInputChangeEmployeeName = (event) => {
      this.setState({ employeeName: event.target.value});
    }
    handleInputChangeMobilePhone = (event) => {
      this.setState({ mobilephone: event.target.value});
    }
    handleInputChangeEmail = (event) => {
      this.setState({ email: event.target.value});
    }
    handleInputChangeGenderMale = (event) => {
      this.setState({ gender: 0});
    }
    handleInputChangeGenderFemale = (event) => {
      this.setState({ gender: 1});
    }
    handleInputChangeGenderOther = (event) => {
      this.setState({ gender: 2});
    }
    handleInputChangeDateOfBirth = (event) => {
      this.setState({ dateOfBirth: event.target.value});
    }
    handleInputChangePositionName = (event) => {
      this.setState({ positionName: event.target.value});
    }
    handleInputChangeDepartmentName = (event) => {
      this.setState({ departmentName: event.target.value});
    }

    //Hiển thị danh sách Phòng ban vào Combobox
    handleClickShowListDepartment = () => {
      this.departmentServices.getDepartments(this.state.headers).then((response) => {
        this.setState({
          showListDepartment: !this.state.showListDepartment,
          departments: response.data
      });
      });
    }

    //Lấy ra DepartmentID, DepartmentName của Phòng ban được chọn
    handleClickGetDepartmentName = (department) => {
      this.setState({
        showListDepartment: false,
        departmentID: department.DepartmentID,
        departmentName: department.DepartmentName
      });
    }

    //Hiển thị danh sách Vị trí vào Combobox
    handleClickShowListPosition = () => {
      this.positionServices.getPositions(this.state.headers).then((response) => {
        this.setState({
            showListPosition:  !this.state.showListPosition,
            positions: response.data
        });
      });
    }

    //Lấy PositionID, PositionName của vị trí được chọn
    handleClickGetPositionName = (position) => {
      this.setState({
        showListPosition: false,
        positionID: position.PositionID,
        positionName: position.PositionName
      });
    }
    


    //Kiểm tra dữ liệu nhập vào
    checkValidationForm = () => {
      let returnData = {
        formIsValid : true,
        errMes : ''
      }

      if(this.state.email.trim() === ''){
        returnData={
          errMes : "Email is required!",
          formIsValid : false
        }
      }

      else if(this.state.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) == null){
        returnData = {
          formIsValid: false,
          errMes: 'Email is invalid!'
      }
      }
      const regexPhone = /(0)+([0-9]{9})\b/g;
      if(this.state.mobilephone.trim() === ''){
        returnData={
          errMes : "Mobile phone is required!",
          formIsValid : false
        }
      }

      else if (!this.state.mobilephone.match(regexPhone)) {
        returnData={
          errMes : "Mobile phone is invalid!",
          formIsValid : false
        }
      }

      if (this.state.dateOfBirth.trim() === '') {
        returnData = {
          errMes : "Date of Birth is required!",
          formIsValid : false
        }
      }
      else if(this.common.getAge(this.state.dateOfBirth) < 18){
        returnData = {
          errMes : "Employee is not yet 18 years old!",
          formIsValid : false
        }
      }
      
      if (this.state.positionID.trim() === '') {
        returnData={
          errMes : "Position is required!",
          formIsValid : false
        }
      }
      if (this.state.departmentID.trim() === '') {
        returnData={
          errMes : "Department is required!",
        formIsValid : false
        }
      }

      if (this.state.employeeName.trim() === '') {
        returnData={
          errMes : "Employee name is not empty!",
        formIsValid: false
        }
      }
      else if(this.state.employeeName.length < 3) {
        returnData = {
          formIsValid : false,
          errMes : 'Employee name must be longer than 3 characters!'
        }
      }
      if(this.state.employeeCode.trim() === ''){
        returnData = {
          formIsValid : false,
          errMes : 'Employee code is not empty!'
        }
      }
      else if(this.state.employeeCode.length < 3) {
        returnData = {
          formIsValid : false,
          errMes : 'Employee code must be longer than 3 characters!'
        }
      }
      else if(this.state.employeeCode.match("^[a-zA-Z0-9]{3,20}$") == null){
        returnData = {
          formIsValid : false,
          errMes : 'Employee code cannot contain special characters!'
        }
      }
      return returnData;
    }

    //Reset các trường dữ liệu
    clearInput = () => {
      this.setState({
        employeeCode: '',
        employeeName: '',
        mobilephone: '',
        email: '',
        gender: 0,
        dateOfBirth: '',
        positionID: '',
        positionName: '',
        departmentID: '',
        departmentName: ''
      });
    }

    //Gửi dữ liệu
    handleSubmit = (event) => {
      event.preventDefault();
    
      const validation= this.checkValidationForm();
       if (!validation.formIsValid) {
        Swal.fire(validation.errMes);
      }
      else {
        const formData = {
          employeeCode: this.state.employeeCode.toLocaleUpperCase(),
          employeeName: this.state.employeeName,
          mobilephone: this.state.mobilephone,
          email: this.state.email,
          gender: this.state.gender,
          dateOfBirth: this.state.dateOfBirth,
          positionID: this.state.positionID,
          departmentID: this.state.departmentID,
          createBy: localStorage.getItem("UserName")
        }
        this.props.onPost(formData);
        this.clearInput();
      }
    }

    render(){
      if (this.props.showFormAdd === false) return null;
      
      return(
          <div className="modal-content" >
          <div className="form" id="pop_up" style={{position: 'absolute', top: '-50%', left: '50%', transform: 'translate(-50%, 0%)', zIndex: 1}}
          >
          <div className="form_title">
            EMPLOYEE INFORMATION
          </div>
          <div className="form_body">
            <div className="form_item_name">
              {this.state.employeeName}
            </div>
            <div className="form_item_content">
              <div className="form_item_content_left">
                <div className="item_component">
                  <div className="item_component_name">
                    Employee Code:
                  </div>
                  <input type="text" maxLength={20} value={this.state.employeeCode} onChange={this.handleInputChangeEmployeeCode}  />
                </div>
                <div className="item_component">
                  <div className="item_component_name">
                    Employee Name:
                  </div>
                  <input type="text" maxLength={50} value={this.state.employeeName}  onChange={this.handleInputChangeEmployeeName} />
                </div>
                <div className="item_component">
                  <div className="item_component_name">
                    Department:
                  </div>
                  <input type="text"
                              onChange = {this.handleInputChangeDepartmentName}
                              value={this.state.departmentName}
                              readOnly
                              />
                  <div className="to_show_list_combobox" 
                              onClick={this.handleClickShowListDepartment}
                              ><i className="fas fa-sort-down"></i>
                  </div>
                  {
                    this.state.showListDepartment === true   &&
                   
                     <ul className="show_list_combobox" style={{ height: '200px', overflow: 'scroll' }}>
                     {this.state.departments.map((department) => (
                        <li key={department.DepartmentID} 
                            onClick = {() =>this.handleClickGetDepartmentName(department)}
                            >
                              {department.DepartmentName}
                        </li>
                     ))}
                   </ul>
                  }
                </div>
                
                <div className="item_component">
                  <div className="item_component_name">
                  Position:
                  </div>
                  <input type="text" 
                              value={this.state.positionName} 
                              onChange={this.handleInputChangePositionName}
                              readOnly />
                  <div className="to_show_list_combobox" 
                              onClick={this.handleClickShowListPosition}
                              ><i className="fas fa-sort-down"></i>
                  </div>
                  {
                    this.state.showListPosition === true  &&
                     <ul className="show_list_combobox list_second" style={{ height: '200px', overflow: 'scroll' }}>
                     {this.state.positions.map((position) => (
                        <li key={position.PositionID} 
                            onClick = {() =>this.handleClickGetPositionName(position)}
                            >
                              {position.PositionName}
                        </li>
                     ))}
                   </ul>
                  }
                </div>
              </div>
              <div className="form_item_content_right">
                <div className="item_component">
                  <div className="item_component_name">
                    Gender:
                  </div>
                  <input style={{width:"20px", height: "20px"}} type="radio" onChange={this.handleInputChangeGenderMale} defaultChecked={true}  name="gender" /> Male
                  <input style={{width:"20px", height: "20px"}} type="radio" onChange={this.handleInputChangeGenderFemale}  name="gender" /> Female
                  <input style={{width:"20px", height: "20px"}} type="radio" onChange={this.handleInputChangeGenderOther}  name="gender" /> Other
                </div>
                <div className="item_component">
                  <div className="item_component_name">
                    Date Of Birth:
                  </div>
                  <input style={{width:'280px'}} type="date" value={this.state.dateOfBirth} onChange={this.handleInputChangeDateOfBirth}/>
                </div>
                <div className="item_component">
                  <div className="item_component_name">
                    Phone:
                  </div>
                  <input style={{width:'280px'}} maxLength={10} type="text" value={this.state.mobilephone} onChange={this.handleInputChangeMobilePhone}  />
                </div>
                <div className="item_component">
                  <div className="item_component_name">
                    Email:
                  </div>
                  <input style={{width:'280px'}} maxLength={30} type="text" value={this.state.email} onChange={this.handleInputChangeEmail}  />
                </div>
                
              </div>
            </div>
          </div>
          <div className="item_footer">
            <button className="btn_form" type="submit" onClick={this.handleSubmit}>ADD</button>
            <button className="btn_form" type="cancel"onClick={() => {this.props.handleCancleFormAdd(); this.clearInput()}}>CANCEL</button>
          </div>
        </div>
        </div>
      );
  }
}

export default FormAddEmployee;