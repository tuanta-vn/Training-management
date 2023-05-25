import React, { Component } from "react";
import Common from "../../../common/Common";
import Swal from "sweetalert2";

//Create by: TUANTA - 02/13/2023
//Modified by: TUANTA - 02/22/2023:
//                      + Thay đổi cách thông báo
//                      + Thêm validate cho form
// 
class TrainerAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainers: [],
            trainer: '',
            errMsg: '',
            trainerCode: "",
            trainerName: "",
            numberPhone: "",
            gmail: "",
            gender: 0,
            showFormAdd: false,
            genderOther: 2,
            birthday: "",
            headers : { 
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
              }
        };

        this.common = new Common();
    }


    handleValidation = () => {
       
        let returnData = {
            formIsValid: true,
            errMes: ''
        }
        if (this.state.birthday.trim() === '') {
            returnData = {
                errMes : "Date of Birth is required!",
                formIsValid : false
            }
        }
        else if(this.common.getAge(this.state.birthday) < 18){
            returnData = {
                errMes : "Trainer is not yet 18 years old!",
                formIsValid : false
            }
        }
        const regexPhone = /(0)+([0-9]{9})\b/g;
        if(this.state.numberPhone.trim() === ''){
            returnData={
            errMes : "Mobile phone is required!",
            formIsValid : false
            }
        }

        else if (!this.state.numberPhone.match(regexPhone)) {
            returnData={
            errMes : "Mobile phone is invalid!",
            formIsValid : false
            }
        }
        
        if (this.state.gmail.trim()===''){
            returnData = {
                errMes: "Mail is required!",
                formIsValid: false
            }
        }
        else if (this.state.gmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) == null) {
            returnData = {
                formIsValid: false,
                errMes: 'Mail is invalid!'
            }
        }
        if (this.state.trainerName.trim()==='') {
            returnData = {
                errMes: "Trainer name is required!",
                formIsValid: false
            }
        }
        else if(this.state.trainerName.length <3){
            returnData = {
                errMes: "Trainer name must be longer than 3 characters!",
                formIsValid: false
            }
        }
        if (this.state.trainerCode.trim() === '') {
            returnData = {
                formIsValid: false,
                errMes: 'Trainer code is required!'
            }
        }
        else if (this.state.trainerCode.length < 3) {
            returnData = {
                formIsValid: false,
                errMes: 'Trainer code must be longer than 3 characters!'
            }
        }
        else if (this.state.trainerCode.match("^[a-zA-Z0-9]{3,20}$") == null) {
            returnData = {
                formIsValid: false,
                errMes: 'Trainer code code cannot contain special characters!'
            }
        }
        return returnData;
    }

    clearInput = () => {
        this.setState({
            trainerCode:"" ,
            trainerName:"" ,
            gmail: "",
            numberPhone:"" ,
            gender: "",
            birthday: ""
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const validation = this.handleValidation();
        if (!validation.formIsValid) {
            Swal.fire(validation.errMes);
        }
        else {
            const formData = {
                trainerCode: this.state.trainerCode,
                trainerName: this.state.trainerName,
                email: this.state.gmail,
                mobilePhone: this.state.numberPhone,
                gender: this.state.gender,
                dateOfBirth: this.state.birthday
            };
            this.props.onPost(formData);
            this.clearInput();
        }
    }

    // event get input value
    handleInputChangeTrainerCode = (event) => {
        this.setState({ trainerCode: event.target.value });
    }
    handleInputChangeTrainerName = (event) => {
        this.setState({ trainerName: event.target.value });
    }
    handleInputChangeNumberPhone = (event) => {
        this.setState({ numberPhone: event.target.value });
    }
    handleInputChangeGmail = (event) => {
        this.setState({ gmail: event.target.value });
    }
    handleInputChangeGenderMale = (event) => {
        this.setState({ gender: 0 })
    }
    handleInputChangeGenderFemale = (event) => {
        this.setState({ gender: 1 })
    }
    handleInputChangeGenderOther = (event) => {
        this.setState({ gender: 2 })
    }
    handleInputChangeBirthday = (event) => {
        this.setState({ birthday: event.target.value });
    }
    render() {
        if (this.props.showFormAdd === false) return null;
        return (
            <div className="modal-content" >
                <div className="form" id="pop_up" style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translate(-50%, 0%)', zIndex: 1 }}>
                    <div className="form_title">TRAINER INFORMATION</div>
                    <div className="form_body">
                        <div className="form_item_name">{this.state.trainerName}</div>
                        <div className="form_item_content">
                            <div className="form_item_content_left">

                                <div className="item_component">
                                    <div className="item_component_name">Trainer Code:</div>
                                    <input type="text" maxLength={20} value={this.state.trainerCode} onChange={this.handleInputChangeTrainerCode} />
                                </div>

                                <div className="item_component">
                                    <div className="item_component_name">Trainer Name:</div>
                                    <input type="text" maxLength={50} value={this.state.trainerName} onChange={this.handleInputChangeTrainerName} />
                                </div>
                                <div className="item_component">
                                    <div className="item_component_name">Mail:</div>
                                    <input type="text" maxLength={30} value={this.state.gmail} onChange={this.handleInputChangeGmail} />
                                </div>

                            </div>

                            <div className="form_item_content_right">
                                <div className="item_component">
                                    <div className="item_component_name">Mobile Phone:</div>
                                    <input type="text" maxLength={10} value={this.state.numberPhone} onChange={this.handleInputChangeNumberPhone} />
                                </div>

                                <div className="item_component">
                                    <div className="item_component_name">Date of birth:</div>
                                    <input style={{ width: '185px' }} type="date" value={this.state.birthday} onChange={this.handleInputChangeBirthday} />
                                </div>
                                <div className="item_component">
                                    <div className="item_component_name">Gender:</div>
                                    <div className="item_component_radio">
                                        <input type="radio" style={{ width: "20px", height: "20px",margin:"5px 10px" }} value={this.state.genderMale} defaultChecked={true} name="gender" onChange={this.handleInputChangeGenderMale} /> Male
                                        <input type="radio" style={{ width: "20px", height: "20px",margin:"5px 10px" }} value={this.state.genderFemale} name="gender" onChange={this.handleInputChangeGenderFemale} /> Female
                                        <input type="radio" style={{ width: "20px", height: "20px",margin:"5px 10px" }} value={this.state.genderOther} name="gender" onChange={this.handleInputChangeGenderOther} /> Other
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item_footer">
                        <button className="btn_form" type="submit" onClick={this.handleSubmit} >ADD</button>
                        <button className="btn_form" type="cancel" onClick={() => {this.props.handleShowHideFormAdd(); this.clearInput()}}>CANCEL</button>
                    </div>
                </div>
            </div>

        );
    }
}
export default TrainerAdd;