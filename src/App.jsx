import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import styles from "./App.module.scss"
import { times } from 'lodash';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [filteredState, setFilteredState] = useState([])
  const [date, setDate] = useState([])
  const [text, setText] = useState('');
  const [array, setArray] = useState(JSON.parse(localStorage.getItem('array')) || []);
  const [formValues, setFormValues] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    birthday: '',
    createdAt: new Date().toLocaleString()
  });

  const newArray = array.map(item => {
    return {
      data: item,
      status: "active"
    }
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleButtonClick = () => {
    if (
      formValues.name.trim() !== '' &&
      formValues.address.trim() !== '' &&
      formValues.phone.trim() !== '' &&
      formValues.email.trim() !== ''
    ) {
      setArray([...array, formValues]);
      setFormValues({
        name: '',
        address: '',
        phone: '',
        email: '',
        birthday: '',
        createdAt: new Date().toLocaleString()
      });

    }


  };
  // console.log(array[0][name], 132);

  // thêm vào localStorage
  useEffect(() => {
    localStorage.setItem('array', JSON.stringify(array));
  }, [array]);
  useEffect(() => {
    const activeArray = newArray.filter(item => item.status === "active");
    localStorage.setItem('array', JSON.stringify(activeArray.map(item => item.data)));
  }, [newArray]);

  // console.log(array[0].name);



  // sửa 
  const handleEditButtonClick = (index) => {
    const itemToEdit = array[index];

    // cập nhật giá trị của ô input
    setFormValues({
      name: itemToEdit.name,
      address: itemToEdit.address,
      phone: itemToEdit.phone,
      email: itemToEdit.email,
    });

    // xóa item khỏi mảng
    const newArray = [...array];
    newArray.splice(index, 1);
    setArray(newArray);
  };
  //tìm
  useEffect(() => {
    const find = () => {
      const filteredResults = array.filter(item => {
        {
          const name = item.name.toLowerCase()
          const searchText = text.toLowerCase().replace(/\s/g, " ")
          const result = name.includes(searchText)
          return result
        }
      })
      setFilteredState(filteredResults)

    }
    find()
  }, [array, text])



  const handleDeleteButtonClick1 = (index) => {
    const newArray = [...array]
    newArray.splice(index, 1)
    setArray(newArray)
  }
  const now = new Date(); // tạo một đối tượng thời gian mới

  const year = now.getFullYear(); // lấy năm hiện tại
  const month = now.getMonth() + 1; // lấy tháng hiện tại (chú ý: tháng trong JavaScript bắt đầu từ 0)
  const day = now.getDate(); // lấy ngày hiện tại
  const hours = now.getHours(); // lấy giờ hiện tại
  const minutes = now.getMinutes(); // lấy phút hiện tại
  const seconds = now.getSeconds(); // lấy giây hiện tại

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`; // định dạng chuỗi ngày giờ theo định dạng mong muốn









  return (
    <>
      <input type='Check name' placeholder='Tìm kiếm' onChange={e => setText(e.target.value)}></input>
      <div className={styles.input}>
        <input type="text" name="name" placeholder='Tên khách hàng' value={formValues.name} onChange={handleInputChange} />
        <input type="text" name="address" placeholder='Địa chỉ' value={formValues.address} onChange={handleInputChange} />
        <input type="text" name="phone" placeholder='Số điện thoại' value={formValues.phone} onChange={handleInputChange} />
        <input type="text" name="email" placeholder='Email' value={formValues.email} onChange={handleInputChange} />
        <input type="text" name="birthday" placeholder='Ngày tháng năm sinh' value={formValues.birthday} onChange={handleInputChange} />

        <button onClick={handleButtonClick}>Lưu</button>
        <button onClick={() => setArray([])}>Xóa All</button>

      </div>

      <div className={styles.item}>
        {filteredState.map((item, index) => {
          const createdAt = new Date(item.created_at).toLocaleString();
          return (
            <div className={styles.item1} key={index}>
              <p>Tên khách hàng: {item.name}</p>
              <p>Email: {item.email}</p>
              <p>Phone: {item.phone}</p>
              <p>Địa chỉ: {item.address}</p>
              <p>Địa chỉ: {item.birthday}</p>
              {/* <p>Ngày tạo: {formattedDate}</p> */}
              <p>Ngày tạo: {item.createdAt}</p>


              {/* <p>Ngày tạo: {new Date()}</p> */}

              {/* <p>{`${year}-${month}-${day} ${hours}:${minutes}`}</p> */}

              <p>{index}</p>
              <button onClick={() => handleDeleteButtonClick1(index)} >xóa</button>
              <button onClick={() => handleEditButtonClick(index)}>sửa</button>
            </div>
          )

        })}
      </div>






    </>
  );
}

export default App;