import React, { useState, useEffect } from "react";
import axios from "axios";

function FoodStatisticsTable() {
  const [items, setItems] = useState([]);
  const [dailyRev, setDailyRev] = useState([]);
  const [totalRev, setTotalRev] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          itemsResult,
          dailyRevResult,
          totalRevResult,
        ] = await Promise.all([
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

  return (
    <div style={pageStyle}>
      {totalRev.length > 0 ? (
        <p style={totalRevenueStyle}>
          Total Revenue so far: $ {totalRev[0].total_revenue_sum}
        </p>
      ) : (
        <p style={totalRevenueStyle}>Total Revenue is $0</p>
      )}
      <h1 style={headerStyle}>Food Statistics</h1>
      <div style={tableContainer}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Is Available</th>
              <th>In Stock</th>
              <th>Sold</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.item_id}>
                <td>{item.item_id}</td>
                <td>{item.is_available ? "Yes" : "No"}</td>
                <td
                  style={{
                    color: getStockLevelColor(item.in_stock),
                  }}
                >
                  {item.in_stock}
                </td>
                <td>{item.sold}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
                <td>{rev.date}</td>
                <td>{rev.total_revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

const headerStyle = {
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "2rem",
  marginBottom: "50px",
};

const tableContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "50px",
};

const tableStyle = {
  borderCollapse: "collapse",
  width: "50%",
};

const totalRevenueStyle = {
  textAlign: "center",
  marginTop: "50px",
  fontSize: "1.5rem",
};

export default FoodStatisticsTable;
