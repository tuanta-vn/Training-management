using CourseManagement.Core.Enities;
using CourseManagement.Core.Interfaces.Infrastracture;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace CourseManagement.Infrastructure.Repository
{
    /// <summary>
    /// CourseRepository kế thừa từ BaseRepository và ICourseRepository
    /// Create by: TUANTA
    /// </summary>
    public class CourseRepository : BaseRepository<Course>, ICourseRepository
    {
        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="configuration"></param>
        public CourseRepository(IConfiguration configuration) : base(configuration)
        {
        }

        /// <summary>
        /// Hàm lấy ra tất cả các khóa học đang mở
        /// </summary>
        /// <returns></returns>
        public object GetCourseOpen()
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_GetAllCourseOpen";
                return (SqlServerConnection.Query(sqlComand, commandType: System.Data.CommandType.StoredProcedure));
            }
        }

        /// <summary>
        /// Hàm thêm một khóa học 
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        public int Insert(Course course)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_InsertCourse";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CourseCode", course.CourseCode);
                parameters.Add("@CourseName", course.CourseName);
                parameters.Add("@StartDate", course.StartDate);
                parameters.Add("@EndDate", course.EndDate);
                parameters.Add("@Description", course.Description);
                parameters.Add("@Note", course.Note);
                parameters.Add("@TrainingTypeID", course.TrainingTypeID);
                parameters.Add("@TrainerID", course.TrainerID);
                parameters.Add("@TrainingTime", course.TrainingTime);
                parameters.Add("@CreateBy", course.CreateBy);

                var rowEffect = SqlServerConnection.Execute(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return rowEffect;
            }
        }

        /// <summary>
        /// Hàm sửa khóa học
        /// </summary>
        /// <param name="course"></param>
        /// <returns></returns>
        public int Update(Course course)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_UpdateCourse";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CourseID", course.CourseID);
                parameters.Add("@CourseCode", course.CourseCode);
                parameters.Add("@CourseName", course.CourseName);
                parameters.Add("@StartDate", course.StartDate);
                parameters.Add("@EndDate", course.EndDate);
                parameters.Add("@Description", course.Description);
                parameters.Add("@Note", course.Note);
                parameters.Add("@TrainingTypeID", course.TrainingTypeID);
                parameters.Add("@TrainerID", course.TrainerID);
                parameters.Add("@TrainingTime", course.TrainingTime);
                parameters.Add("@Status", course.Status);

                var rowEffect = SqlServerConnection.Execute(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return rowEffect;
            }
        }

        /// <summary>
        /// Hàm lấy tất cả khóa học của một Employee
        /// </summary>
        /// <param name="employeeID"></param>
        /// <returns></returns>
        public object GetCourseByEmployeeID(Guid employeeID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_GetCourseByEmployeeID";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeID", employeeID);
                var rowEffect = SqlServerConnection.Query<object>(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return rowEffect;
            }
        }

        /// <summary>
        /// Hàm lấy ra tất cả khóa học đang mở của Trainer
        /// </summary>
        /// <param name="TrainerID"></param>
        /// <returns></returns>
        public object GetAllCourseOpenByTrainerID(Guid TrainerID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_GetCourseOpenByTrainerID";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TrainerID", TrainerID);
                var result = SqlServerConnection.Query<object>(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return result;
            }
        }

        /// <summary>
        /// Hàm lấy thông tin của Course theo EmployeeID để phục vụ việc đăng ký
        /// </summary>
        /// <param name="EmployeeID"></param>
        /// <returns></returns>
        public object GetCourseToRegister(Guid EmployeeID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_GetCourseToRegister";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeID", EmployeeID);
                var result = SqlServerConnection.Query<object>(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return result;
            }
        }
    }
}
