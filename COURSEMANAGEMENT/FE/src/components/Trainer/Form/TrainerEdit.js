import React, { Component } from "react";
import Common from "../../../common/Common";
import Swal from "sweetalert2";

//Create by: TUANTA - 02/13/2023
//Modified by: TUANTA - 02/22/2023:
//                      + Thay đổi cách thông báo
//                      + Thêm validate cho form
// 
class TrainerEdit extends Component {
    constructor(props){
        super(props);
    
        this.state={
            trainers:[],
            trainer:'',
            trainerCode: null,
            trainerName: null,
            mobilephone: null,
            email: null,
            gender:null,
            genderMale:0,
            genderFemale:1,
            genderOther:2,
            dateBirth:null,
            headers : { 
              'Authorization': 'Bearer ' + localStorage.getItem("token"),
              'Content-Type': 'application/json'
            }
        }
        this.common = new Common();
    };
    
    
    handleSaveClick =(event) =>{
        event.preventDefault();
    
        const formData ={
            trainerID: this.props.trainer.TrainerID,
            trainerCode: this.state.trainerCode === null ? this.props.trainer.TrainerCode:this.state.trainerCode,
            trainerName: this.state.trainerName === null ? this.props.trainer.TrainerName:this.state.trainerName,
            mobilephone: this.state.mobilephone ===null? this.props.trainer.MobilePhone: this.state.mobilephone,
            email: this.state.email === null? this.props.trainer.Email:this.state.email,
            gender: this.state.gender === null? this.props.trainer.Gender: this.state.gender,
            dateOfBirth:this.state.dateBirth=== null? this.props.trainer.DateOfBirth: this.state.dateBirth
        };
        let validation = {
            errMes: '',
            formIsValid: true
          }
  
          if(formData.email.trim() === ''){
            validation={
              errMes : "Mail is requried!",
              formIsValid : false
            }
          }
          else if(formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) == null){
            validation = {
              formIsValid: false,
              errMes: 'Mail is invalid!'
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
              errMes : "Date of birth is required!",
              formIsValid : false
            }
          }
          else if(this.common.getAge(formData.dateOfBirth) < 18){
            validation = {
              errMes : "Trainer is not yet 18 years old!",
              formIsValid : false
            }
          }
          
    
          if (formData.trainerName.trim() === '') {
            validation={
              errMes : "Trainer name is required!",
            formIsValid: false
            }
          }
          else if(formData.trainerName.length < 3) {
            validation = {
              formIsValid : false,
              errMes : 'Trainer name must be longer than 3 characters!'
            }
          }
          
          if(formData.trainerCode.trim() === ''){
            validation = {
              formIsValid : false,
              errMes : 'Trainer code is required!'
            }
          }
          else if(formData.trainerCode.length < 3) {
            validation = {
              formIsValid : false,
              errMes : 'Trainer code must be longer than 3 characters!'
            }
          }
          else if(formData.trainerCode.match("^[a-zA-Z0-9]{3,20}$") == null){
            validation = {
              formIsValid : false,
              errMes : 'Trainer code code cannot contain special characters!'
            }
          }
  
          if(!validation.formIsValid){
            Swal.fire(validation.errMes);
          }
          else{
            this.props.onPut(formData);
          }
    }
    
    handleInputChangeTrainerCode =(event) =>
    {
        this.setState({trainerCode: event.target.value});
    }
    
    handleInputChangeTrainerName =(event) =>
    {
        this.setState({trainerName: event.target.value});
    }
    
    handleInputChangeEmail =(event) =>
    {
        this.setState({email: event.target.value});
       
    }
    
    handleInputChangeMobilePhone =(event) =>
    {
        this.setState({mobilephone: event.target.value});
       
    }
    
    handleInputChangeGenderMale =(event) =>
    {
        this.setState({gender: 0});
        
    }
    handleInputChangeGenderFemale =(event) =>
    {
        this.setState({gender: 1});
       
    }
    handleInputChangeGenderOther =(event) =>
    {
        this.setState({gender: 2});
        
    }
    
    handleInputChangeTrainerDateOfBirth =(event) =>
    {
        this.setState({dateBirth: event.target.value});
        
    }
    
        render() {
            if(this.props.showFormEdit ===false) return null;
            return (
                <>
                  <div className="modal-content" >
                    <div className="form" id="pop_up" style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translate(-50%, 0%)', zIndex: 1 }}>
                        <div className="form_title">TRAINER INFORMATION</div>
                        <div className="form_body">
                            <div className="form_item_name">{this.state.trainerName}</div>
                            <div className="form_item_content">
                                <div className="form_item_content_left">
    
                                    <div className="item_component">
                                        <div className="item_component_name">Trainer Code:</div>
                                        <input type="text"  maxLength={20} defaultValue={this.props.trainer.TrainerCode} onChange={this.handleInputChangeTrainerCode} />
                                    </div>
    
                                    <div className="item_component">
                                        <div className="item_component_name">Trainer Name:</div>
                                        <input type="text" maxLength={50} defaultValue={this.props.trainer.TrainerName} onChange={this.handleInputChangeTrainerName} />
                                    </div>
                                    <div className="item_component">
                                        <div className="item_component_name">Mail:</div>
                                        <input type="text" maxLength={30} defaultValue={this.props.trainer.Email} onChange={this.handleInputChangeEmail} />
                                    </div>
    
                                </div>
    
                                <div className="form_item_content_right">
                                    <div className="item_component">
                                        <div className="item_component_name">Mobile Phone:</div>
                                        <input type="text" maxLength={10} defaultValue={this.props.trainer.MobilePhone} onChange={this.handleInputChangeMobilePhone} />
                                    </div>
    
                                    <div className="item_component">
                                        <div className="item_component_name">Date of birth:</div>
                                        <input style={{ width: '185px' }} type="date" defaultValue={this.common.formatBindingDate(this.props.trainer.DateOfBirth)} onChange={this.handleInputChangeTrainerDateOfBirth} />
                                    </div>
                                    <div className="item_component">
                                        <div className="item_component_name">Gender:</div>
                                        <div className="item_component_radio">
                                            <input type="radio" style={{ width: "20px", height: "20px",margin:"5px 10px" }}  name="gender" defaultChecked={this.props.trainer.Gender===0} onChange={this.handleInputChangeGenderMale} /> Male
                                            <input type="radio" style={{ width: "20px", height: "20px",margin:"5px 10px" }}  name="gender" defaultChecked={this.props.trainer.Gender===1} onChange={this.handleInputChangeGenderFemale} /> Female
                                            <input type="radio" style={{ width: "20px", height: "20px",margin:"5px 10px" }}  name="gender" defaultChecked={this.props.trainer.Gender===2} onChange={this.handleInputChangeGenderOther} /> Other
                                        </div>
    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item_footer">
                            <button className="btn_form" type="submit" onClick={this.handleSaveClick} >EDIT</button>
                            <button className="btn_form" type="cancel" onClick={this.props.handleEditClick}>CANCEL</button>
                        </div>
                    </div>
                </div>
    
                    
                </>
            )
    
        }
}

export default TrainerEdit;