import axios from "axios";

//Create by: TUANTA - 02/21/2023

const API_URL = "https://localhost:7075/api/v1/Result";
const GET_METHOD = "get";
const PUT_METHOD = "put";


class ResultServices{
    getResultEmployeeOfCourse(employeeID, courseID, headers){
        var config = {
            method: GET_METHOD,
            url: API_URL + "?EmployeeID=" + employeeID + "&CourseID=" + courseID,
            headers: headers
        };
        return axios(config);
    }

    editResult(data, headers){
        var config = {
            method: PUT_METHOD,
            url: API_URL,
            headers: headers,
            data: data
        };
        return axios(config);
    }
    
    getResultsByEmployeeID(employeeID, headers){
        var config = {
            method: GET_METHOD,
            url: API_URL + "/EmployeeID?EmployeeID=" + employeeID,
            headers: headers
        };
        return axios(config);
    }
    getResultsByCourseID(courseID, headers){
        var config = {
            method: GET_METHOD,
            url: API_URL + "/CourseID?CourseID=" + courseID,
            headers: headers
        };
        return axios(config);
    }
}

export default ResultServices;
