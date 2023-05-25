import axios from "axios";

//Create by: TUANTA - 02/23/2023

const API_URL = "https://localhost:7075/api/v1/Account/Login";
const POST_METHOD = "post";

const HEADERS = { 
    'Authorization': 'Bearer ' + localStorage.getItem("token"),
    'Content-Type': 'application/json'
  }

class AdminServices{
        login(data){
            var config = {
                method: POST_METHOD,
                url: API_URL,
                data: data
            };
            return axios(config);
        }
}
export default AdminServices;
