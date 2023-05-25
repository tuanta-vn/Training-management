namespace CourseManagement.Core.Enum
{
    /// <summary>
    /// Các kiểu dữ liệu enum trong dự án
    /// </summary>
    public class EnumClass
    {
        /// <summary>
        /// Kiểu dữ liệu enum cho Giới tính
        /// Author: TUANTA(14/02/2023)
        /// </summary>
        public enum Gender
        {
            /// <summary>
            /// Nam
            /// </summary>
            Male=0,
            /// <summary>
            /// Nữ
            /// </summary>
            Female=1,
            /// <summary>
            /// Khác
            /// </summary>
            Other=2,
        }

        /// <summary>
        /// Kiểu dữ liệu enum cho Trạng thái đăng ký
        /// Author: TUANTA(07/02/2023)
        /// </summary>
        public enum StatusRegistration
        {
            /// <summary>
            /// Không được xác nhận
            /// </summary>
            Unapproved=0,
            /// <summary>
            /// Đã được xác nhận
            /// </summary>
            Approved=1,
            /// <summary>
            /// Đang chờ xác nhận
            /// </summary>
            WaitingApproval=2,
            /// <summary>
            /// Đã hủy
            /// </summary>
            Cancel=3,
        }

        /// <summary>
        /// Kiểu dữ liệu enum cho Kết quả
        /// Create By: TUANTA
        /// Create Date: 02/18/2023
        /// </summary>
        public enum StatusResult
        {
            /// <summary>
            /// Không qua môn
            /// </summary>
            Fail=0,
            /// <summary>
            /// Qua môn
            /// </summary>
            Pass=1,
        }

        /// <summary>
        /// kiểu dữ liệu enum cho Course
        /// Author: TUANTA(16/02/2023)
        /// </summary>
        public enum StatusCourse 
        {
            /// <summary>
            /// Đóng
            /// </summary>
            Close=0,
            /// <summary>
            /// Mở
            /// </summary>
            Open=1,
        }
    }
}
