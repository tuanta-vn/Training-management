using CourseManagement.Core.Enities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Infrastracture
{
    /// <summary>
    /// Interface Employee Repository kế thừa từ Interface IBaseRepositoy truyền vào Employee
    /// Create By: TUANTA
    /// Create Date: 02/13/2023
    /// </summary>
    public interface IEmployeeRepository:IBaseRepository<Employee>
    {
        /// <summary>
        /// Thêm nhân viên
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        int Insert(Employee employee);

        /// <summary>
        /// Cập nhật bản ghi
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        int Update(Employee employee);

        /// <summary>
        /// Kiểm tra số điện thoại có trùng lặp hay không
        /// </summary>
        /// <param name="mobilePhone"></param>
        /// <returns></returns>
        bool IsMobilePhoneDupplicate(string mobilePhone);
    }
}
