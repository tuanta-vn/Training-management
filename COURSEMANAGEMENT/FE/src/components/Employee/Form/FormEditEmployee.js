import React,{Component} from "react";
import Common from "../../../common/Common";
import Swal from "sweetalert2";
import DepartmentServices from "../../../services/DepartmentServices";
import PositionServices from "../../../services/PositionServices";

//Create by: TUANTA - 02/13/2023
//Modified by: TUANTA - 02/22/2023:
//                      + Update Api theo file Services 
// 

class FormEditEmployee extends Component{
    constructor(props){
          super(props);

          this.state = {
              employees:[],
              departments:[],
              positions:[],
              showListDepartment: false,
              showListPosition: false,
              employeeID: this.props.employee.employeeID,
              employeeCode:this.props.employee.EmployeeCode,
              employeeName:this.props.employee.EmployeeName,
              mobilephone:this.props.employee.MobilePhone,
              email:this.props.employee.Email,
              gender:this.props.employee.Gender,
              dateOfBirth:this.props.employee.DateOfBirth,
              positionID:this.props.employee.PositionID,
              positionName:this.props.employee.PositionName,
              departmentID:this.props.employee.DepartmentID,
              departmentName:this.props.employee.DepartmentName,
              headers : { 
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
              }
        }
        
        this.common = new Common();
        this.departmentServices = new DepartmentServices();
        this.positionServices = new PositionServices();

    }

    //Show list Department to Combobox
    handleClickShowListDepartment = () => {
      this.departmentServices.getDepartments(this.state.headers).then((response) => {
        this.setState({
          showListDepartment: !this.state.showListDepartment,
          departments: response.data
      });
      });
    }

    //Get DepartmentID, DepartmentName of Selected Department
    handleClickGetDepartmentName = (department) => {
      this.setState({
        showListDepartment: false,
        departmentID: department.DepartmentID,
        departmentName: department.DepartmentName
      });
    }

    //Show list Position to Combobox
    handleClickShowListPosition = () => {
      this.positionServices.getPositions(this.state.headers).then((response) => {
        this.setState({
            showListPosition:  !this.state.showListPosition,
            positions: response.data
        });
      });
    }

    //Get PositionID, PositionName of Selected Department
    handleClickGetPositionName = (position) => {
      this.setState({
        showListPosition: false,
        positionID: position.PositionID,
        positionName: position.PositionName
      });
    }

    handleSubmit = (event) => {
      event.preventDefault();
        const formData = {
            employeeID: this.props.employee.EmployeeID,
            employeeCode: this.state.employeeCode === undefined ? this.props.employee.EmployeeCode: this.state.employeeCode,
            employeeName: this.state.employeeName === undefined? this.props.employee.EmployeeName: this.state.employeeName,
            mobilephone: this.state.mobilephone === undefined? this.props.employee.MobilePhone: this.state.mobilephone,
            email: this.state.email === undefined ?  this.props.employee.Email : this.state.email,
            gender: this.state.gender === undefined ? this.props.employee.Gender : this.state.gender,
            dateOfBirth: this.state.dateOfBirth === undefined? this.props.employee.DateOfBirth: this.common.formatBindingDate(this.state.dateOfBirth),
            positionID: this.state.positionID === undefined? this.props.employee.PositionID: this.state.positionID,
            departmentID: this.state.departmentID === undefined ? this.props.employee.DepartmentID: this.state.departmentID
        }

        let validation = {
          errMes: '',
          formIsValid: true
        }

        if(formData.email.trim() === ''){
          validation={
            errMes : "Email is required!",
            formIsValid : false
          }
        }
        else if(formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) == null){
          validation = {
            formIsValid: false,
            errMes: 'Email is invalid!'
        }
        }
        const regexPhone = /(0)+([0-9]{9})\b/g;
        if(formData.mobilephone.trim() === ''){
          validation={
            errMes : "Mobile phone is required!",
            formIsValid : false
          }
        }
  
        else if (!formData.mobilephone.match(regexPhone)) {
          validation={
            errMes : "Mobile phone is invalid!",
            formIsValid : false
          }
        }
  
        if (formData.dateOfBirth.trim() === '') {
          validation = {
            errMes : "Date of Birth is required!",
            formIsValid : false
          }
        }
        else if(this.common.getAge(formData.dateOfBirth) < 18){
          validation = {
            errMes : "The employee is not yet 18 years old!",
            formIsValid : false
          }
        }
        
        if (formData.positionID.trim() === '') {
          validation={
            errMes : "Position is required!",
            formIsValid : false
          }
        }
        if (formData.departmentID.trim() === '') {
          validation={
            errMes : "Department is required!",
          formIsValid : false
          }
        }
  
        if (formData.employeeName.trim() === '') {
          validation={
            errMes : "Employee name is not empty!",
          formIsValid: false
          }
        }
        else if(formData.employeeName.length < 3) {
          validation = {
            formIsValid : false,
            errMes : 'Employee name must be longer than 3 characters!'
          }
        }
        
