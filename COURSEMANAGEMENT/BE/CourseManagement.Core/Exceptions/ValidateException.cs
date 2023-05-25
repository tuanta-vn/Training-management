using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Exceptions
{
    /// <summary>
    /// Ghi đè Exeption với msg do người lập trình truyền vào
    /// </summary>
    public class ValidateException : Exception
    {
        string? _msgErrorValidate = null;

        public ValidateException(string msg)
        {
            this._msgErrorValidate = msg;
        }

        public override string Message
        {
            get
            {
                return _msgErrorValidate;
            }
        }
    }
}
