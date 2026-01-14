import { connect } from "react-redux";

function User({ name, status }) {
  return (
    <div style={boxStyle}>
      <h2>User Info</h2>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  name: state.name,
  status: state.status,
});

const boxStyle = {
  padding: "16px",
  border: "1px solid #e6e6e6",
  borderRadius: "12px",
  marginBottom: "16px",
  background: "#fff",
};

export default connect(mapStateToProps)(User);