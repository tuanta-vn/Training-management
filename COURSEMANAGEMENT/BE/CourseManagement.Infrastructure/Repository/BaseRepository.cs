using CourseManagement.Core.Interfaces.Infrastracture;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Infrastructure.Repository
{
    /// <summary>
    /// Base repository viết những hàm chung cho các class repo khác kế thừa lại
    /// CreateBy: TUANTA
    /// CreateDate: 02/13/2023
    /// </summary>
    /// <typeparam name="Entity"></typeparam>
    public class BaseRepository<Entity> : IBaseRepository<Entity> where Entity : class
    {
        protected readonly IConfiguration Configuration;
        protected SqlConnection SqlServerConnection;
        string _className;

        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="configuration"></param>
        public BaseRepository(IConfiguration configuration)
        {
            Configuration = configuration;
            _className = typeof(Entity).Name;
        }

        /// <summary>
        /// Hàm lấy tất cả bản ghi
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Entity> GetAll()
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                //Tạo biến result lưu trữ kết quả sau khi querry
                var entities = SqlServerConnection.Query<Entity>($"Proc_GetAll{_className}", commandType: System.Data.CommandType.StoredProcedure);
                //Trả kết quả
                return entities;
            }
        }

        /// <summary>
        /// Lấy bản ghi theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Entity GetById(Guid id)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add($"{_className}ID", id);
                var entity = SqlServerConnection.QueryFirstOrDefault<Entity>($"Proc_Get{_className}ByID", param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return entity;
            }
        }

        /// <summary>
        /// Tìm kiếm và phân trang
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageNumber"></param>
        /// <param name="keyFilter"></param>
        /// <returns></returns>
        public Object GetSearchAndPaging(int? pageSize, int? pageNumber, string? keyFilter)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@KeyFilter", keyFilter);
                parameters.Add("@PageSize", pageSize);
                parameters.Add("@PageIndex", pageNumber);
                parameters.Add("@TotalPage", DbType.Int32, direction: ParameterDirection.Output);
                parameters.Add("@TotalRecord", DbType.Int32, direction: ParameterDirection.Output);
                var Data = SqlServerConnection.Query<Entity>($"Proc_{_className}Filter", param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                var TotalPage = parameters.Get<int>("@TotalPage");
                var TotalRecord = parameters.Get<int>("@TotalRecord");
                Object data = new
                {
                    TotalPage,
                    TotalRecord,
                    Data
                };
                return data;
            }
        }

        /// <summary>
        /// Kiểm tra trùng Code
        /// </summary>
        /// <param name="entityCode"></param>
        /// <returns></returns>
        public bool IsDuplicateCode(string entityCode)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                //2.Mã nhân viên không được phép trùng với mã nhân viên khác
                var sqlCommandCheck = $"SELECT {_className}Code FROM {_className} WHERE {_className}Code = @{_className}Code";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add($"{_className}Code", entityCode);
                var employeeCodeDupplicate = SqlServerConnection.QueryFirstOrDefault<string>(sqlCommandCheck, param: parameters);
                if (employeeCodeDupplicate != null)
                {
                    return true;
                }
                return false;
            }
        }

        public int Insert(Entity entity)
        {
            throw new NotImplementedException();
        }

        public int Update(Entity entity)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Xóa bản ghi
        /// </summary>
        /// <param name="entityID"></param>
        /// <returns></returns>
        public int Delete(string entityID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = $"Proc_Delete{_className}ByID";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add($"{_className}ID", entityID);
                //Thực thi Procedure
                var rowEffect = SqlServerConnection.Execute(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                //return số cột được tác động/thay đổi
                return rowEffect;
            }
        }
    }
}
