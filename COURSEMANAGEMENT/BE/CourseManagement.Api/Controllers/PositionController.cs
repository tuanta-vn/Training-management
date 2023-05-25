using CourseManagement.Core.Interfaces.Infrastracture;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseManagement.Api.Controllers
{
    /// <summary>
    /// Controller phục vụ các thao tác liên quan tới Position
    /// Author: TUANTA
    /// CreateDate: 02/13/2023
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    [Authorize(Roles = "admin")]
    public class PositionController : ControllerBase
    {
        IPositionRepository _positionRepository;
        public PositionController(IPositionRepository positionRepository)
        {
            _positionRepository = positionRepository;
        }

        /// <summary>
        /// Lấy thông tin toàn bộ Position
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                //Lấy thông tin của vị trí
                var positions = _positionRepository.GetAll();
                return Ok(positions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
