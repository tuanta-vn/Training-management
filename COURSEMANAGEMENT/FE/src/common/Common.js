//Create by: TUANTA - 02/17/2023
//Modified by TUANTA - 02/24/2023
//                    + Update: thêm hàm tính tuổi getAge()

class Common {

  //Hàm format ngày tháng
  formatBindingDate = (date) => {
    try {
      if (date != null) {
        date = new Date(date);
        // Chuyển sang dữ liệu dạng Date
        let day = date.getDate();
        day = day < 10 ? `0${day}` : day;
        let month = date.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        let year = date.getFullYear();
        return `${year}-${month}-${day}`;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Hàm tính tuổi
  getAge(dateString) 
    {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
    }
}

export default Common;