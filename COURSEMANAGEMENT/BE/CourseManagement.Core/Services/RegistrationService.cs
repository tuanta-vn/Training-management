using CourseManagement.Core.Enities;
using CourseManagement.Core.Exceptions;
using CourseManagement.Core.Interfaces.Infrastracture;
using CourseManagement.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Services
{
    /// <summary>
    /// Class RegistrationService kế thưa từ IRegistrationService
    /// Create By: TUANTA, TUANTA
    /// Create By: 02/14/2023
    /// </summary>
    public class RegistrationService : IRegistrationService
    {
        IRegistrationRepository _registrationRepository;

        /// <summary>
        /// Hàm khởi tạo 
        /// </summary>
        /// <param name="registrationRepository"></param>
        public RegistrationService(IRegistrationRepository registrationRepository)
        {
            _registrationRepository= registrationRepository;
        }

        /// <summary>
        /// Hàm validate dữ liệu và thêm mới một đơn đăng ký(Đăng ký khóa học)
        /// </summary>
        /// <param name="registration"></param>
        /// <returns></returns>
        /// <exception cref="ValidateException"></exception>
        public int InsertService(Registration registration)
        {
            #region Validate
            //Mã nhân viên không được để trống
            if (string.IsNullOrEmpty(registration.EmployeeID.ToString()))
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_EmployeeCodeNotEmpty);
            }

            //Mã khóa học không được để trống
            if (string.IsNullOrEmpty(registration.CourseID.ToString()))
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_CourseCodeNotEmpty);
            }

            //check không có mã nhân viên
            if (string.IsNullOrEmpty(_registrationRepository.CheckEmployeeID(registration.EmployeeID)))
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_EmployeeNotExists);
            }

            //check không có mã khóa học
            if (string.IsNullOrEmpty(_registrationRepository.CheckCourseID(registration.CourseID)))
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_CourseNotExists);
            }

            //check đã tồn tại mã nhân viên và mã khóa học
            if (!string.IsNullOrEmpty(_registrationRepository.IsDuplicated(registration.EmployeeID, registration.CourseID)))
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_EmployeeRegistedCourse);
            }
            #endregion

            //thêm mới bào database
            var rowEffect = _registrationRepository.Insert(registration);
            return rowEffect;
        }

        /// <summary>
        /// Hàm validate dữ liệu và sửa một đơn đăng ký (Duyệt đơn đăng ký)
        /// </summary>
        /// <param name="registration"></param>
        /// <returns></returns>
        /// <exception cref="ValidateException"></exception>
        public int UpdateService(Registration registration)
        {
            #region Validate
            //check đã tồn tại mã nhân viên và mã khóa học
            if (string.IsNullOrEmpty(_registrationRepository.IsDuplicated(registration.EmployeeID,registration.CourseID)))
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_EmployeeAndCourseNotExists);
            }
            #endregion

            var rowEffect = _registrationRepository.Update(registration);
            return rowEffect;
        }
    }
}
