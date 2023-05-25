using CourseManagement.Core.Enities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Infrastracture
{
    /// <summary>
    /// Interface Đăng ký khóa học
    /// Create by: TUANTA
    /// Create date: 02/17/2023
    /// </summary>
     public interface IRegistrationRepository
    {
        /// <summary>
        /// Thêm một đơn đăng ký (Đăng ký khóa học)
        /// </summary>
        /// <param name="registration"></param>
        /// <returns></returns>
        int Insert(Registration registration);

        /// <summary>
        /// Sửa một bản đăng ký (Duyệt đơn đăng ký)
        /// </summary>
        /// <param name="registration"></param>
        /// <returns></returns>
        int Update(Registration registration);

        /// <summary>
        /// Kiểm tra xem đơn đăng ký có tồn tại chưa nếu có trả về 1 chuỗi ngược lại trả về null hoặc empty
        /// </summary>
        /// <param name="employeeID"></param>
        /// <param name="courseID"></param>
        /// <returns></returns>
        string IsDuplicated(Guid employeeID, Guid courseID);

        /// <summary>
        /// Lấy ra tất cả đơn đăng ký có trạng thái chờ phê duyệt trong một khóa học
        /// </summary>
        /// <param name="courseID"></param>
        /// <returns></returns>
        object GetRegistrationByCourseID(Guid courseID);

        /// <summary>
        /// Tìm ID Employee có tồn tại chưa nếu có trả về 1 chuỗi ngược lại trả về null hoặc empty
        /// </summary>
        /// <param name="employeeID"></param>
        /// <returns></returns>
        string CheckEmployeeID(Guid employeeID);

        /// <summary>
        /// Tìm ID khóa học có tồn tại chưa nếu có trả về 1 chuỗi ngược lại trả về null hoặc empty
        /// </summary>
        /// <param name="courseID"></param>
        /// <returns></returns>
        string CheckCourseID(Guid courseID);
        
    }
}
