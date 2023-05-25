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
    /// Controller phục vụ các thao tác liên quan tới Registration
    /// Author: TUANTA
    /// CreateDate: 02/17/2023
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    [Authorize]
    public class RegistrationController : ControllerBase
    {
        IRegistrationRepository _registrationRepository;
        IRegistrationService _registrationService;

        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="registrationRepository"></param>
        /// <param name="registrationService"></param>
        public RegistrationController(IRegistrationRepository registrationRepository,IRegistrationService registrationService)
        {
            _registrationRepository= registrationRepository;
            _registrationService= registrationService;
        }

        /// <summary>
        /// Lấy danh sách đơn đăng ký có trạng thái chưa phê duyệt theo mã khóa học
        /// </summary>
        /// <param name="courseID"></param>
        /// <returns></returns>
        [HttpGet("CourseID")]
        [Authorize(Roles ="admin")]
        public IActionResult GetRegistrationByCourseID(Guid courseID)
        {
            try
            {
                //Lấy thông tin từ repository
                var registrations = _registrationRepository.GetRegistrationByCourseID(courseID);
                return Ok(registrations);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Thêm thông tin đăng ký khóa học
        /// </summary>
        /// <param name="registration"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(Roles ="employee")]
        public IActionResult Insert(Registration registration)
        {
            try
            {
                //Lấy kết quả trả về sau khi thêm
                var rowEffect = _registrationService.InsertService(registration);
                return Ok(rowEffect);
            }
            catch (ValidateException ex)
            {
                var response = new
                {
                    devMsg = ex.Message,
                    userMsg = ex.Message,
                    data = registration,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Thay đổi trạng thái của khóa học/Phê duyệt đơn đăng ký
        /// </summary>
        /// <param name="registration"></param>
        /// <returns></returns>
        [HttpPut]
        [Authorize(Roles ="admin")]
        public IActionResult Update(Registration registration)
        {
            try
            {
                //Lấy thông tin trả về sau khi thay đổi đăng ký trong repository
                var rowEffect = _registrationService.UpdateService(registration);
                return Ok(rowEffect);
            }
            catch (ValidateException ex)
            {
                var response = new
                {
                    devMsg = ex.Message,
                    userMsg = ex.Message,
                    data = registration,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
