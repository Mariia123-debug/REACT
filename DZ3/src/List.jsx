import { useState } from "react";

function List() {
  // начальное состояние — массив людей
  const [people, setPeople] = useState([
    { id: 1, name: 'Иван', age: 20 },

    { id: 2, name: 'Мария', age: 22 },

    { id: 3, name: 'Алексей', age: 21 },

    { id: 4, name: 'Марина', age: 19 },

    { id: 5, name: 'Даша', age: 23 },

    { id: 6, name: 'Глеб', age: 24 },

    { id: 7, name: 'Дима', age: 18 },

    { id: 8, name: 'Гриша', age: 20 },

    { id: 9, name: 'Серафим', age: 21 },
  ]);

  // функция удаления человека
  const deletePerson = (id) => {
    const updatedList = people.filter((person) => person.id !== id);
    setPeople(updatedList);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", textAlign: "left" }}>
      <h2 style={{ textAlign: "center" }}>Список приглашённых</h2>

      <ul style={{ padding: 0 }}>
        {people.map((person) => (
          <li
            key={person.id}
            style={{
              listStyle: "none",
              background: "#f0f0f0",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              <strong>{person.name}</strong> — {person.age} лет
            </span>

            <button
              onClick={() => deletePerson(person.id)}
              style={{
                padding: "6px 10px",
                backgroundColor: "#d9534f",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;