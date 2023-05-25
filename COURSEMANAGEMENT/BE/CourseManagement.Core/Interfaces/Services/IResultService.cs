using CourseManagement.Core.Enities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Services
{
    /// <summary>
    /// Interface Result Service
    /// Create By: TUANTA
    /// Create Date: 02/18/2023
    /// </summary>
    public interface IResultService
    {
        /// <summary>
        /// Nhập điểm ,sửa điểm
        /// </summary>
        /// <returns></returns>
        int UpdateService(Result result);
    }
}
