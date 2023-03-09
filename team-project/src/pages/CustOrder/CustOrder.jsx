import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CustDashboard from "./CustDashboard"
import ReadyOrders from "./ReadyOrders"

function CustOrder({ setIsLoggedIn, handleLogin }) {

  const buttonStyle = {
    backgroundColor: "gray",
    color: "black",
    textAlign: 'center',
    width:170,
    height:40,
    marginLeft: 850,
    borderRadius : 50,
  };

    return (
        <>
          <div className="flex flex-col gap-10 container mx-auto">
            <div className="form-control self-end">
              <div className="input-group">
              </div>
            </div>
            <h1 className="text-3xl font-bold">
              Pending Orders :
            </h1>     
            <CustDashboard/>       
            <h1 className="text-3xl font-bold">
              Ready to collect:
            </h1>     
            <ReadyOrders/>

                
          </div>
          <button style = {buttonStyle}>Call Waiter</button> 
        </>
      );
}


export default CustOrder;