import { useState } from "react";
import { connect } from "react-redux";
import { setUserInfo } from "./redux/actions";

function UserForm({ setUserInfo }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !status.trim()) return;

    setUserInfo({ name, status });
    setName("");
    setStatus("");
  };

  return (
    <form onSubmit={handleSubmit} style={boxStyle}>
      <h2>Update User</h2>
      <input
        type="text" placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={inputStyle}
      />

      <button type="submit" style={buttonStyle}>
        Save
      </button>
    </form>

  );
}

const boxStyle = {
  padding: "16px",
  border: "1px solid #e6e6e6",
  borderRadius: "12px",
  background: "#fff",
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #d0d0d0",
};

const buttonStyle = {
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid #d0d0d0",
  background: "#f7f7f7",
  cursor: "pointer",
};

export default connect(null, { setUserInfo })(UserForm);