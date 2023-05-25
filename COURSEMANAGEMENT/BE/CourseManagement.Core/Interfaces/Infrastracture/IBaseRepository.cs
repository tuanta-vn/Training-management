using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Infrastracture
{
    /// <summary>
    /// Interface Base Repository
    /// Create By: TUANTA
    /// Create Date: 02/13/2023
    /// </summary>
    /// <typeparam name="Entity"></typeparam>
    public interface IBaseRepository<Entity>
    {
        /// <summary>
        /// Hàm lấy tất cả bản ghi
        /// </summary>
        /// <returns></returns>
        IEnumerable<Entity> GetAll();

        /// <summary>
        /// Hàm lấy thông tin bản ghi theo ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Entity GetById(Guid id);

        /// <summary>
        /// Tìm kiếm và phân trang
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageNumber"></param>
        /// <param name="keyFilter"></param>
        /// <returns></returns>
        Object GetSearchAndPaging(int? pageSize, int? pageNumber, string? keyFilter);

        /// <summary>
        /// Kiểm tra trùng mãs
        /// </summary>
        /// <param name="entityCode"></param>
        /// <returns></returns>
        bool IsDuplicateCode(string entityCode);
        
        ///// <summary>
        ///// Thêm mới bản ghi
        ///// </summary>
        ///// <param name="entity"></param>
        ///// <returns></returns>
        //int Insert(Entity entity);

        ///// <summary>
        ///// Chỉnh sửa bản ghi
        ///// </summary>
        ///// <param name="entity"></param>
        ///// <returns></returns>
        //int Update(Entity entity);

        /// <summary>
        /// Xóa bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        int Delete(string entityID);
    }
}
