using CourseManagement.Core.Enities;
using CourseManagement.Core.Interfaces.Infrastracture;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Infrastructure.Repository
{
    /// <summary>
    /// Result Repository kế thừa từ class BaseRepository và IResultRepository
    /// Create By: TUANTA
    /// Create Date: 03/18/2023
    /// </summary>
    public class ResultRepository : BaseRepository<Result>, IResultRepository
    {
        public ResultRepository(IConfiguration configuration) : base(configuration)
        {
        }

        /// <summary>
        /// Kiểm tra xem tồn tại bản ghi Result 
        /// </summary>
        /// <param name="employeeID"></param>
        /// <param name="courseID"></param>
        /// <returns></returns>
        public int CheckResultByID(Guid employeeID, Guid courseID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_CheckResultByEmployeeIDAndCourseID";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeID", employeeID);
                parameters.Add("@CourseID", courseID);
                parameters.Add("@Result", DbType.Int32, direction: ParameterDirection.Output);
                var runProc = SqlServerConnection.Query(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                var isExist = parameters.Get<int>("@Result");
                return isExist;
            }
        }

        /// <summary>
        /// Lấy kết quả thông qua ID khóa học
        /// </summary>
        /// <param name="courseID"></param>
        /// <returns></returns>
        public object GetResultByCourseID(Guid courseID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_GetResultByCourseID";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CourseID", courseID);
                var result = SqlServerConnection.Query<object>(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return result;
            }
        }

        /// <summary>
        /// Lấy kết quả thông qua ID nhân viên
        /// </summary>
        /// <param name="employeeID"></param>
        /// <returns></returns>
        public object GetResultByEmployeeID(Guid employeeID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_GetResultByEmployeeID";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeID", employeeID);
                var result = SqlServerConnection.Query<object>(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return result;
            }
        }

        /// <summary>
        /// Lấy thông tin kết quả thông qua employeeId và courseID
        /// </summary>
        /// <param name="employeeID"></param>
        /// <param name="courseID"></param>
        /// <returns></returns>
        public object GetResultByID(Guid employeeID, Guid courseID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_GetResultByEmployeeIDAndCourseID";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeID", employeeID);
                parameters.Add("@CourseID", courseID);
                var result = SqlServerConnection.Query<object>(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return result;
            }
        }

        /// <summary>
        /// Cập nhật thông tin kết quả
        /// </summary>
        /// <param name="result"></param>
        /// <returns></returns>
        public int Update(Result result)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_UpdateResult";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeID", result.EmployeeID);
                parameters.Add("@CourseID", result.CourseID);
                parameters.Add("@TestDate", result.TestDate);
                parameters.Add("@Score", result.Score);
                parameters.Add("@Note", result.Note);
                var rowEffect = SqlServerConnection.Execute(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return rowEffect;
            }
        }
    }
}
