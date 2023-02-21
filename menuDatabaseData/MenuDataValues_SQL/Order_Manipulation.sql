/* QUERY 1 - ADD MENU ORDER.
The query below adds an example order to the waiter calls table,
this query can be modified to add any type of order for any table
by changing the values to reflect the required order.*/
INSERT INTO waiter_calls
VALUES (7, 120, 'Alex Wilson', '20:24:00', 'Tacos');

/* QUERY 2 - REMOVE MENU ORDER.
The query below removes an order from by searching for the unique
order_no and removing it and the data related to it.
The order_no can be changed to what ever number is needed.*/
DELETE FROM waiter_calls WHERE order_no= 120;