import React, { useState } from "react";
import CustDashboard from "./CustDashboard";
import ReadyOrders from "./ReadyOrders";

function CustOrder({ tableNumber }) {
  const [showPopup, setShowPopup] = useState(false);
  const [tableNumberInput, setTableNumberInput] = useState("");
  const [issueInput, setIssueInput] = useState("");

  const buttonStyle = {
    backgroundColor: "#36d399",
    color: "black",
    textAlign: "center",
    width: 170,
    height: 35,
    marginLeft: 850,
    fontWeight: "bold",
    borderRadius: 100,
  };

  const handleAssistanceClick = () => {
    setShowPopup(true);
  };

  const handlePopupSubmit = (event) => {
    event.preventDefault();
    // do something with the tableNumberInput and issueInput, such as send them to the server or display them in the UI
    setShowPopup(false);
    setTableNumberInput("");
    setIssueInput("");
  };

  return (
    <>
      <div className="flex flex-col gap-10 container mx-auto">
        <div className="form-control self-end">
          <div className="input-group"></div>
        </div>
        <h1 className="text-3xl font-bold">Your orders :</h1>
        <CustDashboard tableNumber={tableNumber} />
      </div>
      <button style={buttonStyle} onClick={handleAssistanceClick}>
        Assistance Required
      </button>
      {showPopup && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Assistance Requested</h2>
            <form onSubmit={handlePopupSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="tableNumberInput">
                  Table Number:
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                  type="text"
                  id="tableNumberInput"
                  value={tableNumberInput}
                  onChange={(event) => setTableNumberInput(event.target.value)}
                  style={{ width: "100%", minWidth: "500px" }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="issueInput">
                  What is your issue?
                </label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                  id="issueInput"
                  rows="6"
                  value={issueInput}
                  onChange={(event) => setIssueInput(event.target.value)}
                ></textarea>
              </div>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CustOrder;