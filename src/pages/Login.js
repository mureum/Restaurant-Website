import React, { useEffect } from 'react';
import Axios from 'axios';
import "./App.css";

function Login() {
  const[usernameInput,setUsernameInput] = React.useState('');
  const[passwordInput,setPasswordInput] = React.useState('');
  const[users,setUsers] = React.useState([]);
  const[show,setShow] = React.useState(false);
  
  
  useEffect(() => {
    Axios.get("http://localhost:8800/logins").then((response) => {
      setUsers(response.data);
    })
  })

  const Login = () => {
    for(var i = 0; i < users.length ; i++){
      if(usernameInput === users[0].username && passwordInput === users[0].password){
        console.log('TRUE');
        setShow(false);
      } else {
        setShow(true);
      }
    }

  }

    return (
      <div>
        <h1>Login</h1>
        <div className ="form">
          <label>Username:</label>
          <input type ="text" placeholder='Username' onChange = {(e) => {setUsernameInput(e.target.value)}}/>
          <label>Password:</label>
          <input type ="text" placeholder='Password' onChange = {(e) => {setPasswordInput(e.target.value)}}/>
        </div>
        <button onClick = {Login}>Login</button>
        <div style = {{color : 'red'}}> {show? <h1>INVALID LOGIN</h1> : null}</div>
      </div>
    );
  };


export default Login;