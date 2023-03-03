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
	availability boolean,
	PRIMARY KEY (item_ID),
	FOREIGN KEY (type_ID) REFERENCES MenuType(type_ID)
);
CREATE TABLE Diet (
		diet_ID char(3),
		name varchar(30),
		PRIMARY KEY (diet_ID)
);
CREATE TABLE Allergen (
		allergen_ID char(2),
		name varchar(30),
		PRIMARY KEY (allergen_ID)
);
CREATE TABLE Item_Allergen (
        item_ID char(6) NOT NULL,
        allergen_ID char(2) NOT NULL,
        PRIMARY KEY (item_ID, allergen_ID),
		FOREIGN KEY (item_ID) REFERENCES Item(item_ID),
        FOREIGN KEY (allergen_ID) REFERENCES Allergen(allergen_ID)
);
CREATE TABLE Item_Diet (
        item_ID char(6) NOT NULL,
        diet_ID char(3) NOT NULL,
        PRIMARY KEY (item_ID, diet_ID),
        FOREIGN KEY (item_ID) REFERENCES Item(item_ID),
        FOREIGN KEY (diet_ID) REFERENCES Diet(diet_ID)
);
