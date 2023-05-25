using CourseManagement.Core.Enities;
using CourseManagement.Core.Interfaces.Infrastracture;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Infrastructure.Repository
{
    /// <summary>
    /// Class TrainerRepository kế thừa từ BaseRepository, ITrainerRepository
    /// Create by: TUANTA
    /// Create date: 02/14/2023
    /// </summary>
    public class TrainerRepository : BaseRepository<Trainer>, ITrainerRepository
    {
        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="configuration"></param>
        public TrainerRepository(IConfiguration configuration) : base(configuration)
        {
        }

        /// <summary>
        /// Hàm thêm một Trainer
        /// </summary>
        /// <param name="trainer"></param>
        /// <returns></returns>
        public int Insert(Trainer trainer)
        {
            //Kết nối tới Database
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_InsertTrainer";
                //Truyền tham số
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TrainerCode", trainer.TrainerCode);
                parameters.Add("@TrainerName", trainer.TrainerName);
                parameters.Add("@MobilePhone", trainer.MobilePhone);
                parameters.Add("@Email", trainer.Email);
                parameters.Add("@Gender", trainer.Gender);
                parameters.Add("@DateOfBirth", trainer.DateOfBirth);
                parameters.Add("@CreateBy", trainer.CreateBy);
                //Thực thi Procedure
                var rowEffect = SqlServerConnection.Execute(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                //return số cột được tác động/thay đổi
                return rowEffect;
            }
        }

        /// <summary>
        /// Sửa một Trainer
        /// </summary>
        /// <param name="trainer"></param>
        /// <returns></returns>
        public int Update(Trainer trainer)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlComand = "Proc_UpdateTrainer";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TrainerID", trainer.TrainerID);
                parameters.Add("@TrainerCode", trainer.TrainerCode);
                parameters.Add("@TrainerName", trainer.TrainerName);
                parameters.Add("@MobilePhone", trainer.MobilePhone);
                parameters.Add("@Email", trainer.Email);
                parameters.Add("@Gender", trainer.Gender);
                parameters.Add("@DateOfBirth", trainer.DateOfBirth);

                //Thực thi Procedure
                var rowEffect = SqlServerConnection.Execute(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                //return số cột được tác động/thay đổi
                return rowEffect;
            }
        }
        
        /// <summary>
        /// Hàm kiểm tra số điện thoại có tồn tại trong bảng Trainer hay chưa
        /// </summary>
        /// <param name="mobilePhone"></param>
        /// <returns></returns>
        public bool IsMobilePhoneDupplicate(string mobilePhone)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("TUANTA")))
            {
                var sqlCommand = $"SELECT TrainerCode FROM Trainer WHERE MobilePhone = '{mobilePhone}'";
                
                if (string.IsNullOrEmpty(SqlServerConnection.QueryFirstOrDefault<string>(sqlCommand)))
                {
                    return false;
                }
                return true;
            }
        }
    }
}
