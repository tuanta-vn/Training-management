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
    /// Class CourseService kế thừa từ ICourseService
    /// Create by: TUANTA
    /// Create date: 02/13/2023
    /// </summary>
    public class CourseService : ICourseService
    {

        ICourseRepository _courseRepository;

        /// <summary>
        /// Hàm khởi tạo 
        /// </summary>
        /// <param name="courseRepository"></param>
        public CourseService(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        /// <summary>
        /// Hàm Validate dữ liệu và thêm mới một khóa học
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        /// <exception cref="ValidateException"></exception>
        public int InsertService(Course course)
        {
            course.CourseID = new Guid();

            #region Validate
            //Validate dữ liệu
            //1.Mã khóa học độ dài phù hợp & không được để trống & không được trùng
            //Check mã khóa học độ dài từ 3-20 kí tự
            if (course.CourseCode.Length < 3 || course.CourseCode.Length > 20)
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidCourseCodeLength);
            }

            //Check mã không được phép để trống
            if (string.IsNullOrEmpty(course.CourseCode))
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_CourseCodeNotEmpty);
            }

            //Check trùng mã khóa học
            var isDuplicatecourseCode = _courseRepository.IsDuplicateCode(course.CourseCode);
            if (isDuplicatecourseCode)
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_CourseCodeDuplicate);
            }

            //2. Tên khóa học không được để trống
            if (string.IsNullOrEmpty(course.CourseName))
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_CourseNameNotEmpty);
            }

            //3.Ngày bắt đầu khóa học phải sau ngày hiện tại
            if (course.StartDate < DateTime.Now)
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidStartDate);
            }

            //4. Ngày kết thúc phải sau ngày bắt đầu
            if (course.StartDate > course.EndDate)
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidEndDate);
            }
            #endregion

            //Thực hiện thêm mới vào db
            var rowEffect = _courseRepository.Insert(course);
            return rowEffect;
        }

        /// <summary>
        /// Hàm Validate dữ liệu và sửa một khóa học
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        /// <exception cref="ValidateException"></exception>
        public int UpdateService(Course course)
        {
            #region Validate
            //Validate dữ liệu
            //1.Mã khóa học độ dài phù hợp & không được để trống & không được trùng
            //Check mã khóa học độ dài từ 3-20 kí tự
            if (course.CourseCode.Length < 3 || course.CourseCode.Length > 20)
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidCourseCodeLength);
            }

            //Check mã không được phép để trống
            if (string.IsNullOrEmpty(course.CourseCode))
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_CourseCodeNotEmpty);
            }

            //Check trùng mã khóa học
            //Khi mã khóa học khác với mã cũ thì kiểm tra xem có trùng với mã khác không
            if (course.CourseCode != _courseRepository.GetById(course.CourseID).CourseCode)
            {
                var isDuplicate = _courseRepository.IsDuplicateCode(course.CourseCode);
                if (isDuplicate == true)
                {
                    throw new ValidateException(Resources.ResourceEN.EN_ValidateError_CourseCodeDuplicate);
                }
            }

            //2. Tên khóa học không được để trống
            if (string.IsNullOrEmpty(course.CourseName))
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_CourseNameNotEmpty);
            }

            //4. Ngày kết thúc phải sau ngày bắt đầu
            if (course.StartDate > course.EndDate)
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidEndDate);
            }
            #endregion

            //Thực hiện thêm mới vào db
            var rowEffect = _courseRepository.Update(course);
            return rowEffect;
        }
    }
}
