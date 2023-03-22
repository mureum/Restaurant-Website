import React, { useState } from "react";
import CustDashboard from "./CustDashboard";
import axios from "axios";
function CustOrder({ tableNumber }) {
  const [showPopup, setShowPopup] = useState(false);
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
  const sendIssue = async (issueInput) => {
    try {
      if(issueInput.length > 0){
        var totalIssue = [tableNumber,issueInput];
        console.log(totalIssue);

        const response = await axios.post(`http://localhost:8800/sendIssue`, {
          totalIssue,
        });

        if (response.data.success) {
          window.alert("A waiter should be over shortly");
          setIssueInput("");
          setShowPopup(false);
        } else {
          console.log("ERROR");
        }
      } else {
        window.alert("Please enter your issue");
      }
    
    } catch (err) {
      console.log("ERROR");
      console.log(err);
    }

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
                onClick = {() => sendIssue(issueInput)}
              >
                Submit
              </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CustOrder;