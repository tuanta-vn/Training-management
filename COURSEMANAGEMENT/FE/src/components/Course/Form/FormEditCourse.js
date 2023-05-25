import React, { Component } from "react";
import Swal from "sweetalert2";
import Common from "../../../common/Common";
import TrainerServices from "../../../services/TrainerServices";
import TrainingTypeServices from "../../../services/TrainingTypeServices";

//Form sửa thông tin khóa học
//Create by: TUANTA - 02/13/2023
//Modified by: TUANTA - 02/21/2023:
//                      + Thêm comment code cho các phương thức
//                      + Thay đổi cách hiển thị thông báo
//                   - 02/22/2023:
//                      + Update Api theo file Services 
//  


class FormEditCourse extends Component {

  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      trainers: [],
      trainingTypes: [],
      showList: false,
      showListTrainingType: false,
      courseCode: null,
      courseName: null,
      startDate: null,
      endDate: null,
      des: null,
      note: null,
      trainingTypeID: null,
      trainingTypeName: null,
      trainerID: null,
      trainerName: null,
      trainingTime: null,
      status: 0,
      headers: { 
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    };
    this.common = new Common();
    this.trainerServices = new TrainerServices();
    this.trainingTypeServices = new TrainingTypeServices();
  }

  //Hiển thị danh sách Trainer
  handleClickShowListTrainer = () => {
    this.trainerServices.getTrainers(this.state.headers)
    .then((respone) => {
      this.setState({
        trainers: respone.data,
        showList: !this.state.showList
      });
    });
  }

  //Lấy TrainerID, TrainerName
  handleClickGetNameTrainer = (trainer) => {
    this.setState({
      showList: false,
      trainerName: trainer.TrainerName,
      trainerID: trainer.TrainerID
    });
  }

  //Lấy danh sách TrainingType
  handleClickShowListTrainingType = () => {
    this.trainingTypeServices.getTrainingTypes(this.state.headers)
      .then((respone) => {
        this.setState({
          trainingTypes: respone.data,
          showListTrainingType: !this.state.showListTrainingType
        });
      });
  }

  //Lấy TrainingTypeID, TrainingTypeName
  handleClickGetTrainingType = (trainingType) => {
    this.setState({
      showListTrainingType: false,
      trainingTypeID: trainingType.TrainingTypeID,
      trainingTypeName: trainingType.TrainingTypeName
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      courseID: this.props.course.CourseID,
      courseCode: this.state.courseCode === null ? this.props.course.CourseCode : this.state.courseCode,
      courseName: this.state.courseName === null ? this.props.course.CourseName : this.state.courseName,
      startDate: this.state.startDate === null ? this.props.course.StartDate : new Date(this.state.startDate),
      endDate: this.state.endDate === null ? this.props.course.EndDate : new Date(this.state.endDate),
      description: this.state.des === null ? this.props.course.Description : this.state.des,
      note: this.state.note === null ? this.props.course.Note : this.state.note,
      trainingTypeID: this.state.trainingTypeID === null ? this.props.course.TrainingTypeID : this.state.trainingTypeID,
      trainerID: this.state.trainerID === null ? this.props.course.TrainerID : this.state.trainerID,
      trainingTime: this.state.trainingTime === null ? parseFloat(this.props.course.TrainingTime) : parseFloat(this.state.trainingTime),
      status: this.state.status
    };

    let returnData={
      formIsValid : true,
      errMes : ''
    }

    console.log(formData);

    if(formData.startDate > formData.endDate){
      returnData={
        errMes : "The start date must be before the end date!",
        formIsValid : false
      }
    }

    if (formData.endDate.toString().trim() === '') {
      returnData={
        errMes : "End date is required!",
        formIsValid : false
      }
    }

    if (formData.startDate.toString().trim() === '') {
      returnData={
        errMes : "Start date is required!",
        formIsValid : false
      }
    }

    if (formData.trainingTime.toString().trim() === '') {
      returnData={
        errMes : "Training time is required!",
        formIsValid : false
      }
    }
    
    else if (formData.trainingTime.toString().match("^[0-9]{1,20}$") == null){
      returnData={
        errMes : "Training time must be numeric!",
        formIsValid : false
      }
    }

    if (formData.trainingTypeID.trim() === '') {
      returnData={
        errMes : "Training type is required!",
        formIsValid : false
      }
    }

    if (formData.trainerID.trim() === '') {
      returnData={
        errMes : "Trainer is required!",
        formIsValid : false
      }
    }

    if (formData.courseName.trim() === '') {
      returnData={
        errMes : "Course name is not empty!",
        formIsValid: false
      }
    }
    else if(formData.courseName.length < 3) {
      returnData = {
        formIsValid : false,
        errMes : 'Course name must be more than 3 characters!'
      }
    }

    if(formData.courseCode.trim()===''){
      returnData ={
        formIsValid:false,
        errMes:'Course code is required!'
       } 
    }
    else if(formData.courseCode.length < 3) {
      returnData = {
        formIsValid : false,
        errMes : 'Course code must be more than 3 characters!'
      }
    }
    else if (formData.courseCode.match("^[a-zA-Z0-9]{3,20}$") == null) {
      returnData ={
        formIsValid:false,
        errMes:'Course code must not contain special characters!'
      } 
    }

    if(!returnData.formIsValid){
      Swal.fire(returnData.errMes)
    }
    else{
      this.props.onPut(formData);
    }
  }

  //Lấy dữ liệu từ input
  handleInputChangeCourseCode = (event) => {
    this.setState({ courseCode: event.target.value });
  }
  handleInputChangeCourseName = (event) => {
    this.setState({ courseName: event.target.value });
  }
  handleInputChangeStartDate = (event) => {
    this.setState({ startDate: event.target.value });
  }
  handleInputChangeEndDate = (event) => {
    this.setState({ endDate: event.target.value });
  }
  handleInputChangeDescription = (event) => {
    this.setState({ des: event.target.value });
  }
  handleInputChangeNote = (event) => {
    this.setState({ note: event.target.value });
  }
  handleInputChangCreateDate = (event) => {
    this.setState({ createDate: event.target.value });
  }
  handleInputChangeCreateBy = (event) => {
    this.setState({ createBy: event.target.value });
  }
  handleInputChangeTrainingTime = (event) => {
    this.setState({ trainingTime: event.target.value });
  }
  handleInputChangeTrainerName = (event) => {
    this.setState({ trainerName: event.target.value });
  }
  handleInputChangeNumberOfParticipants = (event) => {
    this.setState({ numberOfPaticipants: event.target.value });
  }
  handleInputChangeTrainingTypeName = (event) => {
    this.setState({ trainingTypeName: event.target.value });
  }
  handleInputChangeStatusOn = (event) => {
    this.setState({ status: 1 });
  }
  handleInputChangeStatusOff = (event) => {
    this.setState({ status: 0 });
  }


  render() {
    if (this.props.showForm === false) return null;
    return (
      <div className="modal-content" >
        <div className="form" id="pop_up" style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translate(-50%, 0%)', zIndex: 1 }}>
          <div className="form_title">COURSE INFORMATION </div>
          <div className="form_body">
            <div className="form_item_name"> {this.props.course.CourseName}</div>
            <div className="form_item_content">
              <div className="form_item_content_left">

                <div className="item_component">
                  <div className="item_component_name"> Course Code: </div>
                  <input type="text" maxLength={20} defaultValue={this.props.course.CourseCode} onChange={this.handleInputChangeCourseCode} />
                </div>

                <div className="item_component">
                  <div className="item_component_name">Course Name:</div>
                  <input type="text" maxLength={50} defaultValue={this.props.course.CourseName} onChange={this.handleInputChangeCourseName} />
                </div>

                <div className="item_component">
                  <div className="item_component_name"> Trainer: </div>
                  <input type="text"
                    defaultValue={this.props.course.TrainerName}
                    value={this.state.trainerName}
                    onChange={this.handleInputChangeTrainerName}
                    readOnly />
                  <div className="to_show_list_combobox" onClick={this.handleClickShowListTrainer}>
                  <i className="fas fa-sort-down"></i>
                  </div>
                  {this.state.showList === true &&
                    <ul className="show_list_combobox" style={{ height: '200px', overflow: 'scroll', zIndex: 2 }}>
                      {this.state.trainers.map((trainer) => (
                        <li key={trainer.TrainerID} onClick={() => this.handleClickGetNameTrainer(trainer)}>
                          {trainer.TrainerName}
                        </li>))}
                    </ul>
                  }
                </div>

                <div className="item_component">
                  <div className="item_component_name">Participants:</div>
                  <input type="text" readOnly defaultValue={this.props.course.NumberOfParticipants === null ? 0 : this.props.course.NumberOfParticipants} onChange={this.handleInputChangeNumberOfParticipants} />
                </div>

                <div className="item_component">
                  <div className="item_component_name"> Training Type:</div>
                  <input type="text"
                    defaultValue={this.props.course.TrainingTypeName}
                    value={this.state.trainingTypeName}
                    onChange={this.handleInputChangeTrainingTypeName}
                    readOnly />
                  <div className="to_show_list_combobox" onClick={this.handleClickShowListTrainingType} >
                  <i className="fas fa-sort-down"></i>
                  </div>
                  {this.state.showListTrainingType === true &&
                    <ul className="show_list_combobox" style={{ height: '200px', overflow: 'scroll', top: "58%" }}>
                      {this.state.trainingTypes.map((trainingType) => (
                        <li key={trainingType.TrainingTypeID} onClick={() => this.handleClickGetTrainingType(trainingType)} >
                          {trainingType.TrainingTypeName}
                        </li>))}
                    </ul>
                  }
                </div>
                <div className="item_component">
                  <div className="item_component_name">Status:</div>
                  <input type="radio" style={{ width: "20px", height: "20px" }} defaultChecked={this.props.course.Status === 1} name="status" onChange={this.handleInputChangeStatusOn} />OPEN
                  <input type="radio" style={{ width: "20px", height: "20px" }} defaultChecked={this.props.course.Status === 0} name="status" onChange={this.handleInputChangeStatusOff} /> CLOSE
                </div>
              </div>
              <div className="form_item_content_right">
                <div className="item_component">
                  <div className="item_component_name">Training Time:</div>
                  <input type="number" defaultValue={this.props.course.TrainingTime} onChange={this.handleInputChangeTrainingTime} />
                </div>

                <div className="item_component">
                  <div className="item_component_name">Start Day:
                  </div>
                  <input type="date" style={{width:'185px'}} defaultValue={this.common.formatBindingDate(this.props.course.StartDate)} onChange={this.handleInputChangeStartDate} />
                </div>

                <div className="item_component">
                  <div className="item_component_name">End Day:</div>
                  <input type="date" style={{width:'185px'}} defaultValue={this.common.formatBindingDate(this.props.course.EndDate)} onChange={this.handleInputChangeEndDate} />
                </div>

                <div className="item_component">
                  <div className="item_component_name"> Description:</div>
                  <input type="text" maxLength={100} defaultValue={this.props.course.Description} onChange={this.handleInputChangeDescription} />
                </div>

                <div className="item_component">
                  <div className="item_component_name">Note:</div>
                  <input type="text" maxLength={100} defaultValue={this.props.course.Note} onChange={this.handleInputChangeNote} />
                </div>
              </div>
            </div>
          </div>
          <div className="item_footer">
            <button className="btn_form" type="submit" onClick={this.handleSubmit}>EDIT</button>
            <button className="btn_form" type="cancel" onClick={this.props.handleEditClick}>CANCEL</button>
          </div>
        </div>
      </div>
    );
  }
}
export default FormEditCourse;