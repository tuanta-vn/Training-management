import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Common from "../../../common/Common";
import Pagination from "react-js-pagination";
import TrainerAdd from "../Form/TrainerAdd";
import TrainerEdit from "../Form/TrainerEdit";
import TrainerServices from "../../../services/TrainerServices";

//Create by: TUANTA - 02/14/2023
//Modified by TUANTA - 02/23/2023:
//                  + Update: Tìm kiếm, phân trang cho danh sách khóa học
//                  - 02/21/2023:
//                  + Thêm comment code cho phương thức 
//                  - 02/22/2023:
//                  + Update Api theo file Services                    

class ListTrainers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trainers: [],
            trainer: {},
            showFormEdit: false,
            showFormAdd: false,
            defaultUrl: "https://localhost:7075/api/v1/Trainer",
            totalPage:10,
            pageNumber:1,
            pageSize:10,
            activePage:1,
            search:"",
            headers : { 
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
              }
        }
        this.common = new Common();
        this.trainerServices = new TrainerServices();
    }

    //Láy vị trí trang
    handlePageChange = (pageNumber) => {
        this.setState({ activePage: pageNumber});
        this.handlePaging(pageNumber,this.state.search);
    }

    //Hàm thay đổi dữ liệu theo số trang
    handlePaging = (pageNumber, search) => {
        if(pageNumber !== null){
            let url = this.state.defaultUrl + "/filter?pageSize=" + this.state.pageSize + "&pageNumber=" + pageNumber;
            if(search !== ""){
                url += "&trainerFilter=" + search;
            }
            this.componentDidMount(url,search);
        }
    }

    //Lấy giá trị search
    handleInputSearch = (event) => {
        this.setState({search: event.target.value});
    }

    //Lấy data không kèm search
    getData = (url) => {
        var getAllTrainer = {
            method: 'get',
            url: url,
            headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json'
            },
        }
        axios(getAllTrainer).then((response) => {
            this.setState({ trainers: response.data.Data});
        });
    }

    //Lấy data kèm giá trị search
    getDataSearch = (search) => {
        let url = this.state.defaultUrl + "/filter?pageSize=" +this.state.pageSize+"&pageNumber=1";
        if(search !== ""){
            url += "&trainerFilter=" + search;
        }

        var getTrainerSearch = {
            method: 'get',
            url: url,
            headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json'
            },
        }
        axios(getTrainerSearch).then((response)=>{
            this.setState({ totalPage: response.data.TotalPage});
        })
        .catch((error)=>{
            Swal.fire(error.response.data.userMsg);
        });
    }

    //Load component
    componentDidMount = (url=this.state.defaultUrl + "/filter?pageSize=" + this.state.pageSize+"&pageNumber=1", search="") => {
       this.getData(url);
       this.getDataSearch(search);
    }

    // Hiển thị form edit
    handleShowFormEdit = () => {
        this.setState({ showFormEdit: !this.state.showFormEdit});
    }

    //Click xem thông tin 1 trainer
    handleEditClick = (trainer) => {
        this.setState({
            showFormEdit: !this.state.showFormEdit,
            trainer: trainer
        });
    }

    //Sửa thông tin trainer
    handlePut = (data) => {
        this.trainerServices.editTrainer(data, this.state.headers).then((response) => {
            this.setState({showFormEdit: false});
            this.componentDidMount();
            Swal.fire("Đã cập nhật thành công")
        })
        .catch((error) => {
            Swal.fire(error.response.data.userMsg);
        });
    }

    // form add
    handleShowHideFormAdd = () => {
        this.setState({
            showFormAdd: !this.state.showFormAdd
        });
    }

    //Thêm thông tin trainer
    handlePost = (data) => {
        this.trainerServices.addTrainer(data, this.state.headers).then((response) => {
            this.setState({
                status: response.status,
                showFormAdd: false
            });
            Swal.fire("Đã thêm thành công");
            this.componentDidMount();
        })
        .catch((error) => {
            Swal.fire(error.response.data.userMsg);
        });
    }

    //Xóa thông tin trainer
    handleDelete = (id) => {
        this.trainerServices.addTrainer(id, this.state.headers).then((response) => {
            this.componentDidMount();
        })
        .catch((error) => {
            Swal.fire(error.response.data.userMsg);
        });
    }

    showDeleteConfirmAlert = (id, code) => {
        Swal.fire({
            title: `Do you want to delete Trainer Code = ${code}?`,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: 'red'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.handleDelete(id)
            }
          })
      }

    renderItem = () => {
        return(
            this.state.trainers.map(
                trainer => {
                    return (
                        <tr key={trainer.TrainerID} onDoubleClick={() => this.handleEditClick(trainer)}>
                            <td>{trainer.TrainerCode}</td>
                            <td>{trainer.TrainerName}</td>
                            <td>{trainer.MobilePhone}</td>
                            <td>{trainer.Email}</td>
                            <td>{trainer.GenderName}</td>
                            <td>{this.common.formatBindingDate(trainer.DateOfBirth)}</td>
                            <td onClick={() => this.showDeleteConfirmAlert(trainer.TrainerID, trainer.TrainerCode)}><i class="fas fa-trash delete_icon"></i></td>
                        </tr>
                    )
                }
            )
        )
    }

    render() {
        return (
            <>
            <TrainerAdd showFormAdd={this.state.showFormAdd}
                        handleShowHideFormAdd={this.handleShowHideFormAdd}
                        onPost={this.handlePost}
                    />
                    <TrainerEdit
                        showFormEdit={this.state.showFormEdit}
                        trainer={this.state.trainer}
                        handleEditClick={this.handleEditClick}
                        onPut={this.handlePut}
                    />
                <div className="content_title">
                    <div className="content_title_txt">
                        <span>Trainer Management</span>
                    </div>
                    <div className="content_btn">
                        <button type="button" style={{width: '150px', height:'60px', fontSize:'20px', fontWeight:'bold'}} className="btn btn-primary" onClick={this.handleShowHideFormAdd}>ADD TRAINER</button>
                    </div>
                </div>
                
                <div className="content_table">
                <div className="content_search">
                    <div className="content_search_input" >
                        <i className="fas fa-search search_icon"></i>
                        <input className="content_search_input_text" onChange={(e) => {this.handlePaging(this.state.activePage, e.target.value)}}></input>
                    </div>
                </div>
                    <div className="table">
                    <table>
                        <thead><tr className="table_title ">
                            <th className="coursesid">TRAINERID</th>
                            <th className="coursesname">TRAINERNAME</th>
                            <th className="participants">NUMBERPHONE</th>
                            <th className="time">GMAIL</th>
                            <th className="startday">GENDER</th>
                            <th className="endday">BIRTHDAY</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.renderItem()}
                        </tbody>
                    </table>
                    </div>
                    

                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.pageSize}
                    totalItemsCount={this.state.totalPage * this.state.pageSize}
                    pageRangeDisplayed={3}
                    onChange={this.handlePageChange.bind(this)}
                    
                    />
                </div>
                <div>
                </div>
            </>
        )
    }
}
export default ListTrainers;