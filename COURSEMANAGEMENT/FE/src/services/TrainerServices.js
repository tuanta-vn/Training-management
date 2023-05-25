import axios from "axios";

//Create by: TUANTA - 02/21/2023

const API_URL = "https://localhost:7075/api/v1/Trainer";
const GET_METHOD = "get";
const POST_METHOD = "post";
const PUT_METHOD = "put";
const DELETE_METHOD = "delete";

const headers = { 
    'Authorization': 'Bearer ' + localStorage.getItem("token"),
    'Content-Type': 'application/json'
  }
class TrainerServices{
    getTrainers(headers){
        var config = {
            method: GET_METHOD,
            url: API_URL,
            headers: headers
        };
        return axios(config);
    }

    addTrainer(trainer, headers){
        var config = {
            method: POST_METHOD,
            url: API_URL,
            headers: headers,
            data: trainer
        };
        return axios(config);
    }

    editTrainer(trainer, headers){
        var config = {
            method: PUT_METHOD,
            url: API_URL,
            headers: headers,
            data: trainer
        };
        return axios(config);
    }
    deleteTrainer(trainerId, headers){
        var config = {
            method: DELETE_METHOD,
            url: API_URL + '?id=' + trainerId,
            headers: headers,
            data: {}
        };
        return axios(config);
    }
    
    getTrainerByID(trainerID, headers){
        var config = {
            method: GET_METHOD ,
            url: API_URL + "/" + trainerID,
            headers: headers
        };
        return axios(config);
    }

    getTrainerFilter(pageSize, pageNumber, trainerFilter){
        var config = {
            method: GET_METHOD,
            url: API_URL + "/filter?pageSize=" + pageSize + "&pageNumber=" + pageNumber + "&trainerFilter="+ trainerFilter,
            headers: headers
        };
        return axios(config);
    }
}

export default TrainerServices;