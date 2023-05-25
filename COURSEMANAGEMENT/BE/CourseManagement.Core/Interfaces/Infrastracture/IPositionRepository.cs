using CourseManagement.Core.Enities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Core.Interfaces.Infrastracture
{
    /// <summary>
    /// Interface Position Repository kế thừa từ Interface IBaseRepositoy truyền vào Position
    /// Create By: TUANTA
    /// Create Date: 02/13/2023
    /// </summary>
    public interface IPositionRepository:IBaseRepository<Position>
    {
    }
}
