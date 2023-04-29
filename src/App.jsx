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
      birthday: itemToEdit.email,
      createdAt: new Date().toLocaleString(),

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


  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const fileText = JSON.stringify(array, null, 2).replace(/\\n/g, "\n");
    const file = new Blob([fileText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "myArray.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };






  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Quản Lý Khách Hàng</h1>
        <input className={styles.find} type='Check name' placeholder='Tìm kiếm' onChange={e => setText(e.target.value)}></input>
        <div className={styles.header}>
          <div className={styles.input}>

            <div className={styles.box}>
              <strong className={styles.strong}>Tên khách hàng </strong>
              <input type="text" name="name" value={formValues.name} onChange={handleInputChange} />
            </div>
            <div className={styles.box}>
              <strong className={styles.strong}>Địa chỉ:</strong>
              <input type="text" name="address" value={formValues.address} onChange={handleInputChange} />
            </div>
            <div className={styles.box}>
              <strong className={styles.strong}>Số điện thoại: </strong>
              <input type="text" name="phone" value={formValues.phone} onChange={handleInputChange} />
            </div>

            <div className={styles.box}>
              <strong className={styles.strong}>Tên khách hàng: </strong>
              <input type="text" name="email" value={formValues.email} onChange={handleInputChange} />
            </div>
            <div className={styles.box}>
              <strong className={styles.strong}>Ngày tháng năm sinh: </strong>
              <input type="text" name="birthday" value={formValues.birthday} onChange={handleInputChange} />
            </div>

            <button onClick={handleButtonClick}>Lưu</button>
            <button onClick={() => setArray([])}>Xóa All</button>
            <button onClick={downloadTxtFile}>Tải xuống</button>

          </div>


        </div>

        <div className={styles.body}>
          <p className={styles.index}>STT</p>
          <p >|</p>
          <p className={styles.name}>Tên khách hàng</p>
          <p >|</p>
          <p className={styles.email}>Email</p>
          <p >|</p>
          <p className={styles.address}>Địa chỉ</p>
          <p >|</p>
          <p className={styles.phone}>Số điện thoại</p>
          <p >|</p>
          <p className={styles.birthday}>Ngày sinh</p>
          <p >|</p>
          <p className={styles.createdAt}> Giờ khỏi tạo</p>




        </div>
        <div className={styles.item}>
          {filteredState.map((item, index) => {
            const createdAt = new Date(item.created_at).toLocaleString();
            return (
              <div className={styles.item1} key={index}>
                <p className={styles.index}>{index}</p>
                <p>|</p>
                <p className={styles.name}>{item.name}</p>
                <p>|</p>
                <p className={styles.email}>{item.email}</p>
                <p>|</p>
                <p className={styles.address}>{item.address}</p>
                <p>|</p>
                <p className={styles.phone}> {item.phone} </p>
                <p>|</p>
                <p className={styles.birthday}>{item.birthday}</p>
                <p>|</p>
                <p className={styles.createdAt}>{item.createdAt}</p>
                <button className={styles.delete} onClick={() => handleDeleteButtonClick1(index)} >xóa</button>
                <button className={styles.repair} onClick={() => handleEditButtonClick(index)}>sửa</button>
              </div>
            )

          })}
        </div>
      </div>





    </>
  );
}

export default App;