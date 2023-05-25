using CourseManagement.Core.Enities;
using CourseManagement.Core.Exceptions;
using CourseManagement.Core.Interfaces.Infrastracture;
using CourseManagement.Core.Interfaces.Services;
using CourseManagement.Infrastructure.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Security;
using System.Security.Authentication;

namespace CourseManagement.Api.Controllers
{
    /// <summary>
    /// Controller các thao tác với khóa học
    /// Author: TUANTA 
    /// CreateDate: 02/13/2023
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    [Authorize]
    public class CourseController : ControllerBase
    {
        ICourseRepository _courseRepository;
        ICourseService _courseService;

        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="courseRepository"></param>
        /// <param name="courseService"></param>
        public CourseController(ICourseRepository courseRepository, ICourseService courseService)
        {
            _courseRepository = courseRepository;
            _courseService = courseService;
        }

        /// <summary>
        /// Lấy thông tin toàn bộ khóa học
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Roles = "admin")]
        public IActionResult GetAll()
        {
            try
            {
                //Thực hiện lấy dữ liệu
                var courses = _courseRepository.GetAll();
                return Ok(courses);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        /// <summary>
        /// Lấy danh sách khóa học đang mở
        /// </summary>
        /// <returns></returns>
        [HttpGet("CourseOpen")]
        [Authorize(Roles = "admin,employee")]
        public IActionResult GetCourseOpen()
        {
            try
            {
                //Thực hiện lấy dữ liệu
                var coursesOpen = _courseRepository.GetCourseOpen();
                return Ok(coursesOpen);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Lấy danh sách khóa học theo mã Trainer và đang mở
        /// </summary>
        /// <param name="trainerID"></param>
        /// <returns></returns>
        [HttpGet("CourseOpenTrainerID")]
        [Authorize(Roles = "trainer")]
        public IActionResult GetCourseOpenByTrainerID(Guid trainerID)
        {
            try
            {
                //Thực hiện lấy dữ liệu
                var course = _courseRepository.GetAllCourseOpenByTrainerID(trainerID);
                return Ok(course);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Lấy thông tin khóa học theo mã khóa học
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        [HttpGet("CourseID")]
        [Authorize(Roles = "admin")]
        public IActionResult GetById(Guid courseId)
        {
            try
            {
                //Thực hiện lấy dữ liệu
                var course = _courseRepository.GetById(courseId);
                return Ok(course);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Lấy thông tin khóa học theo mã nhân viên
        /// </summary>
        /// <param name="employeeID"></param>
        /// <returns></returns>
        [HttpGet("EmployeeID")]
        [Authorize(Roles = "employee")]
        public IActionResult GetCourseByEmployeeID(Guid employeeID)
        {
            try
            {
                //Thực hiện lấy dữ liệu
                var courses = _courseRepository.GetCourseByEmployeeID(employeeID);
                return Ok(courses);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Lấy thông tin các khóa học theo mã nhân viên thực hiện đăng ký
        /// </summary>
        /// <param name="employeeID"></param>
        /// <returns></returns>
        [HttpGet("GetCourseToRegis")]
        [Authorize(Roles ="employee")]
        public IActionResult GetCourseToRegister(Guid employeeID)
        {
            try
            {
                //Thực hiện lấy dữ liệu
                var courses = _courseRepository.GetCourseToRegister(employeeID);
                return Ok(courses);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Thêm khóa học
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(Roles = "admin")]
        public IActionResult Post(Course course)
        {
            try
            {
                //Thực hiện lấy kết quả sau khi insert
                var rowEffect = _courseService.InsertService(course);
                return Ok(rowEffect);
            }
            catch (ValidateException ex)
            {
                var response = new
                {
                    devMsg = ex.Message,
                    userMsg = ex.Message,
                    data = course,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Sửa khóa học
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        [HttpPut]
        [Authorize(Roles = "admin")]
        public IActionResult Put(Course course)
        {
            try
            {
                //Lấy thông tin sau khi sửa
                var rowEffect = _courseService.UpdateService(course);
                return Ok(rowEffect);
            }
            catch (ValidateException ex)
            {
                var response = new
                {
                    devMsg = ex.Message,
                    userMsg = ex.Message,
                    data = course,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Tìm kiếm, phân trang khóa học
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageNumber"></param>
        /// <param name="courseFilter"></param>
        /// <returns></returns>
        [HttpGet("Filter")]
        [Authorize(Roles = "admin")]
        public IActionResult GetSearchAndPaging(int? pageSize, int? pageNumber, string? courseFilter)
        {
            try
            {
                //Lấy kết quả từ Course Repository
                var result = _courseRepository.GetSearchAndPaging(pageSize, pageNumber, courseFilter);
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
                var rowEffects = _courseRepository.Delete(id);
                return Ok(rowEffects);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
