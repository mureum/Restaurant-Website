import React, { useEffect } from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login() {
  const[usernameInput,setUsernameInput] = React.useState('');
  const[passwordInput,setPasswordInput] = React.useState('');
  const[users,setUsers] = React.useState([]);
  const[show,setShow] = React.useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    Axios.get("http://localhost:8800/logins").then((response) => {
      setUsers(response.data);
    })
  })

  const Login = () => {
    for(var i = 0; i < users.length ; i++){
      if(usernameInput === users[i].username && passwordInput === users[i].password){
        setShow(false);
        console.log('TRUE');
        navigate("/");
      } else {
        setShow(true);
        console.log('False');
      }
    }

  }

    return (
      <div>
        <h1>Login</h1>
        <div className ="form">
          <label>Username :  </label>
          <input type ="text" placeholder='Username' onChange = {(e) => {setUsernameInput(e.target.value)}}/>
          <label>Password :  </label>
          <input type ="text" placeholder='Password' onChange = {(e) => {setPasswordInput(e.target.value)}}/>
        </div>
        <button onClick = {Login}>Login</button>
        <div style = {{color : 'red',fontWeight: 'bold'}}> {show? <h1>INVALID LOGIN</h1> : null}</div>
      </div>
    );
  };


export default Login;
