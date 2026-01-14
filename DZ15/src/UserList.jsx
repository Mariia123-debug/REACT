import React from "react";

function UserList({ users }) {
  // для проверки частоты перерендеров
  console.count("UserList render");

  return (
    <ul style={{ paddingLeft: 18 }}>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

export default React.memo(UserList);