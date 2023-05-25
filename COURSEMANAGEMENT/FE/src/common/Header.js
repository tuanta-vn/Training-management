import React,{Component} from "react";
class Header extends Component{
    logout =() =>{
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        localStorage.removeItem("ID")
        localStorage.removeItem("UserName")
    }

    render(){
        return(
            <div className="header">
                <div className="header_icon1">
                    
                </div>
                <div className="header_icon">
                    <div style={{padding: "13px 0", display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
                    {/* <i className="fas fa-user" style={{marginRight: "20px"}}></i> */}
                    <span style={{fontSize: "20px"}}>{localStorage.getItem("UserName")}</span>
                    <a className="logout_icon" href="../../App" onClick={this.logout}>
                    <i className="fas fa-sign-out-alt"></i>
                    </a>
                    </div>
                </div>
            </div>
        )
    }
}
export default Header;