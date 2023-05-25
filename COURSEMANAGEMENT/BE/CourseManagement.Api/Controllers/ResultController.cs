using CourseManagement.Core.Enities;
using CourseManagement.Core.Exceptions;
using CourseManagement.Core.Interfaces.Infrastracture;
using CourseManagement.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseManagement.Api.Controllers
{
    /// <summary>
    /// Controller liên quan đến các thao tác liên quan tới kết quả
    /// Author: TUANTA
    /// CreateDate: 02/17/2023
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    [Authorize]
    public class ResultController : ControllerBase
    {
        IResultRepository _resultRepository;
        IResultService _resultService;
        public ResultController(IResultRepository resultRepository, IResultService resultService)
        {
            _resultRepository = resultRepository;
            _resultService = resultService;
        }

        /// <summary>
        /// Nhập điểm, sửa điểm
        /// </summary>
        /// <param name="result"></param>
        /// <returns></returns>
        [HttpPut]
        [Authorize(Roles = "trainer")]
        public IActionResult Update(Result result)
        {
            try
            {
                //Lấy kết quả trả về sau khi cập nhật kết quả
                var rowEffect = _resultService.UpdateService(result);
                return Ok(rowEffect);
            }
            catch (ValidateException ex)
            {
                var response = new
                {
                    devMsg = ex.Message,
                    userMsg = ex.Message,
                    data = result,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Lấy thông tin kết quả của một nhân viên trong một khóa học
        /// </summary>
        /// <param name="employeeID"></param>
        /// <param name="courseID"></param>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Roles = "employee,trainer")]
        public IActionResult GetResultByID(Guid employeeID, Guid courseID)
        {
            try
            {
                //Lấy thông tin từ repository
                var result = _resultRepository.GetResultByID(employeeID, courseID);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Lấy ra kết quả của nhân viên trong tất cả khóa học
        /// </summary>
        /// <param name="employeeID"></param>
        /// <returns></returns>
        [HttpGet("EmployeeID")]
        [Authorize(Roles = "employee")]
        public IActionResult GetResultByEmployeeID(Guid employeeID)
        {
            try
            {
                //Lấy thông tin từ repository
                var result = _resultRepository.GetResultByEmployeeID(employeeID);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// lấy ra nhiều kết quả của tất cả nhân viên trong một khóa học
        /// </summary>
        /// <param name="courseID"></param>
        /// <returns></returns>
        [HttpGet("CourseID")]
        [Authorize(Roles = "trainer")]
        public IActionResult GetResultByCourseID(Guid courseID)
        {
            try
            {
                //Lấy kết quả trả về
                var result = _resultRepository.GetResultByCourseID(courseID);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
