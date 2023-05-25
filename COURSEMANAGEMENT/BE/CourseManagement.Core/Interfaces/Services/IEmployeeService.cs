using CourseManagement.Core.Enities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Services
{
    /// <summary>
    /// Interface Employee Service
    /// Create By: TUANTA
    /// Create Date: 02/14/2023
    /// </summary>
    public interface IEmployeeService
    {
        /// <summary>
        /// Thêm mới dữ liệu
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        int InsertService(Employee employee);

        /// <summary>
        /// Sửa dữ liệu
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        int UpdateService(Employee employee);

        /// <summary>
        /// Hàm validate số điện thoại
        /// </summary>
        /// <param name="number"></param>
        /// <returns></returns>
        bool IsPhoneNumber(string number);

        /// <summary>
        /// Hàm validate email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        bool IsValidEmail(string email);
    }
}
