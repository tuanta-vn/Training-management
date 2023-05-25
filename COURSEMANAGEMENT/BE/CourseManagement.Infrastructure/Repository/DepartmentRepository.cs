using CourseManagement.Core.Enities;
using CourseManagement.Core.Interfaces.Infrastracture;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Infrastructure.Repository
{
    /// <summary>
    /// Department Repository kế thừa từ BaseRepository và IDepartmentRepository
    /// Create By: TUANTA
    /// Create Date: 02/13/2023
    /// </summary>
    public class DepartmentRepository : BaseRepository<Department>, IDepartmentRepository
    {
        public DepartmentRepository(IConfiguration configuration) : base(configuration)
        {
        }
    }
}
