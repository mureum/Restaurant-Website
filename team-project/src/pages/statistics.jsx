import React, { useState, useEffect } from "react";
import axios from "axios";

const pageStyle = {
  backgroundColor: "#f2f2f2",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "50px",
};

const headerStyle = {
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "2.5rem",
  marginBottom: "50px",
  fontFamily: "Arial",
};

const tableContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "50px",
};

const tableStyle = {
  borderCollapse: "collapse",
  width: "50%",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  fontFamily: "Arial",
};

const rowStyle = (index) => ({
  backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2",
});

const cellStyle = {
  padding: "10px",
};

const totalRevenueStyle = {
  textAlign: "center",
  marginTop: "50px",
  fontSize: "1.8rem",
  fontFamily: "Arial",
};

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
              <th style={cellStyle}>Item ID</th>
              <th style={cellStyle}>Is Available</th>
              <th style={cellStyle}>In Stock</th>
              <th style={cellStyle}>Sold</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.item_id} style={rowStyle(index)}>
                <td style={cellStyle}>{item.item_id}</td>
                <td style={cellStyle}>{item.is_available}</td>
                <td style={cellStyle}>{item.in_stock}</td>
                <td style={cellStyle}>{item.sold}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={cellStyle}>Date</th>
              <th style={cellStyle}>Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {dailyRev.map((rev, index) => (
              <tr key={rev.date} style={rowStyle(index)}>
                <td style={cellStyle}>{rev.date}</td>
                <td style={cellStyle}>{rev.total_revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default FoodStatisticsTable;
