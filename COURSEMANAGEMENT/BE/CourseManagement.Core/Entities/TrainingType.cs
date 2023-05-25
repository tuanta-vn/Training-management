namespace CourseManagement.Core.Enities
{
    /// <summary>
    /// Kiểu đào tạo
    /// Create By: TUANTA
    /// Create Date: 02/13/2023
    /// </summary>
    public class TrainingType
    {
        #region Property
        /// <summary>
        /// ID kiểu đào tạo
        /// </summary>
        public Guid TrainingTypeID { get; set; }

        /// <summary>
        /// Tên kiểu đào tạo
        /// </summary>
        public string TrainingTypeName { get; set; } = string.Empty;

        /// <summary>
        /// Mô tả
        /// </summary>
        public string? Description { get; set; }

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
        public TrainingType()
        {

        }
        #endregion
    }
}
