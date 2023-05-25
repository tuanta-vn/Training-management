using static CourseManagement.Core.Enum.EnumClass;

namespace CourseManagement.Core.Enities
{
    /// <summary>
    /// Class đăng ký 
    /// Create by: TUANTA
    /// Create date: 02/17/2023
    /// </summary>
    public class Registration
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
        /// Trạng thái đăng ký
        /// </summary>
        public StatusRegistration Status { get; set; }

        /// <summary>
        /// Tên trạng thái khóa học
        /// </summary>
        public string? StatusName
        {
            get
            {
                switch (Status)
                {
                    case StatusRegistration.Unapproved:
                        return "Unapproved";
                    case StatusRegistration.Approved:
                        return "Approved";
                    case StatusRegistration.WaitingApproval:
                        return "WaitingApproval";
                    case StatusRegistration.Cancel:
                        return "Cancel";
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
        public Registration()
        {

        }
        #endregion
    }
}
