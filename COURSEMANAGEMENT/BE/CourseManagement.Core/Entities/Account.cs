namespace CourseManagement.Core.Enities
{
    /// <summary>
    /// Tài khoản
    /// CreateBy: TUANTA
    /// CreateDate: 02/15/2023
    /// </summary>
    public class Account
    {
        #region Property
        /// <summary>
        /// ID tài khoản
        /// </summary>
        public Guid AccountID { get; set; }

        /// <summary>
        /// Tên đăng nhập
        /// </summary>
        public string Username { get; set; } = string.Empty;

        /// <summary>
        /// Mật khẩu
        /// </summary>
        public string Password { get; set; } = string.Empty;

        /// <summary>
        /// Vai trò
        /// </summary>
        public string? Role { get; set; }

        /// <summary>
        /// Ngày tạo tài khoản
        /// </summary>
        public DateTime CreateDate { get; set; }

        /// <summary>
        /// Người tạo tài khoản
        /// </summary>
        public string? CreateBy { get; set; }

        /// <summary>
        /// Mã thông tin người dùng. Được nối với mã nhân viên hoặc mã giảng viên.
        /// </summary>
        public Guid UserID { get; set; }

        /// <summary>
        /// Biến lưu trạng thái đã xóa của entity
        /// </summary>
        public bool IsDeleted { get; set; }
        #endregion

        #region Constructor
        /// <summary>
        /// Hàm khởi tạo không tham số
        /// </summary>
        public Account()
        {

        }
        #endregion
    }
}
