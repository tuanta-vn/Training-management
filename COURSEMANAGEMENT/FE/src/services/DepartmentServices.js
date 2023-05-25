import axios from "axios";

//Create by: TUANTA - 02/21/2023

const API_URL = "https://localhost:7075/api/v1/Department";
const GET_METHOD = "get";


class DepartmentServices{
    getDepartments(headers){
        var config = {
            method: GET_METHOD,
            url: API_URL,
            headers: headers
        };
        return axios(config);
    }
}

export default DepartmentServices;

