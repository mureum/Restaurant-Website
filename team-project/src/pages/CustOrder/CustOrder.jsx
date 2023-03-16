import React from "react";
import CustDashboard from "./CustDashboard"
import ReadyOrders from "./ReadyOrders"

function CustOrder({tableNumber}) {

  const buttonStyle = {
    backgroundColor: "#36d399",
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
              Your orders :
            </h1>     
            <CustDashboard/>              
          </div>
          <button style = {buttonStyle}>Call Waiter</button> 
          <h1>{tableNumber}</h1>
        </>
      );
}


export default CustOrder;