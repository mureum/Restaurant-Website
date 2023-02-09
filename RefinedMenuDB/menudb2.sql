CREATE TABLE MenuType (
		type_ID char(2) NOT NULL,
		name varchar(30),
		PRIMARY KEY (type_ID)
);
CREATE TABLE Item (
	item_ID char(6) NOT NULL,
	name varchar(30),
	price numeric(4,2),
	calories int,
	type_ID char(2),
	diets varchar(30),
	allergens varchar(30),
	PRIMARY KEY (item_ID),
	FOREIGN KEY (type_ID) REFERENCES MenuType(type_ID)
);
