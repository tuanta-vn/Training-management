using CourseManagement.Core.Enities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Infrastracture
{
    /// <summary>
    /// Interface ITrainerRepository kế thừa từ IBaseRepository
    /// Create by: TUANTA
    /// Create date: 02/14/2023
    /// </summary>
    public interface ITrainerRepository:IBaseRepository<Trainer>
    {
        /// <summary>
        /// Thêm một Trainer(người dạy)
        /// </summary>
        /// <param name="trainer"></param>
        /// <returns></returns>
        int Insert(Trainer trainer);

        /// <summary>
        /// Sửa một Trainer
        /// </summary>
        /// <param name="trainer"></param>
        /// <returns></returns>
        int Update(Trainer trainer);

        /// <summary>
        /// Kiểm tra số điện thoại đã tồn tại trong thông tin Trainer
        /// </summary>
        /// <param name="mobilePhone"></param>
        /// <returns></returns>
        bool IsMobilePhoneDupplicate(string mobilePhone);
    }
}
