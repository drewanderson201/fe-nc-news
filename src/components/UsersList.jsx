import UserCard from "./UserCard"
import { useState, useEffect } from "react";
import { getUsers } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Loading from "./Loading";
import Error from "./Error";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

export default function UserList() {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const { loggedInUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);



  let {state} = useLocation()



  useEffect(() => {
    getUsers()
      .then((data) => {
        const users = data.users;
        setUsersData(users);
        setIsLoading(false);
      })
      .catch((error) => {
        const errMsg = error.response.data.msg;
        setIsError(true);
        setError(errMsg);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;

  if (isError) return <Error error={error} />;



  return (
    <div className={`users-component ${theme}`}>
      <hr />
      <h2>Users</h2>
      {loggedInUser.username !== undefined ? (
        <>
          <p>Currently logged in as {loggedInUser.name}</p>
          <p>To change please select a user below:</p>
        </>
      ) : (
        <p>Please select a user below:</p>
      )}
      <hr />
      <ul className="user-list">
        {usersData.map((user) => {
          return <UserCard key={user.username} user={user} from={state?state.from:""} />;
        })}
      </ul>
    </div>
  );
}

