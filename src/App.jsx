import { useState, useEffect } from 'react'
import styles from "./App.module.scss"
function App() {
  const [state, setState] = useState([])
  const [text, setText] = useState('')
  const [filteredState, setFilteredState] = useState([])

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags")
      .then(response => response.json())
      .then(data => setState(data))
      .catch(error => console.log("lỗi"))
  }, [])

  useEffect(() => {
    const filterResults = () => {
      const filteredResults = state.filter(country => {
        const commonName = country.name.common.toLowerCase()
        const searchText = text.toLowerCase().replace(/\s/g, "")
        return commonName.includes(searchText)
      })
      setFilteredState(filteredResults.slice(0, 10))
    }
    if (text.length > 2) {
      console.log(text.length > 2);
      filterResults()
    } else {
      setFilteredState([])
    }
  }, [text, state])

  return (
    <>
      <header>
        <h1>Nhập Quốc gia bạn muốn tìm kiếm </h1>
        <input onChange={e => setText(e.target.value)}></input>
        <h1>

          {filteredState.map(country => (
            <div className={styles.country} key={country.id}>
              <img src={`${country.flags.png}`} alt={country.name.common}></img>
              <p>{country.name.common}</p>
            </div>
          ))}
        </h1>
      </header>
    </>
  )
}

export default App
