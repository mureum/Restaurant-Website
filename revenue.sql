-- OAXACA DAILY REVENUE TABLE 

CREATE TABLE daily_revenue (
    date DATE PRIMARY KEY,
    total_revenue DECIMAL(7,2) 
    );
--By the way, DECIMAL(7,2) Implies that over £9999.99 cannot be made in a day as it cannot store a higher value than that.


-- SQL method to populate this table 
INSERT INTO daily_revenue (date, total_revenue)
SELECT order_date, SUM(total_price)
FROM allOrders
GROUP BY order_date;
