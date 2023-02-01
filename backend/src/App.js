import './App.css';

function App() {
  return (
    <div style ={FoodStyle}>
      <h1 style  = {MenuStyle}>Menu</h1 >
      <Food item_id = {123} name = "Meat" price = {2.00} calories = {200} type_id = {222}/>
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
    <div>
      <h2 >{props.name}</h2>
      <p >{props.price}</p>
      <p >{props.calories}</p>
      <p >{props.type_id}</p>
      <p >{props.item_id}</p>
    </div>
  );
};

export default App;