import logo from "./assets/Oxaca_Restaurants_Logo.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="flex items-center">
        <img
          src={logo}
          width="300"
          height="300"
          style={{ marginLeft: "10px", marginTop: "10px" }}
        />

        <ul className="flex p-3">
          <li className="p-3 px-6 mx-2 space-x-4 hover:bg-pink-500 bg-blue-500 text-yellow-500 text-2xl font-extrabold font-sans hover:text-yellow-300 uppercase">
            <span>Book Now</span>
            <i className="fa-solid fa-circle-chevron-right"></i>
          </li>
          <li className="p-3 px-6 mx-2 hover:bg-pink-500 text-red-500 text-xl font-bold font-sans hover:text-yellow-300 uppercase">
            About Us
          </li>
          <li className="p-3 px-6 mx-2 hover:bg-pink-500 text-red-500 text-xl font-bold font-sans hover:text-yellow-300 uppercase">
            Order Online
          </li>
          <li className="p-3 px-6 mx-2 hover:bg-pink-500 text-red-500 text-xl font-bold font-sans hover:text-yellow-300 uppercase">
            Menus
          </li>
          <li className="p-3 px-6 mx-2 hover:bg-pink-500 text-red-500 text-xl font-bold font-sans hover:text-yellow-300 uppercase">
            Locations
          </li>
          <li className="p-3 px-6 mx-2 hover:bg-pink-500 text-red-500 text-xl font-bold font-sans hover:text-yellow-300 uppercase">
            Contact Us
          </li>
        </ul>
      </header>
      <ul>
        <li>
          <input type="button" value="Menu" />
        </li>
        <li>
          <input type="button" value="About" />
        </li>
        <li>
          <input type="button" value="Contact" />
        </li>
        <li>
          <input type="button" value="Waiter" />
        </li>
        <li>
          <input type="button" value="Kitchen Staff" />
        </li>
      </ul>
      <h2>Menu</h2>
      <ul>
        <li>
          <h3>Taco al Pastor</h3>
          <p>Marinated pork with pineapple</p>
          <form>
            <button type="submit">Order</button>
          </form>
        </li>
        <li>
          <h3>Carne Asada Taco</h3>
          <p>Grilled steak with cilantro and onions</p>
          <form>
            <button type="submit">Order</button>
          </form>
        </li>
        <li>
          <h3>Chimichanga</h3>
          <p>Fried burrito filled with meat and cheese</p>
          <form>
            <button type="submit">Order</button>
          </form>
        </li>
        <li>
          <h3>Beef Burrito</h3>
          <p>Flour tortilla filled with beef, rice, beans, and salsa</p>
          <form>
            <button type="submit">Order</button>
          </form>
        </li>
      </ul>
    </div>
  );
}

export default App;
