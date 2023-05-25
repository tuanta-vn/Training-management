using CourseManagement.Core.Interfaces.Infrastracture;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseManagement.Api.Controllers
{
    /// <summary>
    /// Controller liên quan đến các thao tác liên quan loại khóa học
    /// Author: TUANTA
    /// CreateDate: 02/14/2023
    /// </summary>
    [Route("api/v1/[controller]")]
    [Authorize(Roles ="admin")]
    [ApiController]
    public class TrainingTypeController : ControllerBase
    {
        ITrainingTypeRepository _trainingTypeRepository;
        public TrainingTypeController(ITrainingTypeRepository trainingTypeRepository)
        {
            _trainingTypeRepository = trainingTypeRepository;
        }
        
        /// <summary>
        /// Lấy thông tin toàn bộ kiểu khóa học
        /// </summary>
        /// <returns></returns>
        [HttpGet]        
        public IActionResult GetAll()
        {
            try
            {
                //Lấy thông tin bản ghi
                var trainingTypes = _trainingTypeRepository.GetAll();
                return Ok(trainingTypes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
