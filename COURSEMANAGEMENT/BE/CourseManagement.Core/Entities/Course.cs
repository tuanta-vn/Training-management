using static CourseManagement.Core.Enum.EnumClass;
namespace CourseManagement.Core.Enities
{
    /// <summary>
    /// Khoá học 
    /// Create by: TUANTA
    /// Create date: 02/13/2023
    /// </summary>
    public class Course
    {
        #region Property
        /// <summary>
        /// ID khóa học
        /// </summary>
        public Guid CourseID { get; set; }

        /// <summary>
        /// Mã khóa học
        /// </summary>
        public string CourseCode { get; set; } = string.Empty;

        /// <summary>
        /// Tên khóa học
        /// </summary>
        public string CourseName { get; set; } = string.Empty;

        /// <summary>
        /// Thời gian đào tạo
        /// </summary>
        public float TrainingTime { get; set; }

        /// <summary>
        /// Ngày bắt đầu
        /// </summary>
        public DateTime StartDate { get; set; }

        /// <summary>
        /// Ngày kết thúc
        /// </summary>
        public DateTime EndDate { get; set; }

        /// <summary>
        /// Mô tả
        /// </summary>
        public string? Description { get; set; }

        /// <summary>
        /// Ghi chú
        /// </summary>
        public string? Note { get; set; }

        /// <summary>
        /// Trạng thái khóa học
        /// 0: Close, 1: Open
        /// </summary>
        public StatusCourse Status { get; set; }

        /// <summary>
        /// Tên trạng thái khóa học
        /// </summary>
        public string StatusName
        {
            get
            {
                switch (Status)
                {
                    case StatusCourse.Close:
                        return "Close";
                    case StatusCourse.Open:
                        return "Open";
                    default: return "";
                }
            }
        }

        /// <summary>
        /// Ngày tạo khóa học
        /// </summary>
        public DateTime CreateDate { get; set; }

        /// <summary>
        /// Người tạo khóa học
        /// </summary>
        public string? CreateBy { get; set; }

        /// <summary>
        /// ID hình thức đào tạo
        /// </summary>
        public Guid TrainingTypeID { get; set; }

        /// <summary>
        /// Tên hình thức đào tạo
        /// </summary>
        public string? TrainingTypeName { get; set; }

        /// <summary>
        /// ID giảng viên
        /// </summary>
        public Guid TrainerID { get; set; }

        /// <summary>
        /// Tên giảng viên
        /// </summary>
        public string? TrainerName { get; set; }

        /// <summary>
        /// Số người tham gia
        /// </summary>
        public int NumberOfParticipants { get; set; }

        /// <summary>
        /// Biến lưu trạng thái đã xóa của entity
        /// </summary>
        public bool IsDeleted { get; set; }
        #endregion

        #region Constructor
        /// <summary>
        /// Hàm khởi tạo không tham số
        /// </summary>
        public Course()
        {

        }
        #endregion
    }
}
