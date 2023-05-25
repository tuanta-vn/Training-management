import axios from "axios";

//Create by: TUANTA - 02/21/2023

const API_URL = "https://localhost:7075/api/v1/Registration";
const GET_METHOD = "get";
const POST_METHOD = "post";
const PUT_METHOD = "put";

const HEADERS = { 
    'Authorization': 'Bearer ' + localStorage.getItem("token"),
    'Content-Type': 'application/json'
  }

class RegistrationServices{
    getRegistrationsByCourseID(courseID, headers){
        var config = {
            method: GET_METHOD,
            url: API_URL + "/CourseID?CourseID=" + courseID,
            headers: headers
        };
        return axios(config);
    }

    addRegistration(data, headers){
        var config = {
            method: POST_METHOD,
            url: API_URL,
            headers: headers,
            data: data
        };
        return axios(config);
    }
    editRegistration(data, headers){
        var config = {
            method: PUT_METHOD,
            url: API_URL,
            headers: headers,
            data: data
        };
        return axios(config);
    }
}

export default RegistrationServices;
