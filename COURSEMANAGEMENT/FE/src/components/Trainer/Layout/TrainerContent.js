import React,{Component} from "react";
import { Route,Routes } from "react-router-dom";
import TrainerPersonal from '../TrainerPersonal';
import CoursesOfTrainer from '../../Course/List/CoursesOfTrainer';

//Create by: TUANTA - 02/13/2023
class TrainerContent extends Component{
    render(){
        return(
            <div className="content">
                <Routes>
                    <Route path="/course" element={<CoursesOfTrainer></CoursesOfTrainer>}></Route>
                    <Route path="/information" element={<TrainerPersonal></TrainerPersonal>}></Route>
                </Routes>
            </div>
        )
    }
}
export default TrainerContent;