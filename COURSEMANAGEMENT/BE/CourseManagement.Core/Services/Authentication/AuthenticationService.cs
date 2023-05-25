using CourseManagement.Core.Enities;
using CourseManagement.Core.Entities;
using CourseManagement.Core.Exceptions;
using CourseManagement.Core.Interfaces.Authentication;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Services.Authentication
{
    /// <summary>
    /// Authentication Service, phục vụ các thao tác liên quan đến xác thực người dùng
    /// Create By: TUANTA
    /// Create Date: 02/16/2023
    /// </summary>
    public class AuthenticationService : IAuthenticationService
    {
        IAuthenticationRepository _authenticationRepository;
        Jwt _jwt;

        #region Constructor
        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="authenticationRepository"></param>
        /// <param name="optionsMonitor"></param>
        public AuthenticationService(IAuthenticationRepository authenticationRepository, IOptionsMonitor<Jwt> optionsMonitor)
        {
            _authenticationRepository = authenticationRepository;
            _jwt = optionsMonitor.CurrentValue;
        }
        #endregion

        /// <summary>
        /// Hàm này phục vụ cho chức năng login
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        /// <exception cref="ValidateException"></exception>
        public object LoginService(Account account)
        {
            //Mã hóa password thành chuỗi SHA_512
            var passSHA512 = GenerateSHA512(account.Password);

            //Lấy thông tin tài khoản từ database
            Account user = _authenticationRepository.GetAccount(account.Username, passSHA512);

            if (user != null)
            {
                //Set giá trị cho user id trả về, mặc định là null
                string uid = null;

                if (user.UserID != Guid.Empty)
                {
                    uid = user.UserID.ToString();
                }

                //Đăng ký thông tin Jwt
                var tokenDecription = new SecurityTokenDescriptor
                {
                    Subject = uid == null ? new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.Name, user.Username),
                        new Claim(ClaimTypes.Role, user.Role)
                    }) : new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.Name,user.Username),
                        new Claim(ClaimTypes.Role,user.Role),
                        new Claim("userID",uid)
                    }),
                    Expires = DateTime.Now.AddHours(2),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.SecretKey)), SecurityAlgorithms.HmacSha512Signature)
                };

                //Lấy mã token từ thông tin token được đăng ký ở trên
                var token = new JwtSecurityTokenHandler().CreateToken(tokenDecription);
                
                //Sinh mã jwt
                var jwt = new JwtSecurityTokenHandler().WriteToken(token);

                return new
                {
                    token = jwt
                };
            }
            else
            {
                throw new ValidateException(Resources.ResourceEN.EN_WrongUsernameOrPassword);
            }
        }

        /// <summary>
        /// Hàm băm input string với thuật toán SHA512
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public string GenerateSHA512(string input)
        {
            using (SHA512 sha512Hash = SHA512.Create())
            {
                //Chuyển string sang chuỗi byte
                byte[] inputBytes = Encoding.UTF8.GetBytes(input);

                byte[] hashBytes = sha512Hash.ComputeHash(inputBytes);

                StringBuilder sb = new StringBuilder();

                for (int i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("x2"));
                }

                return sb.ToString();
            }
        }

        /// <summary>
        /// Tạo ra mã token
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        public string CreateToken(Account account)
        {
            //KHởi tạo list claims
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, account.Username),
                new Claim(ClaimTypes.Role, account.Role)
            };

            //Mã hóa key
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_jwt.SecretKey));

            //Ký vào key
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            string jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
