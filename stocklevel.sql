CREATE TABLE stock_level(
    item_id NOT NULL,
    is_available BOOL,
    in_stock int,
    sold int,
    PRIMARY KEY (item_id),
    FOREIGN KEY (item_id) REFERENCES item(item_id)
);
