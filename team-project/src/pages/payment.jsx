import React, { useState } from "react";
import { Route } from "react-router-dom";
import chip from "../assets/chip.png";
import visa from "../assets/visa.png";
import "../App.css";
import "./style.css";

function Payment() {

  return (
    <div className="container">
      <form>
        <div className="card-container">
          <div className="front">
            <div className="image">
              <img
                src={chip}
                alt="card-logo"
              />
              <div className="chip">
                <img
                  src={visa}
                  alt="card-chip"
                />
              </div>
            </div>
            <div className="card-number-box">
              <span>* * ** 1234</span>
            </div>
            <div className="flexbox">
              <div className="box">
                <span>Card Holder</span>
                <input type="text" placeholder="Full Name" />
              </div>
              <div className="box">
                <span>Expiry Date</span>
                <input type="text" placeholder="MM / YY" />
              </div>
            </div>
          </div>
          <div className="back">
            <div className="stripe"></div>
            <div className="box">
              <span>CVV</span>
              <div className="cvv-box"></div>
            </div>
            <div className="box">
              <img
                src="https://cdn.pixabay.com/photo/2017/05/24/09/31/mastercard-2333232_960_720.png"
                alt="card-logo"
              />
            </div>
          </div>
        </div>
        <div className="inputBox">
          <span>Name on Card</span>
          <input type="text" placeholder="Full Name" />
        </div>
        <div className="inputBox">
          <span>Card Number</span>
          <input type="text" placeholder="0000 0000 0000 0000"  />
        </div>
        <div className="flexbox">
          <div className="inputBox">
            <span>Expiration Date</span>
            <input type="text" placeholder="MM" />
          </div>
          <div className="inputBox">
            <span>CVV</span>
            <input type="text" placeholder="*" />
          </div>
        </div>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
      
    </div>
  );
}

export default Payment;
