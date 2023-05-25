using CourseManagement.Core.Enities;
using CourseManagement.Core.Exceptions;
using CourseManagement.Core.Interfaces.Infrastracture;
using CourseManagement.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CourseManagement.Core.Services
{
    /// <summary>
    /// class TrainerService kế thừa từ Interface ITrainerService
    /// Create by: TUANTA
    /// Create date: 02/14/2023
    /// </summary>
    public class TrainerService : ITrainerService
    {
        ITrainerRepository _trainerRepository;

        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="trainerRepository"></param>
        public TrainerService(ITrainerRepository trainerRepository)
        {
            _trainerRepository = trainerRepository;
        }

        /// <summary>
        /// Hàm validate dữ liệu và thêm mới một Trainer
        /// </summary>
        /// <param name="trainer"></param>
        /// <returns></returns>
        /// <exception cref="ValidateException"></exception>
        public int InsertService(Trainer trainer)
        {
            trainer.TrainerID = new Guid();

            #region Validate
            //Validate dữ liệu
            //1.Mã giảng viên không được để trống & không được trùng & đủ độ dài
            //Check mã không được phép để trống
            if (string.IsNullOrEmpty(trainer.TrainerCode))
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_TrainerCodeNotEmpty);
            }

            //Check độ dài
            if (trainer.TrainerCode.Length < 3 || trainer.TrainerCode.Length > 20)
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidTrainerCodeLength);
            }

            //Check trùng mã giảng viên
            var isDuplicatetrainerCode = _trainerRepository.IsDuplicateCode(trainer.TrainerCode);
            if (isDuplicatetrainerCode)
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_TrainerCodeDuplicate);
            }

            //2. Tên giảng viên không được để trống
            if (string.IsNullOrEmpty(trainer.TrainerName))
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_TrainerNameNotEmpty);
            }

            //3.Số điện thoại phải đúng định dạng và không được trùng
            //Check trùng số điện thoại
            if (!string.IsNullOrEmpty(trainer.MobilePhone))
            {
                if (_trainerRepository.IsMobilePhoneDupplicate(trainer.MobilePhone))
                {
                    throw new ValidateException(Resources.ResourceEN.EN_ValidateError_MobilePhoneDuplicate);
                }
                if (!IsPhoneNumber(trainer.MobilePhone))
                {
                    throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidMobilePhone);
                }
            }

            //4.Email đúng định dạng
            if (!string.IsNullOrEmpty(trainer.Email))
            {
                if (!IsValidEmail(trainer.Email))
                {
                    throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidEmail);
                }
            }

            //5.Ngày sinh phải đủ tuổi
            if (new DateTime(DateTime.Now.Subtract((DateTime)trainer.DateOfBirth).Ticks).Year - 1 < 18)
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidDateOfBirth);
            }
            #endregion

            //Thực hiện thêm mới vào db
            var rowEffect = _trainerRepository.Insert(trainer);
            return rowEffect;
        }

        /// <summary>
        /// Hàm validate dữ liệu và sửa một Trainer
        /// </summary>
        /// <param name="trainer"></param>
        /// <returns></returns>
        /// <exception cref="ValidateException"></exception>
        public int UpdateService(Trainer trainer)
        {
            #region Validate
            //Validate dữ liệu
            //1.Mã giảng viên không được để trống & không được trùng & đủ độ dài
            //Check mã không được phép để trống
            if (string.IsNullOrEmpty(trainer.TrainerCode))
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_TrainerCodeNotEmpty);
            }

            //Check độ dài
            if (trainer.TrainerCode.Length < 3 || trainer.TrainerCode.Length > 20)
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidTrainerCodeLength);
            }

            //Check trùng mã giảng viên
            //Khi mã giảng viên khác với mã cũ thì kiểm tra xem có trùng với mã khác không
            if (trainer.TrainerCode != _trainerRepository.GetById(trainer.TrainerID).TrainerCode)
            {
                var isDuplicate = _trainerRepository.IsDuplicateCode(trainer.TrainerCode);
                if (isDuplicate == true)
                {
                    throw new ValidateException(Resources.ResourceEN.EN_ValidateError_TrainerCodeDuplicate);
                }
            }

            //2. Tên giảng viên không được để trống
            if (string.IsNullOrEmpty(trainer.TrainerName))
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_TrainerNameNotEmpty);
            }

            //3.Số điện thoại phải đúng định dạng và không được trùng
            //Check trùng số điện thoại
            if (!string.IsNullOrEmpty(trainer.MobilePhone))
            {
                if (trainer.MobilePhone != _trainerRepository.GetById(trainer.TrainerID).MobilePhone)
                {
                    if (_trainerRepository.IsMobilePhoneDupplicate(trainer.MobilePhone))
                    {
                        throw new ValidateException(Resources.ResourceEN.EN_ValidateError_MobilePhoneDuplicate);
                    }
                    if (!IsPhoneNumber(trainer.MobilePhone))
                    {
                        throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidMobilePhone);
                    }
                }
            }

            //4.Email đúng định dạng
            if (!string.IsNullOrEmpty(trainer.Email))
            {
                if (!IsValidEmail(trainer.Email))
                {
                    throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidEmail);
                }
            }

            //5.Ngày sinh phải đủ tuổi
            if (new DateTime(DateTime.Now.Subtract((DateTime)trainer.DateOfBirth).Ticks).Year - 1 < 18)
            {
                throw new ValidateException(Resources.ResourceEN.EN_ValidateError_InvalidDateOfBirth);
            }
            #endregion

            //Thực hiện thêm mới vào db
            var rowEffect = _trainerRepository.Update(trainer);
            return rowEffect;

        }

        /// <summary>
        /// Hàm Validate Email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        private bool IsValidEmail(string email)
        {
            var trimmedEmail = email.Trim();

            if (trimmedEmail.EndsWith("."))
            {
                return false;
            }
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == trimmedEmail;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Hàm validate số điện thoại
        /// </summary>
        /// <param name="number"></param>
        /// <returns></returns>
        public bool IsPhoneNumber(string number)
        {
            string motif = @"^0([0-9]){9}";
            return Regex.IsMatch(number, motif);
        }
    }
}
