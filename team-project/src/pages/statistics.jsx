import React, { useState, useEffect } from "react";
import axios from "axios";

function FoodStatisticsTable() {
  const [items, setItems] = useState([]);
  const [dailyRev, setDailyRev] = useState([]);
  const [totalRev, setTotalRev] = useState([]);
  const [showItemsTable, setShowItemsTable] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [itemsResult, dailyRevResult, totalRevResult] = await Promise.all([
          axios.get("http://localhost:8800/stock_level"),
          axios.get("http://localhost:8800/daily_revenue"),
          axios.get("http://localhost:8800/SumTotalRevenue"),
        ]);
        setItems(itemsResult.data);
        setDailyRev(dailyRevResult.data);
        setTotalRev(totalRevResult.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(items);
  }, [items]);

  const getStockLevelColor = (stockLevel) => {
    if (stockLevel >= 70) {
      return "green";
    } else if (stockLevel >= 30 && stockLevel < 70) {
      return "orange"; // Amber (between 70 and 99)
    } else if (stockLevel >= 0 && stockLevel < 30) {
      return "red"; // Low Stock (between 20 and 39)
    } else {
      return "darkred"; // Out of Stock (below 20)
    }
  };

  const toggleTable = () => {
    setShowItemsTable(!showItemsTable);
  };

  return (
    <div style={pageStyle}>
      <div style={headerContainer}>
        <h1 style={headerStyle}>Food Statistics</h1>
        {totalRev.length > 0 ? (
          <p style={totalRevenueStyle}>
            Total Revenue so far: $ {totalRev[0].total_revenue_sum}
          </p>
        ) : (
          <p style={totalRevenueStyle}>Total Revenue is $0</p>
        )}
      </div>

      <div style={tableContainer}>
        <div style={leftContainer}>
          <button onClick={toggleTable} style={buttonStyle}>
            {showItemsTable ? "Switch to Daily Revenue Table" : "Switch to Items Table"}
          </button>
          {showItemsTable ? (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Is Available</th>
                  <th>In Stock</th>
                  <th>Sold</th>
                </tr>
              </thead>
              <tbody>
                {items
                  .sort((a, b) => a.item_id.localeCompare(b.item_id))
                  .map((item) => (
                    <tr key={item.item_id}>
                      <td> {item.name}</td>
                      <td>{item.is_available ? "Yes" : "No"}</td>
                      <td
                        style={{
                          color: getStockLevelColor(item.stock_available),
                        }}
                      >
                        {item.stock_available}
                      </td>
                      <td>{100 - item.stock_available}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Total Revenue</th>
                </tr>
              </thead>
              <tbody>
                {dailyRev.map((rev) => (
                  <tr key={rev.date}>
                    <td>{new Date(rev.date).toLocaleDateString()}</td>
                    <td>{rev.total_revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div style={rightContainer}>{/* empty container for spacing */}</div>
      </div>
    </div>
  );
}

const pageStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "50px",
};

const headerContainer = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: "50px",
};

const leftContainer = {
  flex: 1,
};

const rightContainer = {
  width: "25%",
};

const headerStyle = {
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "2rem",
  marginBottom: "50px",
};

const tableContainer = {
  width: "75%",
};

const tableStyle = {
  borderCollapse: "collapse",
  width: "75%",
  fontSize: "1.2rem",
  textAlign: "center",
};


const totalRevenueStyle = {
  textAlign: "center",
  marginTop: "50px",
  fontSize: "1.5rem",
};

const buttonStyle = {
  marginTop: "50px",
  marginBottom: "50px",
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "14px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  backgroundColor: "purple",
  width: "30%", 
  height: "50px"
};




export default FoodStatisticsTable;
