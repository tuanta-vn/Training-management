namespace CourseManagement.Core.Enities
{
    /// <summary>
    /// Phòng ban
    /// CreateBy: TUANTA
    /// Create Date: 02/14/2023
    /// </summary>
    public class Department
    {
        #region Property
        /// <summary>
        /// ID của phòng ban
        /// </summary>
        public Guid DepartmentID { get; set; }

        /// <summary>
        /// Tên của phòng ban
        /// </summary>
        public string DepartmentName { get; set; } = string.Empty;

        /// <summary>
        /// Ngày tạo
        /// </summary>
        public DateTime CreateDate { get; set; }

        /// <summary>
        /// Người tạo
        /// </summary>
        public string? CreateBy { get; set; }

        /// <summary>
        /// Biến lưu trạng thái đã xóa của entity
        /// </summary>
        public bool IsDeleted { get; set; }
        #endregion

        #region Constructor
        /// <summary>
        /// Hàm khởi tạo không tham số
        /// </summary>
        public Department()
        {

        }
        #endregion
    }
}
