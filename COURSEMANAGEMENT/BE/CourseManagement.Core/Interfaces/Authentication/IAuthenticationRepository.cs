using CourseManagement.Core.Enities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Authentication
{
    /// <summary>
    /// Interface Authentication Repository
    /// Create By: TUANTA
    /// Create Date: 02/15/2023
    /// </summary>
    public interface IAuthenticationRepository
    {
        /// <summary>
        /// Lấy thông tin tài khoản
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        Account GetAccount(string username, string password);
    }
}
