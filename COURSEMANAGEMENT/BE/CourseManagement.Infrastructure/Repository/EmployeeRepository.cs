using CourseManagement.Core.Enities;
using CourseManagement.Core.Interfaces.Infrastracture;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data.Common;
using System.Data.SqlClient;

namespace CourseManagement.Infrastructure.Repository
{
    /// <summary>
    /// Employee Repository kế thừa từ class BaseRepository và IEmployeeRepository
    /// Create By: TUANTA
    /// Create Date: 02/13/2023
    /// </summary>
    public class EmployeeRepository : BaseRepository<Employee>,IEmployeeRepository
    {
        public EmployeeRepository(IConfiguration configuration):base(configuration)
        {
        }

        /// <summary>
        /// Thêm bản ghi nhân viên
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        public int Insert(Employee employee)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_InsertEmployee";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeCode", employee.EmployeeCode);
                parameters.Add("@EmployeeName", employee.EmployeeName);
                parameters.Add("@MobilePhone", employee.MobilePhone);
                parameters.Add("@Email", employee.Email);
                parameters.Add("@Gender", employee.Gender);
                parameters.Add("@DateOfBirth", employee.DateOfBirth);
                parameters.Add("@PositionID", employee.PositionID);
                parameters.Add("@DepartmentID", employee.DepartmentID);
                parameters.Add("@CreateBy", employee.CreateBy);

                var rowEffect = SqlServerConnection.Execute(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return rowEffect;
            }
        }

        /// <summary>
        /// Cập nhật bản ghi nhân viên
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        public int Update(Employee employee)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_UpdateEmployee";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeID", employee.EmployeeID);
                parameters.Add("@EmployeeCode", employee.EmployeeCode);
                parameters.Add("@EmployeeName", employee.EmployeeName);
                parameters.Add("@MobilePhone", employee.MobilePhone);
                parameters.Add("@Email", employee.Email);
                parameters.Add("@Gender", employee.Gender);
                parameters.Add("@DateOfBirth", employee.DateOfBirth);
                parameters.Add("@PositionID", employee.PositionID);
                parameters.Add("@DepartmentID", employee.DepartmentID);

                var rowEffect = SqlServerConnection.Execute(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return rowEffect;
            }
        }

        /// <summary>
        /// Kiểm tra số điện thoại tồn tại trong hệ thống
        /// </summary>
        /// <param name="mobilePhone"></param>
        /// <returns></returns>
        public bool IsMobilePhoneDupplicate(string mobilePhone)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlCommand = $"SELECT EmployeeCode FROM Employee WHERE MobilePhone = '{mobilePhone}'";
                if (string.IsNullOrEmpty(SqlServerConnection.QueryFirstOrDefault<string>(sqlCommand)))
                {
                    return false;
                }
                return true;
            }
        }
    }
}
