import React,{Component} from "react";
import TrainerContent from "./Layout/TrainerContent";
import TrainerNavbar from "./Layout/TrainerNavbar";
import Header from "../../common/Header";

//Create by: TUANTA - 02/14/2023

class Trainer extends Component{
    render(){
        return(
            <div className="Admin">
                <div className='row g-0'>
                    <div className='col-xl-2'>
                        <TrainerNavbar></TrainerNavbar>
                    </div>
                    <div className='col-xl-10'>
                        <Header></Header>
                        <div className='col-xl-12'>
                            <TrainerContent></TrainerContent>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Trainer;