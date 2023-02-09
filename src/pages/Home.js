import React from 'react';
import {useNavigate} from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home</h1 >
      <button style={{float: 'left'}} onClick = {() => {navigate("/Menu")}} >MENU</button>
    </div>
  );

};


export default Home;
