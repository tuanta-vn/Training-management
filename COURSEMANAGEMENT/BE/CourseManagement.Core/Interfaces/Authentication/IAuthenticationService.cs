using CourseManagement.Core.Enities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Authentication
{
    /// <summary>
    /// Interface Authentication Service
    /// Create By: TUANTA
    /// Create Date: 02/15/2023
    /// </summary>
    public interface IAuthenticationService
    {
        /// <summary>
        /// Service phục vụ cho việc Login
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        object LoginService(Account account);

        /// <summary>
        /// Hàm băm với đầu vào là string input và thuật toán SHA512
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        string GenerateSHA512(string input);

        /// <summary>
        /// Tạo mã Jwt
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        string CreateToken(Account account);
    }
}
