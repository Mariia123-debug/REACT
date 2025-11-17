function ShoppingList({ items }) {
  // Если массив пуст → показываем сообщение
  if (!items || items.length === 0) {
    return <p>Список покупок пуст</p>;
  }

  // Если есть элементы → выводим список
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default ShoppingList;