-- TABLE OF ALL ORDERS
CREATE TABLE allOrders(
    order_no INT PRIMARY KEY,
    customer_name VARCHAR(100),
    order_date DATE,
    order_time TIME,
    order_description VARCHAR (500),
    total_price DECIMAL(7,2)
);

