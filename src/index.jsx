import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import styles from "./App.module.scss"
import { times } from 'lodash';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [text, setText] = useState('');

    const [formValues, setFormValues] = useState({
        name: '',
        address: '',
        phone: '',
        email: ''
    })
    const [filteredState, setFilteredState] = useState([])
    const [array, setArray] = useState(JSON.parse(localStorage.getItem('array')) || []);
    const [display, setDisplay] = useState(false)
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date());
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleButtonClick = () => {
        if (inputValue.trim() !== '') {
            setArray([...array, inputValue]);
            setInputValue('');
            const currentDate = new Date();
            setDate(currentDate.toLocaleDateString());
            setTime(currentDate.toLocaleTimeString());


        }
    };
    console.log("date hieejn taji ", date);
    const handleDeleteButtonClick = () => {
        setArray([]);
    };

    const handleEditButtonClick = (index) => {
        setInputValue(array[index]);
        setArray([
            ...array.slice(0, index), // các phần tử trước chỉ mục cần chỉnh sửa
            ...array.slice(index + 1) // các phần tử sau chỉ mục cần chỉnh sửa
        ]);
    };

    useEffect(() => {
        localStorage.setItem('array', JSON.stringify(array));
    }, [array]);

    const handleDeleteButtonClick1 = (index) => {
        const newArray = [...array]
        newArray.splice(index, 1)
        setArray(newArray)


    }
    console.log(text);
    console.log(inputValue);
    useEffect(() => {
        const find = () => {
            const filteredResults = array.filter(item => {
                if (item !== null) {
                    const name = item.toLowerCase()
                    const searchText = text.toLowerCase().replace(/\s/g, "")
                    const result = name.includes(searchText)
                    return result
                }
            })
            setFilteredState(filteredResults)

        }
        find()
    }, [array, text])
    console.log(array);
    const handleDisplayButtonClick = () => {
        setDisplay(!display); // Đảo ngược giá trị boolean của display
    }

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(array)], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "myArray.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }
    const handleSave = () => {
        // do something with formValues
        console.log(formValues);
    }

    console.log("date", date);
    return (
        <>
            <header style={{ margin: "0 auto" }}>
                <div>
                    <div>
                        <input type="text" name="name" value={formValues.name} onChange={handleInputChange} />
                        <input type="text" name="address" value={formValues.address} onChange={handleInputChange} />
                        <input type="text" name="phone" value={formValues.phone} onChange={handleInputChange} />
                        <input type="text" name="email" value={formValues.email} onChange={handleInputChange} />
                    </div>
                    {/* <div>{time.toLocaleTimeString()}</div> */}
                    {/* <input type='text' placeholder='Nhap name' onChange={e => setText(e.target.value)}></input> */}



                    <button onClick={downloadTxtFile}>Tải xuống</button>
                    <input type="text" placeholder='Nhap name13' value={inputValue} onChange={handleInputChange} />
                    <button onClick={handleButtonClick} >Lưu giá trị</button>


                    <button onClick={handleDeleteButtonClick}>Xóa</button>
                    <button onClick={handleDisplayButtonClick}> {display ? 'Ẩn danh sách' : 'Hiện danh sách'}</button>
                </div>
                {display && filteredState.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <span>{item}</span>

                        <button onClick={() => handleEditButtonClick(index)}>Sửa</button>
                        <button onClick={() => handleDeleteButtonClick1(index)}>Xóa</button>
                    </div>
                ))}
                {filteredState.length}
            </header>
        </>
    );
}

export default App;