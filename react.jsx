import React, { useState } from 'react';
import './hzstyle.css';

function HelpButton() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [tableNumber, setTableNumber] = useState('');
  
    const handleButtonClick = () => {
      setIsPopupVisible(true);
    };
  
    const handleCloseButtonClick = () => {
      setIsPopupVisible(false);
    };
  
    const handleTableNumberChange = (event) => {
      setTableNumber(event.target.value);
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      // Do something with the table number and problem description
      setIsPopupVisible(false);
    };
  
    return (
      <>
        <button onClick={handleButtonClick}>ASSISTANCE REQUIRED</button>
  
        {isPopupVisible && (
          <div>
            <h2>Assistance Form</h2>
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="table-number">Table Number:</label>
              <input
                type="number"
                id="table-number"
                name="table-number"
                min="1"
                value={tableNumber}
                onChange={handleTableNumberChange}
              />
              <div className="problem">
                <label htmlFor="issue">What problem/issue are you having?</label>
                <textarea id="issue" name="issue"></textarea>
              </div>
              <button onClick={handleCloseButtonClick}>Close</button>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </>
    );
  }
  
  export default HelpButton;