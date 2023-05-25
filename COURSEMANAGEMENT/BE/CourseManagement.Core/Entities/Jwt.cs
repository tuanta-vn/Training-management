using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Entities
{
    /// <summary>
    /// Thông tin của Json Web Tokens. Ở đây chỉ có SecretKey.
    /// Mục đích: Để dễ dàng sử dụng trong project khác trong dự án.
    /// Create By: TUANTA
    /// Create Date: 02/15/2023
    /// </summary>
    public class Jwt
    {
        #region Property
        /// <summary>
        /// Mã bảo mật của Jwt
        /// </summary>
        public string SecretKey { get; set; }
        #endregion
    }
}
