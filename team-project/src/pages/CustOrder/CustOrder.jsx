import React from "react";
import CustDashboard from "./CustDashboard"
import ReadyOrders from "./ReadyOrders"

function CustOrder({tableNumber}) {

  const buttonStyle = {
    backgroundColor: "#36d399",
    color: "black",
    textAlign: 'center',
    width:170,
    height:35,
    marginLeft: 850,
    fontWeight: "bold",
    borderRadius : 100,
  };


    return (
        <>
          <div className="flex flex-col gap-10 container mx-auto">
            <div className="form-control self-end">
              <div className="input-group">
              </div>
            </div>
            <h1 className="text-3xl font-bold">
              Your orders :
            </h1>    
            <CustDashboard tableNumber = {tableNumber}/>              
          </div>
          <button style = {buttonStyle}>Call Waiter</button> 
        </>
      );
}


export default CustOrder;