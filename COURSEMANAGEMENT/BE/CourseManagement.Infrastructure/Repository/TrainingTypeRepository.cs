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
    /// TrainingTypeRepository kế thừ từ BaseRepository và ITrainingTypeRepository
    /// Create By: TUANTA
    /// Create Date: 02/14/2023
    /// </summary>
    public class TrainingTypeRepository : BaseRepository<TrainingType>, ITrainingTypeRepository
    {
        public TrainingTypeRepository(IConfiguration configuration) : base(configuration)
        {
        }
    }
}
