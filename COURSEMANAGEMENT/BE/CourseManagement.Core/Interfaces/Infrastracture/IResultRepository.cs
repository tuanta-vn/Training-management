using CourseManagement.Core.Enities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Infrastracture
{
    /// <summary>
    /// Interface Result Repository
    /// Create By: TUANTA
    /// Create Date: 02/18/2023
    /// </summary>
    public interface IResultRepository
    {
        /// <summary>
        /// Cập nhật điểm - Sửa điểm
        /// </summary>
        /// <param name="result"></param>
        /// <returns></returns>
        int Update(Result result);

        /// <summary>
        /// Kiểm tra điểm bằng CourseID và EmployeeID
        /// </summary>
        /// <param name="employeeID"></param>
        /// <param name="courseID"></param>
        /// <returns></returns>
        int CheckResultByID( Guid employeeID, Guid courseID);

        /// <summary>
        /// Lấy thông tin kết quả qua EmployeeID và CourseID
        /// </summary>
        /// <param name="employeeID"></param>
        /// <param name="courseID"></param>
        /// <returns></returns>
        object GetResultByID(Guid employeeID, Guid courseID);

        /// <summary>
        /// Lất thông tin kết quả thông qua EmployeeID
        /// </summary>
        /// <param name="employeeID"></param>
        /// <returns></returns>
        object GetResultByEmployeeID(Guid employeeID);

        /// <summary>
        /// Lất thông tin kết quả thông qua CourseID
        /// </summary>
        /// <param name="courseID"></param>
        /// <returns></returns>
        object GetResultByCourseID(Guid courseID);
    }
}
