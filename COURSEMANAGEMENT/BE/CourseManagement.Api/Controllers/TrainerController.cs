using CourseManagement.Core.Enities;
using CourseManagement.Core.Exceptions;
using CourseManagement.Core.Interfaces.Infrastracture;
using CourseManagement.Core.Interfaces.Services;
using CourseManagement.Core.Services;
using CourseManagement.Infrastructure.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseManagement.Api.Controllers
{
    /// <summary>
    /// Controller liên quan đến các thao tác liên quan giảng viên
    /// Author: TUANTA
    /// CreateDate: 02/14/2023
    /// </summary>
    [Route("api/v1/[controller]")]
    [Authorize]
    [ApiController]
    public class TrainerController : ControllerBase
    {
        ITrainerRepository _trainerRepository;
        ITrainerService _trainerService;

        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="trainerRepository"></param>
        /// <param name="trainerService"></param>
        public TrainerController(ITrainerRepository trainerRepository, ITrainerService trainerService)
        {
            _trainerRepository = trainerRepository;
            _trainerService = trainerService;
        }

        /// <summary>
        /// Lấy thông tin toàn bộ giảng viên
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Roles = "admin")]
        public IActionResult GetAll()
        {
            try
            {
                //Thực hiện lấy dữ liệu
                var trainers = _trainerRepository.GetAll();
                return Ok(trainers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Lấy thông tin giảng viên theo mã giảng viên
        /// </summary>
        /// <param name="trainerId"></param>
        /// <returns></returns>
        [HttpGet("{trainerId}")]
        [Authorize(Roles = "admin,trainer")]
        public IActionResult GetById(Guid trainerId)
        {
            try
            {
                //Thực hiện lấy dữ liệu
                var trainer = _trainerRepository.GetById(trainerId);
                return Ok(trainer);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Thêm thông tin giảng viên
        /// </summary>
        /// <param name="trainer"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(Roles = "admin")]
        public IActionResult Post(Trainer trainer)
        {
            try
            {
                //Lấy thông tin trả về khi thêm bản ghi
                var rowEffects = _trainerService.InsertService(trainer);
                return Ok(rowEffects);
            }
            catch (ValidateException ex)
            {
                var response = new
                {
                    devMsg = ex.Message,
                    userMsg = ex.Message,
                    data = trainer,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Sửa thông tin giảng viên
        /// </summary>
        /// <param name="trainer"></param>
        /// <returns></returns>
        [HttpPut]
        [Authorize(Roles = "admin")]
        public IActionResult Put(Trainer trainer)
        {
            try
            {
                //Lấy kết quả trả về sau khi sửa
                var rowEffects = _trainerService.UpdateService(trainer);
                return Ok(rowEffects);
            }
            catch (ValidateException ex)
            {
                var response = new
                {
                    devMsg = ex.Message,
                    userMsg = ex.Message,
                    data = trainer,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Tìm kiếm, phân trang giảng viên
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageNumber"></param>
        /// <param name="trainerFilter"></param>
        /// <returns></returns>
        [HttpGet("Filter")]
        [Authorize(Roles = "admin")]
        public IActionResult GetSearchAndPaging(int? pageSize, int? pageNumber, string? trainerFilter)
        {
            try
            {
                //Lấy kết quả phân trang, tìm kiếm qua repository
                var result = _trainerRepository.GetSearchAndPaging(pageSize, pageNumber, trainerFilter);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Xóa bản ghi
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Authorize(Roles = "admin")]
        public IActionResult Delete(string id)
        {
            try
            {
                var rowEffects = _trainerRepository.Delete(id);
                return Ok(rowEffects);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
