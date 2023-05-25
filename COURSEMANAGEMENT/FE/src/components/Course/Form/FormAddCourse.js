import React,{Component} from "react";
import Swal from "sweetalert2";
import Common from "../../../common/Common";
import TrainerServices from "../../../services/TrainerServices";
import TrainingTypeServices from "../../../services/TrainingTypeServices";

//Form nhập thông tin khóa học
//Create by: TUANTA - 02/13/2023
//Modified by: TUANTA - 02/21/2023:
//                      + Thêm comment code cho các phương thức
//                      + Thay đổi cách hiển thị thông báo
//                   - 02/22/2023:
//                      + Update Api theo file Services 
//   
class FormAddCourse extends Component{
                   
    constructor(props){
        super(props);

        this.state = {
            trainers: [],
            showList: false,
            trainingTypes: [],
            showListTrainingType: false,
            courseCode:"",
            courseName: "",
            startDate: "",
            endDate: "",
            des: "",
            note: "",
            trainingTypeID: "",
            trainingTypeName:"",
            trainerID: "",
            trainerName:"",
            trainingTime: "",
            status:1,
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
      this.trainerServices.getTrainers(this.state.headers).then((res) => {
        this.setState({
            trainers: res.data,
            showList:!this.state.showList
        });
      });
    }

    //Click lấy TrainerID, TrainerName
    handleClickGetNameTrainer = (trainer) =>{
       this.setState({
          showList: false,
          trainerID: trainer.TrainerID,
          trainerName: trainer.TrainerName
       });
    }

    //Hiển thị danh sách TrainingType
    handleClickShowListTrainingType = () =>{
      this.trainingTypeServices.getTrainingTypes(this.state.headers)
      .then((respone) => {
        this.setState({
          trainingTypes: respone.data,
          showListTrainingType: !this.state.showListTrainingType
        });
      });
    }

    //Lấy TrainingTypeID và TrainingTypeName
    handleClickGetTrainingType = (trainingType) =>{
        this.setState({
          showListTrainingType: false,
          trainingTypeID: trainingType.TrainingTypeID,
          trainingTypeName: trainingType.TrainingTypeName
        });
    }

    //Lấy dữ liệu từ Input
    handleInputChangeCourseCode = (event) =>{
        this.setState({ courseCode: event.target.value});
    }
    handleInputChangeCourseName = (event) =>{
        this.setState({ courseName: event.target.value});
    }
    handleInputChangeStartDate = (event) =>{
        this.setState({ startDate: event.target.value});
    } 
    handleInputChangeEndDate = (event) =>{
        this.setState({ endDate: event.target.value});
    }
    handleInputChangeDescription = (event) =>{
        this.setState({ des: event.target.value});
    }
    handleInputChangeNote = (event) =>{
        this.setState({ note: event.target.value});
    }
    handleInputChangCreateDate = (event) =>{
        this.setState({ createDate: event.target.value});
    }
    handleInputChangeCreateBy = (event) =>{
        this.setState({ createBy: event.target.value});
    }
    handleInputChangeTrainingTime = (event) =>{
        this.setState({ trainingTime: event.target.value});
    }
    handleInputChangeTrainerName = (event) => {
      this.setState({ trainerName: event.target.value });
    }
    handleInputChangeTrainingTypeName = (event) =>{
        this.setState({ trainingTypeName: event.target.value});
    }
    handleInputChangeStatusOn = (event) => {
      this.setState({ status: 1});
    }
    handleInputChangeStatusOff = (event) => {
      this.setState({ status: 0});
    }


    //Validate input
    handleValidation = () =>{
      let returnData={
        formIsValid : true,
        errMes : ''
      }
      if(this.state.startDate > this.state.endDate){
        returnData={
          errMes : "The start date must be before the end date!",
          formIsValid : false
        }
      }

      if (this.state.endDate.toString().trim() === '') {
        returnData={
          errMes : "End date is required!",
          formIsValid : false
        }
      }

      if (this.state.startDate.toString().trim() === '') {
        returnData={
          errMes : "Start date is required!",
          formIsValid : false
        }
      }

      if (this.state.trainingTime.toString().trim() === '') {
        returnData={
          errMes : "Training time is required!",
          formIsValid : false
        }
      }
      
      else if (this.state.trainingTime.match("^[0-9]{1,20}$") == null){
        returnData={
          errMes : "Training time must be numeric!",
          formIsValid : false
        }
      }

      if (this.state.trainingTypeID.trim() === '') {
        returnData={
          errMes : "Training type is required!",
          formIsValid : false
        }
      }

      if (this.state.trainerID.trim() === '') {
        returnData={
          errMes : "Trainer is required!",
          formIsValid : false
        }
      }

      if (this.state.courseName.trim() === '') {
        returnData={
          errMes : "Course name is not empty!",
          formIsValid: false
        }
      }
      else if(this.state.courseName.length < 3) {
        returnData = {
          formIsValid : false,
          errMes : 'Course name must be more than 3 characters!'
        }
      }

      if(this.state.courseCode.trim()===''){
        returnData ={
          formIsValid:false,
          errMes:'Course code is required!'
         } 
      }
      else if(this.state.courseCode.length < 3) {
        returnData = {
          formIsValid : false,
          errMes : 'Course code must be more than 3 characters!'
        }
      }
      else if (this.state.courseCode.match("^[a-zA-Z0-9]{3,20}$") == null) {
        returnData ={
          formIsValid:false,
          errMes:'Course code must not contain special characters!'
        } 
      }
      return returnData;
  }

  clearInput = () => {
    this.setState({
      courseCode:"",
      courseName: "",
      startDate: "",
      endDate: "",
      des: "",
      note: "",
      trainingTypeID: "",
      trainingTypeName:"",
      trainerID: "",
      trainerName:"",
      trainingTime: "",
      status:1
    });
  }
    //Submit data
    handleSubmit = (event) =>{
      event.preventDefault();
        const valiadtion = this.handleValidation();
        if(!valiadtion.formIsValid){
          Swal.fire(valiadtion.errMes);
        }
        else{
          const formData = 
          {
            courseCode: this.state.courseCode.toLocaleUpperCase(),
            courseName: this.state.courseName,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            description: this.state.des,
            note: this.state.note,
            trainingTypeID: this.state.trainingTypeID,
            trainerID: this.state.trainerID,
            trainingTime: parseFloat(this.state.trainingTime),
            status: this.state.status,
            createBy: localStorage.getItem("UserName")
          };
          this.props.onPost(formData);
          this.clearInput();
        }
    }

    render(){
        if (this.props.showFormAdd === false) return null;
        return(
            <div className="modal-content" >
            <div method="post" className="form" id="pop_up" style={{position: 'absolute', top: '-50%', left: '50%', transform: 'translate(-50%, 0%)', zIndex: 1}}>
            <div className="form_title">COURSE INFORMATION</div>
            <div className="form_body">
              <div className="form_item_name">{this.state.courseName}</div>
              <div className="form_item_content">
                <div className="form_item_content_left">

                  <div className="item_component">
                    <div className="item_component_name">Course Code:</div>
                    <input maxLength={20} type="text" value={this.state.courseCode} onChange={this.handleInputChangeCourseCode}  />
                  </div>

                  <div className="item_component">
                    <div className="item_component_name">Course Name:</div>
                    <input maxLength={50} type="text" value={this.state.courseName}  onChange={this.handleInputChangeCourseName} />
                  </div>

                  <div className="item_component">
                    <div className="item_component_name">Trainer:</div>
                    <input type="text"  
                                onChange = {this.handleInputChangeTrainerName}
                                value={this.state.trainerName}
                                readOnly/>
                    <div className="to_show_list_combobox"onClick={this.handleClickShowListTrainer}>
                    <i className="fas fa-sort-down"></i>
                    </div>
                      {this.state.showList === true   &&
                        <ul className="show_list_combobox" style={{ height: '200px', overflow: 'scroll' }}>
                            {this.state.trainers.map((trainer) => (
                                <li key={trainer.TrainerID} onClick = {() =>this.handleClickGetNameTrainer(trainer)}>
                                      {trainer.TrainerName}
                                </li> ))}
                          </ul>
                      }
                  </div>
                  
                  <div className="item_component">
                    <div className="item_component_name">Training Type:</div>
                    <input type="text" 
                                value={this.state.trainingTypeName} 
                                onChange={this.handleInputChangeTrainingTypeName}
                                readOnly />
                    <div className="to_show_list_combobox" onClick={this.handleClickShowListTrainingType}>
                    <i className="fas fa-sort-down"></i>
                    </div>
                      {this.state.showListTrainingType === true  &&
                        <ul className="show_list_combobox list_second" style={{ height: '200px', overflow: 'scroll' }}>
                          {this.state.trainingTypes.map((trainingType) => (
                              <li key={trainingType.TrainingTypeID} onClick = {() =>this.handleClickGetTrainingType(trainingType)}>
                                  {trainingType.TrainingTypeName}
                              </li>))}
                      </ul>
                      }
                  </div>
                  <div className="item_component">
                    <div className="item_component_name">Status:</div>
                    <input type="radio" style={{width:"20px", height: "20px"}} value={this.state.status} defaultChecked={true} name="status" onChange={this.handleInputChangeStatusOn}  /> ON
                    <input type="radio" style={{width:"20px", height: "20px"}} value={this.state.status} name="status"  onChange={this.handleInputChangeStatusOff} /> OFF
                  </div>
                </div>

                <div className="form_item_content_right">
                  <div className="item_component">
                    <div className="item_component_name">Training Time:</div>
                    <input type="number" value={this.state.trainingTime} onChange={this.handleInputChangeTrainingTime}  />
                  </div>

                  <div className="item_component">
                    <div className="item_component_name">Start Day:</div>
                    <input style={{width:'185px'}} type="date" value={this.state.startDate} onChange={this.handleInputChangeStartDate}/>
                  </div>

                  <div className="item_component">
                    <div className="item_component_name">End Day:</div>
                    <input style={{width:'185px'}} type="date" value={this.state.endDate} onChange={this.handleInputChangeEndDate}  />
                  </div>

                  <div className="item_component">
                    <div className="item_component_name">Description:</div>
                    <textarea cols="40" rows="20" style={{width:"185px", height:"40px", fontSize:"20px", borderRadius:"5px", border:"1px #ccc solid"}} value={this.state.des} onChange={this.handleInputChangeDescription}/>
                  </div>

                  <div className="item_component">
                    <div className="item_component_name">Note:</div>
                    <input type="text" value={this.state.note} onChange={this.handleInputChangeNote} />
                  </div>
                </div>
              </div>
            </div>
            <div className="item_footer">
              <button className="btn_form" type="submit" onClick={this.handleSubmit} >ADD</button>
              <button className="btn_form" type="cancel"onClick={() => {this.props.handleShowHideFormAdd(); this.clearInput()}}>CANCEL</button>
            </div>
          </div>
          </div>
        );
    }
}
export default FormAddCourse;