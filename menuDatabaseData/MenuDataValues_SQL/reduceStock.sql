/* Stock Removal - De-incriments stock value by 1.
Query reduces the value of stock_available. 
To change what stock is reduced change the value of item_id to corespond with the stock */
UPDATE item 
     SET stock_available = stock_available - 1
WHERE item_id = '000010';