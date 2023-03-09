/* 
This table measures the stock level
'in_stock' shows the remaining quantity of each item
'sold' shows the quantity of each item that has been sold
'is_available' is TRUE when in_stock is greater than zero
'is_available' is FALSE when in_stock equals zero
*/

CREATE TABLE stock_level(
    item_id NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    in_stock int DEFAULT 100,
    sold int,
    PRIMARY KEY (item_id),
    FOREIGN KEY (item_id) REFERENCES item(item_id)
);
