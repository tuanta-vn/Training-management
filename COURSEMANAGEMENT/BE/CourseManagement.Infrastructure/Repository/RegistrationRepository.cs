using CourseManagement.Core.Enities;
using CourseManagement.Core.Interfaces.Infrastracture;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Infrastructure.Repository
{
    /// <summary>
    /// Class RegistrationRepository kế thừa từ các interface BaseRepository, IRegistrationRepository
    /// Create by: TUANTA
    /// Craete date: 02/17/2023
    /// </summary>
    public class RegistrationRepository :BaseRepository<Registration>, IRegistrationRepository
    {
        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="configuration"></param>
        public RegistrationRepository(IConfiguration configuration) : base(configuration)
        {
        }

        /// <summary>
        /// Hàm thêm mới một đơn đăng ký
        /// </summary>
        /// <param name="registration"></param>
        /// <returns></returns>
        public int Insert(Registration registration)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_InsertRegistration";
                DynamicParameters parameters = new DynamicParameters();   
                parameters.Add("@EmployeeID", registration.EmployeeID);
                parameters.Add("@CourseID", registration.CourseID);
                parameters.Add("@CreateBy", registration.CreateBy);
                var rowEffect = SqlServerConnection.Execute(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return rowEffect;
            }
        }
        
        /// <summary>
        /// Hàm sửa một đơn đăng ký (Duyệt đơn đăng ký)
        /// </summary>
        /// <param name="registration"></param>
        /// <returns></returns>
        public int Update(Registration registration)
        {
            using(SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_UpdateRegistration";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeID", registration.EmployeeID);
                parameters.Add("@CourseID", registration.CourseID);
                parameters.Add("@Status", registration.Status);
                var rowEffect=SqlServerConnection.Execute(sqlComand, param:parameters,commandType:System.Data.CommandType.StoredProcedure);
                return rowEffect;
            }
        }

        /// <summary>
        /// Hàm kiểm tra đơn đăng ký đã tồn tại hay chưa
        /// </summary>
        /// <param name="employeeID"></param>
        /// <param name="courseID"></param>
        /// <returns></returns>
        public string IsDuplicated(Guid employeeID, Guid courseID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_GetRegistrationByID";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeID",employeeID);
                parameters.Add("@CourseID", courseID);
                var result = SqlServerConnection.QueryFirstOrDefault<string>(sqlComand,param:parameters,commandType:System.Data.CommandType.StoredProcedure);
                return result;
            }
        }

        /// <summary>
        /// Hàm lấy tất cả đơn đăng ký của một khóa học  
        /// </summary>
        /// <param name="courseID"></param>
        /// <returns></returns>
        public object GetRegistrationByCourseID(Guid courseID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_GetRegistrationByCourseID";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CourseID",courseID);
                return (SqlServerConnection.Query(sqlComand,param:parameters, commandType: System.Data.CommandType.StoredProcedure));
            }
        }
        
        /// <summary>
        /// Hàm tìm/kiểm tra ID employee(một nhân viên) có tồn tại hay chưa
        /// </summary>
        /// <param name="employeeID"></param>
        /// <returns></returns>
        public string CheckEmployeeID(Guid employeeID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_CheckEmployeeID";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeID", employeeID);
                var result = SqlServerConnection.QueryFirstOrDefault<string>(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return result;
            }
        }

        /// <summary>
        /// Hàm kiểm tra ID khóa học(một khóa học) có tồn tại hay chưa
        /// </summary>
        /// <param name="courseID"></param>
        /// <returns></returns>
        public string CheckCourseID(Guid courseID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_CheckCourseID";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CourseID", courseID);
                var result = SqlServerConnection.QueryFirstOrDefault<string>(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return result;
            }
        }
    }
}
