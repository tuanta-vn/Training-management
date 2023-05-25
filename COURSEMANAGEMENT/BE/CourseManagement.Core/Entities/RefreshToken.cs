using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Entities
{
    /// <summary>
    /// thông tin của RefreshToken để phục vụ cho việc làm mới jwt
    /// Create By: TUANTA
    /// Create Date: 02/16/2023
    /// </summary>
    public class RefreshToken
    {
        #region Property
        /// <summary>
        /// Mã refresh token
        /// </summary>
        public string? TokenString { get; set; }

        /// <summary>
        /// Ngày tạo token
        /// </summary>
        public DateTime TokenCreated { get; set; }

        /// <summary>
        /// Ngày hết hạn token
        /// </summary>
        public DateTime TokenExpires { get; set; }
        #endregion
    }
}
