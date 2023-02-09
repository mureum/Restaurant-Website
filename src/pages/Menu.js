import React from 'react';
import {useNavigate} from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 style  = {MenuStyle}>Menu</h1 >
      <button style={{float: 'right'}} onClick = {() => {navigate("/Login")}} >Log in</button>
      <Food item_id = {1} name = "Nachos" price = {6.00} calories = {650} type_id = {222}/>
      <Food item_id = {2} name = "Grilled Halloumi" price = {6.00} calories = {200} type_id = {222}/>
      <Food item_id = {3} name = "Chicken Soup" price = {7.50} calories = {230} type_id = {222}/>
      <Food item_id = {4} name = "Black beans Soup" price = {6.50} calories = {300} type_id = {222}/>
      <Food item_id = {5} name = "Tuna Tostada" price = {5.00} calories = {300} type_id = {222}/>
      <Food item_id = {6} name = "Cod Fillets" price = {6.50} calories = {1030} type_id = {222}/>
      <Food item_id = {7} name = "Chicken Enchilada" price = {14.90} calories = {400} type_id = {222}/>
      <Food item_id = {8} name = "Beef Enchilada" price = {14.90} calories = {400} type_id = {222}/>
      <Food item_id = {9} name = "Mixed Vegetable" price = {14.90} calories = {500} type_id = {222}/>
      <Food item_id = {10} name = "Chicken Burrito" price = {9.00} calories = {600} type_id = {222}/>
      <Food item_id = {11} name = "Beef Burrito" price = {9.00} calories = {800} type_id = {222}/>
      <button>Order </button>
    </div>
  );

};

const MenuStyle = {
  color: 'blue',
  textAlign : "left"
};

const FoodStyle = {
  color: 'black',
  textAlign : "left"
};

const Food = (props) => {
  return ( 
    <div style  = {FoodStyle}>
      <h2 >{props.name}</h2>
      <p >{props.price}</p>
      <p >{props.calories}</p>
      <p >{props.type_id}</p>
      <p >{props.item_id}</p>
    </div>
  );
};

export default Menu;
