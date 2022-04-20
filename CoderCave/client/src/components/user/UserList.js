import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Container, Button } from "reactstrap";
import { UserContext } from "../../providers/UserProvider";
import User from "./User";

const UserList = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const { getActiveUsers, getInactiveUsers } = useContext(UserContext);

  const [users, setUsers] = useState([]);

  const [userListType, setUserListType] = useState("");

  const userListToSelect = userListType === "Active" ? "Inactive" : "Active";

  const viewUserList = () => {

    const userListPath = userListToSelect.toLocaleLowerCase();

    navigate(`/user/${userListPath}`);
    
  };

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
  }, [users]);

  return (
    <Container >
      <h2>{userListType} Users</h2>
      <Button onClick={() => viewUserList()} >View {userListToSelect} Users</Button>
      <div className="user-list" >
        {users.map(u => <User key={u.id} user={u} status={userListType} />)}
      </div>
    </Container>
  );
};

export default UserList;