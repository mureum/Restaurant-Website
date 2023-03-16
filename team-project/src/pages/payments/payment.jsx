import React from 'react';
import { Route } from 'react-router-dom';
import './styles.css';

function App() {
  return (
    <div className="container">
      <form action="">
        <div className="row">
          <div className="col">
            <h3 className="title">billing address</h3>

            <div className="inputBox">
              <span>full name :</span>
              <input type="text" placeholder="john deo" />
            </div>
            <div className="inputBox">
              <span>email :</span>
              <input type="email" placeholder="example@example.com" />
            </div>
            <div className="inputBox">
              <span>address :</span>
              <input type="text" placeholder="street" />
            </div>
            

            <div className="flex">
              <div className="inputBox">
                <span>state :</span>
                <input type="text" placeholder="india" />
              </div>
              
            </div>
          </div>

          <div className="col">
            <h3 className="title">payment</h3>

            <div className="inputBox">
              <span>name on card :</span>
              <input type="text" placeholder="mr. john deo" />
            </div>
            <div className="inputBox">
              <span>card number :</span>
              <input type="number" placeholder="****************" />
            </div>
            <div className="inputBox">
              <span>exp month :</span>
              <input type="text" placeholder="january" />
            </div>

            <div className="flex">
              <div className="inputBox">
                <span>exp year :</span>
                <input type="number" placeholder="2022" />
              </div>
              <div className="inputBox">
                <span>CVV :</span>
                <input type="text" placeholder="1234" />
              </div>
            </div>
          </div>
        </div>

        <input
          type="submit"
          value="proceed to checkout"
          className="submit-btn"
        />
      </form>
    </div>
  );
}

export default App;
