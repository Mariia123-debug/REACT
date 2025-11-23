import { useState } from 'react';
import Rating from "./Rating";
import List from "./List";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Компонент рейтинга</h1>
      <Rating />
         <List />
      </div>
      
    </>
  )
}

export default App
