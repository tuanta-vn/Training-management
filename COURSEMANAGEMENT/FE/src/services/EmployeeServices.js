import axios from "axios";

//Create by: TUANTA - 02/21/2023

const API_URL = "https://localhost:7075/api/v1/Employee";
const GET_METHOD = "get";
const POST_METHOD = "post";
const PUT_METHOD = "put";
const DELETE_METHOD = "delete";

const HEADERS = { 
    'Authorization': 'Bearer ' + localStorage.getItem("token"),
    'Content-Type': 'application/json'
  }


class EmployeeServices{
    getEmployees(){
        var config = {
            method: GET_METHOD,
            url: API_URL,
            headers: HEADERS
        };
        return axios(config);
    }

    addEmployee(emloyee, headers){
        var config = {
            method: POST_METHOD,
            url: API_URL,
            headers: headers,
            data: emloyee
        };
        return axios(config);
    }

    editEmployee(emloyee, headers){
        var config = {
            method: PUT_METHOD,
            url: API_URL,
            headers: headers,
            data: emloyee
        };
        return axios(config);
    }

    deleteEmployee(emloyeeId, headers){
        var config = {
            method: DELETE_METHOD,
            url: API_URL + '?id=' + emloyeeId,
            headers: headers,
            data: {}
        };
        return axios(config);
    }

    getEmployeeByID(employeeID, headers){
        var config = {
            method: GET_METHOD,
            url: API_URL + "/EmployeeId?employeeId=" + employeeID,
            headers: headers
        };
        return axios(config);
    }
    getEmployeeFilter(pageSize, pageNumber, employeeFilter){
        var config = {
            method: GET_METHOD,
            url: API_URL + "/filter?pageSize=" + pageSize + "&pageNumber=" + pageNumber + "&employeeFilter="+ employeeFilter,
            headers: HEADERS
        };
        return axios(config);
    }
}

export default EmployeeServices;