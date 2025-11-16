export default function ListsComponent() {
  return (
    <section>
      <h2>ListsComponent</h2>

      <h3>Неупорядоченный список</h3>
      <ul>
        <li>
          Фрукты
          <ul>
            <li>Яблоко</li>
          </ul>
        </li>
        <li>Овощи</li>
      </ul>

      <h3>Упорядоченный список</h3>
      <ol>
        <li>
          Шаг 1
          <ol>
            <li>Подшаг 1.1</li>
          </ol>
        </li>
        <li>Шаг 2</li>
      </ol>
    </section>
  );
}