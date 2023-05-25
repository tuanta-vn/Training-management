using CourseManagement.Core.Enities;
using CourseManagement.Core.Exceptions;
using CourseManagement.Core.Interfaces.Infrastracture;
using CourseManagement.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Resources;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CourseManagement.Core.Services
{
    /// <summary>
    /// Các xử lý nghiệp vụ liên quan tới bảng Employee
    /// Create by: TUANTA - 02/13/2023
    /// Modified by: TUANTA - 02/14/2023: Thêm UpdateService
    /// </summary>
    public class EmployeeService : IEmployeeService
    {
        IEmployeeRepository _employeeRepository;

        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="employeeRepository"></param>
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        /// <summary>
        /// Hàm phục vụ cho chức năng thêm
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        /// <exception cref="ValidateException"></exception>
        public int InsertService(Employee employee)
        {
            employee.EmployeeID = new Guid();
            #region Validate
            //Validate dữ liệu
            //1.Mã nhân viên phải có độ dài từ 3-20 ký tự & không được để trống & không được trùng
            //Check mã không được phép để trống
            if (string.IsNullOrEmpty(employee.EmployeeCode))
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_EmployeeCodeNotEmpty);
            }

            //Mã nhân viên có độ dài phù hợp
            if (employee.EmployeeCode.Length < 3 || employee.EmployeeCode.Length > 20)
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidEmployeeCodeLength);
            }

            //Check trùng mã nhân viên
            var isDuplicateEmployeeCode = _employeeRepository.IsDuplicateCode(employee.EmployeeCode);
            if (isDuplicateEmployeeCode)
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_EmployeeCodeDuplicate);
            }

            //2. Tên nhân viên không được để trống
            if (string.IsNullOrEmpty(employee.EmployeeName))
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_EmployeeNameNotEmpty);
            }

            //3.Số điện thoại phải đúng định dạng và không được trùng
            //Check trùng số điện thoại
            if (!string.IsNullOrEmpty(employee.MobilePhone))
            {
                if (_employeeRepository.IsMobilePhoneDupplicate(employee.MobilePhone))
                {
                    throw new ValidateException(Resources.ResourceEN.EN_ValidateError_MobilePhoneDuplicate);
                }
                if (!IsPhoneNumber(employee.MobilePhone))
                {
                    throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidMobilePhone);
                }
            }

            //4.Check Email đúng định dạng
            if (!string.IsNullOrEmpty(employee.Email))
            {
                if (!IsValidEmail(employee.Email))
                {
                    throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidEmail);
                }
            }

            //5.Ngày sinh phải đủ tuổi
            if (new DateTime(DateTime.Now.Subtract((DateTime)employee.DateOfBirth!).Ticks).Year - 1 < 18)
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidDateOfBirth);
            }
            #endregion

            //Thực hiện thêm mới vào db
            var rowEffect = _employeeRepository.Insert(employee);
            return rowEffect;
        }

        /// <summary>
        /// Hàm phục vụ cho chức năng cập nhật
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        /// <exception cref="ValidateException"></exception>
        public int UpdateService(Employee employee)
        {
            #region Validate
            //Validate dữ liệu
            //1.Mã nhân viên phải có độ dài từ 3-20 ký tự & không được để trống & không được trùng
            //Check mã không được phép để trống
            if (string.IsNullOrEmpty(employee.EmployeeCode))
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_EmployeeCodeNotEmpty);
            }

            //Mã nhân viên có độ dài phù hợp
            if (employee.EmployeeCode.Length < 3 || employee.EmployeeCode.Length > 20)
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidEmployeeCodeLength);
            }

            //Check trùng mã nhân viên
            //Khi mã nhân viên khác với mã cũ thì kiểm tra xem có trùng với mã khác không
            if (employee.EmployeeCode != _employeeRepository.GetById(employee.EmployeeID).EmployeeCode)
            {
                var isDuplicate = _employeeRepository.IsDuplicateCode(employee.EmployeeCode);
                if (isDuplicate == true)
                {
                    throw new ValidateException(Resources.ResourceEN.EN_ValidateError_EmployeeCodeDuplicate);
                }
            }

            //2. Tên nhân viên không được để trống
            if (string.IsNullOrEmpty(employee.EmployeeName))
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_EmployeeNameNotEmpty);
            }

            //3.Số điện thoại phải đúng định dạng và không được trùng
            //Check trùng số điện thoại
            if (!string.IsNullOrEmpty(employee.MobilePhone))
            {
                if (employee.MobilePhone != _employeeRepository.GetById(employee.EmployeeID).MobilePhone)
                {
                    if (_employeeRepository.IsMobilePhoneDupplicate(employee.MobilePhone))
                    {
                        throw new ValidateException(Resources.ResourceEN.EN_ValidateError_MobilePhoneDuplicate);
                    }
                    if (!IsPhoneNumber(employee.MobilePhone))
                    {
                        throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidMobilePhone);
                    }
                }
            }

            //4.Email đúng định dạng
            if (!string.IsNullOrEmpty(employee.Email))
            {
                if (!IsValidEmail(employee.Email))
                {
                    throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidEmail);
                }
            }

            //5.Ngày sinh phải đủ tuổi
            if (new DateTime(DateTime.Now.Subtract((DateTime)employee.DateOfBirth!).Ticks).Year - 1 < 18)
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidDateOfBirth);
            }
            #endregion

            //Thực hiện thêm mới vào db
            var rowEffect = _employeeRepository.Update(employee);
            return rowEffect;
        }

        /// <summary>
        /// Hàm Validate Email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public bool IsValidEmail(string email)
        {
            var trimmedEmail = email.Trim();

            if (trimmedEmail.EndsWith("."))
            {
                return false;
            }
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == trimmedEmail;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Hàm validate số điện thoại
        /// </summary>
        /// <param name="number"></param>
        /// <returns></returns>
        public bool IsPhoneNumber(string number)
        {
            string motif = @"^0([0-9]){9}";
            return Regex.IsMatch(number, motif);
        }
    }
}
