import React, { useState } from 'react';
import './hzstyle.css';

function App() {
  const [tableNumber, setTableNumber] = useState(1);
  const [issue, setIssue] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleTableNumberChange = (event) => {
    setTableNumber(event.target.value);
  };

  const handleIssueChange = (event) => {
    setIssue(event.target.value);
  };

  const handleHelpBtnClick = () => {
    setShowPopup(true);
  };

  const handleCloseBtnClick = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <button id="help-btn" onClick={handleHelpBtnClick}>ASSISTANCE REQUIRED</button>

      {showPopup && (
        <div id="help-popup">
          <h2>Assistance Form</h2>
          <label htmlFor="table-number">Table Number:</label>
          <input type="number" id="table-number" name="table-number" min="1" value={tableNumber} onChange={handleTableNumberChange} /><br /><br />
          <div className="problem">
            <label htmlFor="issue">What problem/issue are you having?</label>
            <textarea id="issue" name="issue" value={issue} onChange={handleIssueChange}></textarea>
          </div>
          <button id="close-btn" onClick={handleCloseBtnClick}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
