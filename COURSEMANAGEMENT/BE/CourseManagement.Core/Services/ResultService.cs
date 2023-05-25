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
    /// Result Service
    /// Create By: TUANTA
    /// Create Date: 02/18/2023
    /// </summary>
    public class ResultService : IResultService
    {
        IResultRepository _resultRepository;

        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="resultRepository"></param>
        public ResultService(IResultRepository resultRepository)
        {
            _resultRepository = resultRepository;
        }

        /// <summary>
        /// Hàm phục vụ cho việc cập nhật kết quả
        /// </summary>
        /// <param name="result"></param>
        /// <returns></returns>
        /// <exception cref="ValidateException"></exception>
        public int UpdateService(Result result)
        {
            #region Validate
            //Kiểm tra xem EmployeeID và CourseID có tồn tại không
            if ((_resultRepository.CheckResultByID(result.EmployeeID, result.CourseID)) == 0)
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_EmployeeAndCourseNotExists);
            }
            #endregion
            
            var rowEffect = _resultRepository.Update(result);
            return rowEffect;
        }
    }
}
