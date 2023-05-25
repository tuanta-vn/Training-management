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
    /// PositionRepoitory kế thừ từ class BaseRepository và IPositionRepository
    /// Create By: TUANTA
    /// Create Date: 02/13/2023
    /// </summary>
    public class PositionRepository : BaseRepository<Position>, IPositionRepository
    {
        public PositionRepository(IConfiguration configuration) : base(configuration)
        {
        }
    }
}
