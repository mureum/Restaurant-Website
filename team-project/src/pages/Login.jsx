import React, { useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Login.css";

function Login({ setIsLoggedIn, handleLogin }) {
  const [usernameInput, setUsernameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    Axios.get("http://localhost:8800/logins").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const login = () => {
    for (var i = 0; i < users.length; i++) {
      if (
        usernameInput === users[i].username &&
        passwordInput === users[i].password
      ) {
        setShow(false);
        console.log("TRUE");
        setIsLoggedIn(true);
        navigate("/");
        handleLogin(users[i].permissions); // call handleLogin and pass the user's permissions
        return;
      }
    }
    setShow(true);
    console.log("False");
  };

  return (
    <div>
      <h1>Login</h1>
      <div className="form">
        <label>Username : </label>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsernameInput(e.target.value);
          }}
        />
        <label>Password : </label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPasswordInput(e.target.value);
          }}
        />
      </div>
      <button onClick={login}>Login</button>
      <div style={{ color: "red", fontWeight: "bold" }}>
        {" "}
        {show ? <h1>INVALID LOGIN</h1> : null}
      </div>
    </div>
  );
}

export default Login;
