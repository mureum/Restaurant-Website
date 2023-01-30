/* FILTER 1 - FILTER MENU TYPE.
The query below filters menu to only show starters.
Same query can be used to only show mains, desserts, sides and drinks.
All that needs to change is the type_ID.*/
SELECT name, price, calories
FROM Item
WHERE type_ID = 'ST';

/* FILTER 2 - FILTER DIETARY REQUIREMENTS.
The query below filters menu to only show Vegan Options.
Same query can be used to only show Vegetarian, Lactose-Free and Gluten-Free itmes.
All that needs to change is the diet_ID on last line.*/
SELECT name, price, calories
FROM Item
WHERE item_ID IN (SELECT item_ID
                  FROM Item_Diet
                  WHERE diet_ID = 'VGN');
                  
/* FILTER 3 - FILTER ALLERGENS.
The query below filters menu to remove items containing Nuts.
Same query can be used to filter other allergens.
All that needs to change is the allergen_ID. */
SELECT name, price, calories
FROM Item
WHERE item_ID NOT IN (SELECT item_ID
                  FROM Item_Allergen
                  WHERE allergen_ID != 'PE' OR allergen_ID != 'TR'); 
                  
/* FILTER 4 - FILTER CALORIES.
The query below filters menu to only show items containing less than 300 calories and orders by ascending order.
Same query can be used to filter different amounts of calories and the asc/desc order. */
SELECT name, price, calories
FROM Item
WHERE calories < 300
ORDER BY calories; 

/* FILTER 5 - PRICE
The query below filters menu to only show items under £10 in descending order.
Same query can be used to filter different prices and the asc/desc order. */
SELECT name, price, calories
FROM Item
WHERE price < 10.00
ORDER BY price desc;