        if(formData.employeeCode.trim() === ''){
          validation = {
            formIsValid : false,
            errMes : 'Employee code is not empty!'
          }
        }
        else if(formData.employeeCode.length < 3) {
          validation = {
            formIsValid : false,
            errMes : 'Employee code must be longer than 3 characters!'
          }
        }
        else if(formData.employeeCode.match("^[a-zA-Z0-9]{3,20}$") == null){
          validation = {
            formIsValid : false,
            errMes : 'Employee code cannot contain special characters!'
          }
        }

        if(!validation.formIsValid){
          Swal.fire(validation.errMes);
        }
        else{
          this.props.onPut(formData);
        }
    }
    
    // Get value from input
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

    render(){
      if (this.props.showFormEdit === false) return null;
      return(
          <div className="modal-content">
            <div className="form" id="pop_up" style={{position: 'absolute', top: '-50%', left: '50%', transform: 'translate(-50%, 0%)', zIndex: 1}}>
              <div className="form_title"> EMPLOYEE INFORMATION</div>
              <div className="form_body">
                <div className="form_item_name">{this.props.employee.EmployeeName}</div>
                <div className="form_item_content">
                <div className="form_item_content_left">

                  <div className="item_component">
                    <div className="item_component_name">Employee Code:</div>
                    <input maxLength={20} type="text" defaultValue={this.props.employee.EmployeeCode} 
                                        onChange={this.handleInputChangeEmployeeCode} 
                                         
                    />
                  </div>

                  <div className="item_component">
                    <div className="item_component_name">Employee Name:</div>
                    <input maxLength={50} type="text" defaultValue={this.props.employee.EmployeeName}  
                                        value={this.state.employeeName}  
                                        onChange={this.handleInputChangeEmployeeName} 
                    />
                  </div>

                  <div className="item_component">
                    <div className="item_component_name"> Department:</div>
                      <input type="text" defaultValue={this.props.employee.DepartmentName}
                                          onChange = {this.handleInputChangeDepartmentName}
                                          value={this.state.departmentName}
                                          readOnly />
                      <div className="to_show_list_combobox" onClick={this.handleClickShowListDepartment}><i className="fas fa-sort-down"></i></div>
                        { this.state.showListDepartment === true   &&
                          <ul className="show_list_combobox">
                            {this.state.departments.map((department) => (
                                <li key={department.DepartmentID} onClick = {() =>this.handleClickGetDepartmentName(department)}>{department.DepartmentName}</li>))}
                          </ul>
                        }
                    </div>
                
                  <div className="item_component">
                    <div className="item_component_name">Position:</div>
                      <input type="text" defaultValue={this.props.employee.PositionName} 
                                          onChange={this.handleInputChangePositionName}
                                          value={this.state.positionName}
                                          readOnly />
                      <div className="to_show_list_combobox" onClick={this.handleClickShowListPosition}><i className="fas fa-sort-down"></i></div>
                        {
                          this.state.showListPosition === true  &&
                          <ul className="show_list_combobox list_second">
                          {this.state.positions.map((position) => (
                              <li key={position.PositionID} onClick = {() =>this.handleClickGetPositionName(position)}>{position.PositionName}</li>))}
                          </ul>
                        }
                      </div>
                </div>
                <div className="form_item_content_right">
                  <div className="item_component">
                    <div className="item_component_name">Gender:</div>
                    <input style={{width:"20px", height: "20px"}} type="radio" 
                                          defaultChecked={this.props.employee.Gender === 0} 
                                          onChange={this.handleInputChangeGenderMale}  name="gender" 
                    /> Male
                    <input style={{width:"20px", height: "20px"}} type="radio" 
                                          defaultChecked={this.props.employee.Gender === 1} 
                                          onChange={this.handleInputChangeGenderFemale}  name="gender" 
                    /> Female
                    <input style={{width:"20px", height: "20px"}} type="radio" 
                                          defaultChecked={this.props.employee.Gender === 2} 
                                          onChange={this.handleInputChangeGenderOther}  name="gender" 
                    /> Other
                  </div>

                  <div className="item_component">
                    <div className="item_component_name">Date Of Birth:</div>
                    <input style={{width:'280px'}} type="date" 
                                          defaultValue={this.common.formatBindingDate(this.props.employee.DateOfBirth)} 
                                          onChange={this.handleInputChangeDateOfBirth}
                    />
                  </div>

                  <div className="item_component">
                    <div className="item_component_name">Phone:</div>
                    <input style={{width:'280px'}} type="text" 
                                          defaultValue={this.props.employee.MobilePhone} 
                                          value={this.state.mobilephone} 
                                          onChange={this.handleInputChangeMobilePhone}  
                    />
                  </div>

                  <div className="item_component">
                    <div className="item_component_name">Email:</div>
                    <input style={{width:'280px'}} type="text" 
                                          defaultValue={this.props.employee.Email} 
                                          value={this.state.email} 
                                          onChange={this.handleInputChangeEmail}  
                    />
                  </div>
              </div>
            </div>
          </div>
          <div className="item_footer">
            <button className="btn_form" type="submit" onClick={this.handleSubmit}>EDIT</button>
            <button className="btn_form" type="cancel"onClick={this.props.handleCancleFormEdit}>CANCEL</button>
          </div>
        </div>
        </div>
      );
  }
}

export default FormEditEmployee;