import axios from "axios";
import React,{Component} from "react";
import Swal from "sweetalert2";
import Common from "../../common/Common";
import TrainerServices from "../../services/TrainerServices";

// Create by: TUANTA - 02/17/2023
// Modified by TUANTA - 02/23/2023:
//                     + Update API theo Services
//                     + Thay đổi cách thông báo

class TrainerPersonal extends Component{
    constructor(props){
        super(props);
        this.state = {
            trainer: {},
            trainerID: localStorage.getItem("ID"),
            headers : { 
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
              }
        }
        this.common = new Common();
        this.trainerServices = new TrainerServices();
    }

    // Lấy thông tin Trainer khi đăng nhập 
    componentDidMount = () => {
        this.trainerServices.getTrainerByID(this.state.trainerID, this.state.headers).then((response) => {
            this.setState({ trainer:response.data});
        })
        .catch((error) => {
            Swal.fire(error.response.data.userMsg);
        }) 

    }

    // Hiển thị thông tin Trainer 
    renderItem = () => {
        return(
            <><ul>
                <li>CODE : <input defaultValue={this.state.trainer.TrainerCode} disabled></input></li>
                <li>
                    NAME :
                    <input defaultValue={this.state.trainer.TrainerName} disabled></input>
                </li>
                <li>
                    GENDER :
                    <input defaultValue={this.state.trainer.GenderName} disabled></input>
                </li>
                
            </ul>
            <ul>
                <li>
                    GMAIL :
                    <input defaultValue={this.state.trainer.Email} disabled></input>
                </li>
                <li>
                    PHONE :
                    <input defaultValue={this.state.trainer.MobilePhone} disabled></input>
                </li>
                <li>
                    BIRTHDAY :
                    <input defaultValue={this.common.formatBindingDate(this.state.trainer.DateOfBirth)} disabled></input>
                </li>
            </ul>
            </>
        )
    }

    render(){
        return(
            <>
            <div className="information">
                <div className="information_title">
                <h1>TRAINER INFORMATION</h1>
                </div>
                <div className="information_content">
                    {this.renderItem()}
                </div>
            </div>
            </>
        )
    }
}
export default TrainerPersonal;