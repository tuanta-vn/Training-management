using CourseManagement.Core.Enities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Services
{
    /// <summary>
    /// Interface Trainer Service
    /// Create By: TUANTA
    /// Create Date: 02/14/2023
    /// </summary>
    public interface ITrainerService
    {
        /// <summary>
        /// Thêm mới dữ liệu
        /// </summary>
        /// <param name="trainer"></param>
        /// <returns></returns>
        int InsertService(Trainer trainer);

        /// <summary>
        /// Sửa dữ liệu
        /// </summary>
        /// <param name="trainer"></param>
        /// <returns></returns>
        int UpdateService(Trainer trainer);
    }
}
