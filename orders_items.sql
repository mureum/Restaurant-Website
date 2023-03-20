--ORDERS_ITEMS
CREATE TABLE order_items(
    order_no int,
    item_id int, 
    quantity int,
    PRIMARY KEY(order_no,item_id),
    FOREIGN KEY (order_no) REFERENCES allOrders(order_no),
    FOREIGN KEY (item_id )REFERENCES items(item_id)
);

/*
The purpose of this table is to create a many-to-many relationship between orders and items, as each order can contain multiple items, and each item can be part of multiple orders.

EXAMPLE OF AN ENTRY :
1234 101001 Chipotle Wings 2
1234 100001 Nachos con queso 3

In the order above, a customer ordered 2 Chipotle Wings and 3 Nachos con queso within 1 order.

The quantity attribute is helpful so that we can use it to subtract from the 'in_stock' atrribute in the table stocklevel
For example, lets day that there are 100 Chiptole Wings in stock. 2 will be subtracted from it.
*/

--This is the SQL query that can be used to update the stock level whenever an item is ordered.
UPDATE stocklevel
SET in_stock = in_stock - order_items.quantity --stock level reduces 
    sold = sold + order_items.quantity, -- quantity of sold items increases
    is_available = (in_stock - order_items.quantity) > 0 OR (in_stock - order_items.quantity) = 0 --true if in_stock>0, false if in_stock<0
FROM order_items
WHERE order_items.order_no IN (
   SELECT order_no
   FROM order_items
   GROUP BY order_no
   ORDER BY MAX(order_no) DESC 
   LIMIT 1 --the only stock level of the most recent order_no is updated, not the whole table.
)
AND order_items.item_id = stock_level.item_id
