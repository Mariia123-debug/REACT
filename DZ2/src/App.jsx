import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Greeting from "./Greeting";

import ShoppingList from "./ShoppingList";




function App() {
  const products = ["Хлеб", "Молоко", "Яблоки", "Кофе"];
  return (
    <>
      <h1>Моё приложение</h1>
      <Greeting name="Мария" />
      <Greeting name="Алекс" />
      <Greeting name="React разработчик" />

      <h1>Мой список покупок</h1>

      <ShoppingList items={products} />

      {/* Проверка пустого списка */}
      <h2>Пустой список:</h2>
      <ShoppingList items={[]} />
    </>
  );
}

export default App;