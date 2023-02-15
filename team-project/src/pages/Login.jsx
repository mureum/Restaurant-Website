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
        setIsLoggedIn(true);
        navigate("/");
        handleLogin(users[i].permissions); // call handleLogin and pass the user's permissions
        return;
      }
    }
    setShow(true);
  };

  return (
    <body>
      <div className = "center">
        <h1 style = {{fontWeight: "bold"}}>Login</h1>
          <div className = "textField">
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setUsernameInput(e.target.value);
                }}
            />
            <span></span>
            <label>Username : </label>
          </div>
          <div className = "textField">
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                }}
            />
            <span></span>
            <label>Password : </label>        
          </div>
          <button className = 'Button' onClick={login}>Login</button>
          <div style={{ color: "red", fontWeight: "bold" }}>
            {" "}
            {show ? <h1>INVALID LOGIN</h1> : null}
          </div>
      </div>
    </body>
  );
}

export default Login;


