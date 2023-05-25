using static CourseManagement.Core.Enum.EnumClass;

namespace CourseManagement.Core.Enities
{
    /// <summary>
    /// Người dạy 
    /// Create by: TUANTA
    /// Create date:02/14/2023
    /// </summary>
    public class Trainer
    {
        #region Property

        /// <summary>
        /// ID người dạy
        /// </summary>
        public Guid TrainerID { get; set; }

        /// <summary>
        /// Mã người dạy
        /// </summary>
        public string TrainerCode { get; set; } = string.Empty;

        /// <summary>
        /// Tên người dạy
        /// </summary>
        public string TrainerName { get; set; } = string.Empty;

        /// <summary>
        /// Số điện thoại
        /// </summary>
        public string? MobilePhone { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// Giới tính
        /// 0-Male, 1-Female, 2-Other
        /// </summary>
        public Gender Gender { get; set; }

        /// <summary>
        /// Tên giới tính
        /// </summary>
        public string? GenderName
        {
            get
            {
                switch (Gender)
                {
                    case Gender.Female:
                        return "Female";
                    case Gender.Male:
                        return "Male";
                    case Gender.Other:
                        return "Other";
                    default:
                        return "";
                }
            }
        }

        /// <summary>
        /// Sinh nhật
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Ngày tạo bản ghi
        /// </summary>
        public DateTime CreateDate { get; set; }

        /// <summary>
        /// Người tạo bản ghi
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
        public Trainer()
        {

        }
        #endregion
    }
}
