import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Container } from "reactstrap";
import { UserContext } from "../../providers/UserProvider";
import User from "./User";

const UserList = () => {

  const location = useLocation();

  const { getActiveUsers, getInactiveUsers } = useContext(UserContext);

  const [users, setUsers] = useState([]);

  const [userListType, setUserListType] = useState("");

  useEffect(() => {
    const [,,currentPath] = location.pathname.split('/');
    const isActivePath = currentPath === 'active';
    const currentPathToDisplay = currentPath.split('').map((c, i) => i === 0 ? c.toUpperCase() : c ).join('');

    setUserListType(currentPathToDisplay);

    if (isActivePath) {
      getActiveUsers()
        .then(setUsers);
    } else {
      getInactiveUsers()
        .then(setUsers);
    }
  }, []);

  return (
    <Container >
      <h2>{userListType} Users</h2>
      <div className="user-list" >
        {users.map(u => <User key={u.id} user={u} status={userListType} />)}
      </div>
    </Container>
  );
};

export default UserList;