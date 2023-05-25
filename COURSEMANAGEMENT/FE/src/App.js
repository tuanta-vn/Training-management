import './App.css';
import React,{Component} from 'react';
import Admin from './components/Admin/Admin';
import Trainer from './components/Trainer/Trainer';
import Employee from './components/Employee/Employee';
import Login from './components/Login/Login'


class App extends Component {
  render() {
    if(localStorage.getItem("token")){
      if(localStorage.getItem("role") === "admin"){
        return (
          <Admin></Admin>
        )
      }
      else  if(localStorage.getItem("role") === "employee"){
        return (
          <Employee></Employee>
        )
      }
      else  if(localStorage.getItem("role") === "trainer"){
        return (
          <Trainer></Trainer>
        )
      }
    }
    else{
      return(
        <Login></Login>
       )
    }
    
  }

}
export default App;