
using static CourseManagement.Core.Enum.EnumClass;

namespace CourseManagement.Core.Enities
{
    /// <summary>
    /// Nhân viên
    /// Create By: TUANTA
    /// Create Date: 02/13/2023
    /// </summary>
    public class Employee
    {
        #region Property
        /// <summary>
        /// ID nhân viên
        /// </summary>
        public Guid EmployeeID { get; set; }

        /// <summary>
        /// Mã nhân viên
        /// </summary>
        public string EmployeeCode { get; set; } = string.Empty;

        /// <summary>
        /// Tên nhân viên
        /// </summary>
        public string EmployeeName { get; set; } = string.Empty;

        /// <summary>
        /// Điện thoại
        /// </summary>
        public string? MobilePhone { get; set; }

        /// <summary>
        /// Email nhân viên
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// Giới tính theo kiểu enum gender tự định nghĩa (Male-0,Female-1,Other-2)
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
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Ngày tạo nhân viên
        /// </summary>
        public DateTime? CreateDate { get; set; }

        /// <summary>
        /// Người tạo
        /// </summary>
        public string? CreateBy { get; set; }

        /// <summary>
        /// Mã vị trí của nhân viên
        /// </summary>
        public Guid? PositionID { get; set; }

        /// <summary>
        /// Mã phòng ban của nhân viên
        /// </summary>
        public Guid? DepartmentID { get; set; }

        /// <summary>
        /// Tên phòng ban của nhân viên
        /// </summary>
        public string? DepartmentName { get; set; }

        /// <summary>
        /// Tên vị trí của nhân viên
        /// </summary>
        public string? PositionName { get; set; }

        /// <summary>
        /// Biến lưu trạng thái đã xóa của entity
        /// </summary>
        public bool IsDeleted { get; set; }
        #endregion

        #region Constructor
        /// <summary>
        /// Hàm khởi tạo không tham số
        /// </summary>
        public Employee()
        {

        }
        #endregion
    }
}
