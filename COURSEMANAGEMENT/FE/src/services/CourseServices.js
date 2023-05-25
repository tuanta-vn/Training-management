import axios from "axios";

//Create by: TUANTA - 02/21/2023

const API_URL = "https://localhost:7075/api/v1/Course";
const GET_METHOD = "get";
const POST_METHOD = "post";
const PUT_METHOD = "put";
const DELETE_METHOD = "delete";

const HEADERS = { 
    'Authorization': 'Bearer ' + localStorage.getItem("token"),
    'Content-Type': 'application/json'
  }


class CourseServices{
    getCourses(){
        var config = {
            method: GET_METHOD,
            url: API_URL,
            headers: HEADERS
        };
        return axios(config);
    }

    addCourse(course, headers){
        var config = {
            method: POST_METHOD,
            url: API_URL,
            headers: headers,
            data: course
        };
        return axios(config);
    }

    editCourse(course, headers){
        var config = {
            method: PUT_METHOD,
            url: API_URL,
            headers: headers,
            data: course
        };
        return axios(config);
    }
    deleteCourse(courseId, headers){
        var config = {
            method: DELETE_METHOD,
            url: API_URL + '?id=' + courseId,
            headers: headers,
            data: {}
        };
        return axios(config);
    }

    getCoursesOpen(headers){
        var config = {
            method: GET_METHOD,
            url: API_URL + "/CourseOpen",
            headers: headers
        };
        return axios(config);
    }
    
    getCoursesOpenOfTrainer(trainerID, headers){
        var config = {
            method: GET_METHOD ,
            url: API_URL + "/CourseOpenTrainerID?TrainerID=" + trainerID,
            headers: headers
        };
        return axios(config);
    }
    getCourseByID(courseID, headers){
        var config = {
            method: GET_METHOD,
            url: API_URL + "/" + courseID,
            headers: headers
        };
        return axios(config);
    }

    getCourseByEmployeeID(employeeID, headers){
        var config = {
            method: GET_METHOD,
            url: API_URL + "/employeeID?employeeID=" + employeeID,
            headers: headers
        };
        return axios(config);
    }

    getCourseToRegis(employeeID, headers){
        var config = {
            method: GET_METHOD,
            url: API_URL + "/GetCourseToRegis?employeeID=" + employeeID,
            headers: headers
        };
        return axios(config);
    }

    getCourseNoSearch(pageSize, pageNumber){
        var config = {
            method: GET_METHOD,
            url: API_URL + "/filter?pageSize=" + pageSize + "&pageNumber=" + pageNumber,
            headers: HEADERS
        };
        return axios(config);
    }

    getCourseFilter(pageSize, pageNumber, courseFilter){
        var config = {
            method: GET_METHOD,
            url: API_URL + "/filter?pageSize=" + pageSize + "&pageNumber=" + pageNumber + "&courseFilter="+ courseFilter,
            headers: HEADERS
        };
        return axios(config);
    }
}

export default CourseServices;