using CourseManagement.Core.Enities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Services
{
    /// <summary>
    /// Interface Registration Services
    /// CreateBy: TUANTA, TUANTA
    /// CreateDAte: 02/15/2023
    /// </summary>
    public interface IRegistrationService
    {
        /// <summary>
        /// Duyệt đơn đăng ký
        /// </summary>
        /// <param name="registration"></param>
        /// <returns></returns>
        int UpdateService(Registration registration);
        
        /// <summary>
        /// Đăng ký
        /// </summary>
        /// <param name="registration"></param>
        /// <returns></returns>
        int InsertService(Registration registration);
        //int GetRegisByCourseIDService(Guid CourseID);

    }
}
