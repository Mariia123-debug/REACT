import { connect } from "react-redux";
import UserItem from "./UserItem";
import styles from "../styles/UserList.module.css";

function UserList({ users, filter }) {
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={styles.list}>
      {filteredUsers.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
}

const mapStateToProps = (state) => ({
  users: state.users,
  filter: state.filter,
});

export default connect(mapStateToProps)(UserList);