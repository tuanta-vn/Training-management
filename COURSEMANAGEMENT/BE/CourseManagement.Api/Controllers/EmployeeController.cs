using CourseManagement.Core.Enities;
using CourseManagement.Core.Exceptions;
using CourseManagement.Core.Interfaces.Infrastracture;
using CourseManagement.Core.Interfaces.Services;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using CourseManagement.Core.Services;
using Microsoft.AspNetCore.Authorization;

namespace CourseManagement.Api.Controllers
{
    /// <summary>
    /// Controller phục vụ các thao tác liên quan đến Employee
    /// Author: TUANTA
    /// CreateDate: 02/13/2023
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        IEmployeeRepository _employeeRepository;
        IEmployeeService _employeeService;

        public EmployeeController(IEmployeeRepository employeeRepository, IEmployeeService employeeService)
        {
            _employeeRepository = employeeRepository;
            _employeeService = employeeService;
        }

        /// <summary>
        /// Lấy thông tin toàn bộ Employee
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Roles = "admin")]
        public IActionResult GetAll()
        {
            try
            {
                //Lấy kết quả từ Repository
                var employees = _employeeRepository.GetAll();
                return Ok(employees);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Lấy thông tin employee theo EmployeeID
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        [HttpGet("EmployeeId")]
        [Authorize(Roles = "admin,employee")]
        public IActionResult GetById(Guid employeeId)
        {
            try
            {
                //Lấy thông tin trả về từ Repository
                var employee = _employeeRepository.GetById(employeeId);
                return Ok(employee);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Thêm thông tin nhân viên
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize (Roles = "admin")]
        public IActionResult Post(Employee employee)
        {
            try
            {
                //Lấy kết quả trả về sau khi thêm
                var rowEffect = _employeeService.InsertService(employee);
                return Ok(rowEffect);
            }
            catch (ValidateException ex)
            {
                var response = new
                {
                    devMsg = ex.Message,
                    userMsg = ex.Message,
                    data = employee,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Sửa thông tin nhân viên
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        [HttpPut]
        [Authorize(Roles ="admin")]
        public IActionResult Put(Employee employee)
        {
            try
            {
                //Lấy kết quả trả về sau khi sửa
                var rowEffect = _employeeService.UpdateService(employee);
                return Ok(rowEffect);
            }
            catch (ValidateException ex)
            {
                var response = new
                {
                    devMsg = ex.Message,
                    userMsg = ex.Message,
                    data = employee,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Tìm kiếm, phân trang nhân viên
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageNumber"></param>
        /// <param name="employeeFilter"></param>
        /// <returns></returns>
        [HttpGet("Filter")]
        [Authorize(Roles ="admin")]
        public IActionResult GetSearchAndPaging(int? pageSize, int? pageNumber, string? employeeFilter)
        {
            try
            {
                //Lấy thông tin tìm kiếm và phân trang
                var result = _employeeRepository.GetSearchAndPaging(pageSize, pageNumber, employeeFilter);
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
                var rowEffects = _employeeRepository.Delete(id);
                return Ok(rowEffects);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
