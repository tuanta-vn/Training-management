using CourseManagement.Core.Enities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Infrastracture
{
    /// <summary>
    /// Interface CourseRepository kế thừa từ Interface IBaseRepository
    /// Create by: TUANTA
    /// Create date: 02/13/2023
    /// </summary>
    public interface ICourseRepository:IBaseRepository<Course>
    {
        /// <summary>
        /// Thêm khóa học
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        int Insert(Course course);

        /// <summary>
        /// Sửa khóa học
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        int Update(Course course);

        /// <summary>
        /// Lấy tất cả khóa học đang mở
        /// </summary>
        /// <returns></returns>
        object GetCourseOpen();

        /// <summary>
        /// Lấy tất cả khóa học của employee
        /// </summary>
        /// <param name="employeeID"></param>
        /// <returns></returns>
        object GetCourseByEmployeeID(Guid employeeID);

        /// <summary>
        /// lấy tất cả khóa học đang mở của Trainer
        /// </summary>
        /// <param name="trainerID"></param>
        /// <returns></returns>
        object GetAllCourseOpenByTrainerID(Guid trainerID);

        /// <summary>
        /// Lấy thông tin khóa học theo EmployeeID để đăng ký
        /// </summary>
        /// <param name="employeeID"></param>
        /// <returns></returns>
        object GetCourseToRegister(Guid employeeID);
    }
}
