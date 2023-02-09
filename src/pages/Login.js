import React from 'react';
import axios from 'axios';



function Login() {
  const[username,setUsername] = React.useState('');
  const[password,setPassword] = React.useState('');
  const[text,setText] = React.useState('');

  const Login = () => {
    
    axios.post("http://localhost:8800/logins", {
      username : username,
      password : password,
    }).then((response) => {
      setText(response);
    });
  }

    return (
      <div>
        <h1>Login</h1>
        <input type ="text" placeholder='Username' onChange = {(e) => {setUsername(e.target.value)}}/>
        <input type ="text" placeholder='Password' onChange = {(e) => {setPassword(e.target.value)}}/>
        <button style={{float: 'left'}} onClick = {() => Login()}>Login</button>
        <h1>{text}</h1>
      </div>
    );
  };


export default Login;