import { useState, useEffect } from 'react'
import styles from "./App.module.scss"
import { toArray } from 'lodash'

function App() {
  const [state, setState] = useState([])
  const [text, setText] = useState('')
  const [filteredState, setFilteredState] = useState([])
  const [capital, setCapital] = useState([])
  const [name, setName] = useState([])
  const [tennuoc, settennuoc] = useState([])
  const [inputcapital, setInputCapital] = useState([])
  const [hours, setHours] = useState([])
  const [state2, setState2] = useState("")
  const [state3, setState3] = useState("")


  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags")
      .then(response => response.json())
      .then(data => setState(data))
      .catch(error => console.log("lỗi1"))
  }, [])

  useEffect(() => {
    const filterResults = () => {
      const filteredResults = state.filter(country => {
        const commonName = country.name.common.toLowerCase()
        const searchText = text.toLowerCase().replace(/\s/g, "")
        const result = commonName.includes(searchText)
        return result
      })
      setFilteredState(filteredResults)
    }
    filterResults()
  }, [text, state])
  // console.log(state.name.common);
  let name1 = filteredState.map((item) => {
    return item.name.common

  })
  const epkieu = name1.toString()
  console.log("epkieu", epkieu);
  useEffect(() => {
    if (epkieu !== "") {
      fetch(`https://restcountries.com/v3.1/name/${epkieu}?fullText=true`)
        .then(response => response.json())
        .then(data => {
          setCapital(data[0].capital)
          setName(data[0].continents)
          settennuoc(data[0].altSpellings)


        })
        .catch(error => console.log("lỗi4"))
    }

  }, [epkieu])
  console.log("tennuoc", tennuoc[tennuoc.length - 1]);
  console.log("thủ đô", capital.toString());

  console.log("khu vực", name);
  const check = name.toString().includes(" ")
  console.log("check", check);
  var nameComplete
  if (check) {

    nameComplete = name.toString().split(" ")[1]
  }
  else {
    nameComplete = name.toString()
  }
  console.log("k", nameComplete);
  // console.log("khu vực1", state2);



  useEffect(() => {
    fetch(`http://worldtimeapi.org/api/timezone/${nameComplete}`)
      .then(response => response.json())
      .then(data => {
        setInputCapital(data)
      })
      .catch(error => console.log(error));
  }, [nameComplete])
  console.log(inputcapital);


  inputcapital.map((item) => { console.log(item); })
  console.log("khu vực1", state2);
  useEffect(() => {
    fetch(`http://worldtimeapi.org/api/timezone/${nameComplete}/${state2}`)
      .then(response => response.json())
      .then(data => setHours(data))
      .catch(error => console.log("lỗi3"))
  }, [nameComplete, state2])
  console.log("giờ", hours.datetime);


  return (
    <>
      <header style={{ margin: "0 auto" }}>
        <h1 style={{ textAlign: "center" }}>Nhập Quốc gia bạn muốn tìm kiếm </h1>
        <input className={styles.input} onChange={e => setText(e.target.value)}></input>
        <input className={styles.input} onChange={e => setState2(e.target.value)}></input>
        <h1>{hours.datetime}</h1>
        <div className={styles.name}>
          {inputcapital.map((item) => <h6>{item} ` `</h6>)}
        </div>
        <h1 className={styles.country}>

          {filteredState.map(country => (
            <div className={styles.item} key={country.name.common}>
              <img width={300} height={200} src={`${country.flags.png}`} alt={country.name.common}></img>
              <p className={styles.text}>{country.name.common}</p>
            </div>
          ))}
        </h1>
        {/* <h1>Nước {epkieu} thuộc khu vực {nameComplete} gồm có giờ của các thành phố sau: </h1> */}
        {/* {ketqua.map((item) => <p>{item}</p>)} */}
        {/* {inputcapital} */}

        {/* {array.map((item) =>
          <h1>{item}</h1>
        )} */}
      </header>
    </>
  )
}

export default App
