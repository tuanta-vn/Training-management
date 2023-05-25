using CourseManagement.Core.Enities;
using CourseManagement.Core.Interfaces.Authentication;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Infrastructure.Repository.Authentication
{
    /// <summary>
    /// Authentication Repository
    /// Create By: TUANTA
    /// Create Date: 02/15/2023
    /// </summary>
    public class AuthenticationRepository:IAuthenticationRepository
    {
        IConfiguration _configuration;
        SqlConnection _SqlServerConnection;

        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="configuration"></param>
        public AuthenticationRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// Lấy thông tin tài khoản
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public Account GetAccount(string username, string password)
        {
            using (_SqlServerConnection = new SqlConnection(_configuration.GetConnectionString("TUANTA")))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Username", username);
                parameters.Add("@Password", password);

                var account = _SqlServerConnection.QueryFirstOrDefault<Account>("Proc_GetAccountByUsernamePassword", param: parameters,commandType: System.Data.CommandType.StoredProcedure);
                return account;
            }
        }
    }
}
