CREATE TABLE payment_info(
    transaction_id int NOT NULL,
    card_no varchar(16) NOT NULL,
    cardholdder varchar (50) NOT NULL,
    exp_month smallint NOT NULL,
    exp_year smallint NOT NULL,
    PRIMARY KEY (transaction_id)
);
