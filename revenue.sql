-- OAXACA DAILY REVENUE TABLE 

CREATE TABLE daily_revenue (
    date DATE PRIMARY KEY,
    total_revenue DECIMAL
    );

-- SQL method to populate this table 
INSERT INTO daily_revenue (date, total_revenue)
SELECT order_date, SUM(total_price)
FROM orders
GROUP BY order_date;
