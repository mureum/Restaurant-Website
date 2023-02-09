import React from 'react';
function Login() {
  const[show,setShow] = React.useState(false);

    return (
      <div>
        <h1>Login</h1>
        <input type ="text" placeholder='Username' />
        <input type ="text" placeholder='Password' />
        <button style={{float: 'left'}} onClick = {() => setShow(true)}>Login</button>
        {show && <p1 style = {{color : 'red'}}>Invalid username or password.</p1>}
      </div>
    );
  };


export default Login;