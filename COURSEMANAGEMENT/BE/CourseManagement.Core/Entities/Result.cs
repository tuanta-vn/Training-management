using static CourseManagement.Core.Enum.EnumClass;

namespace CourseManagement.Core.Enities
{
    /// <summary>
    /// Kết quả của học viên
    /// Create By: TUANTA
    /// Create Date: 02/18/2023
    /// </summary>
    public class Result
    {
        #region Property
        /// <summary>
        /// ID nhân viên
        /// </summary>
        public Guid EmployeeID { get; set; }

        /// <summary>
        /// ID khóa học
        /// </summary>
        public Guid CourseID { get; set; }

        /// <summary>
        /// Tên nhân viên
        /// </summary>
        public string? EmployeeName { get; set; }

        /// <summary>
        /// Tên khóa học
        /// </summary>
        public string? CourseName { get; set; }

        /// <summary>
        /// Ngày kiểm tra
        /// </summary>
        public DateTime? TestDate { get; set; }

        /// <summary>
        /// Điểm
        /// </summary>
        public float? Score { get; set; }

        /// <summary>
        /// Trạng thái: Không đạt và đạt
        /// </summary>
        public StatusResult Status { get; set; }

        /// <summary>
        /// Tên trạng thái của kết quả
        /// </summary>
        public string StatusName
        {
            get
            {
                switch (Status)
                {
                    case StatusResult.Fail:
                        return "Fail";
                    case StatusResult.Pass:
                        return "Pass";
                    default:
                        return "";
                }
            }
        }

        /// <summary>
        /// Ghi chú
        /// </summary>
        public string? Note { get; set; }

        /// <summary>
        /// Ngày tạo kết quả
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
        public Result()
        {

        }
        #endregion
    }
}
