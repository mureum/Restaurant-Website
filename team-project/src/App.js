import logo from "./assets/Oxaca_Restaurants_Logo.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="flex">
        <img
          src={logo}
          width="300"
          height="300"
          style={{ marginLeft: "-10px", marginTop: "10px" }}
        />
      </header>
      <ul>
        <li>
          <input
            type="button"
            value="Menu"
            onclick="window.open('menu.html')"
          />
        </li>
        <li>
          <input
            type="button"
            value="About"
            onclick="window.open('about.html')"
          />
        </li>
        <li>
          <input
            type="button"
            value="Contact"
            onclick="window.open('contact.html')"
          />
        </li>
        <li>
          <input
            type="button"
            value="Waiter"
            onclick="window.open('waiter.html')"
          />
        </li>
        <li>
          <input
            type="button"
            value="Kitchen Staff"
            onclick="window.open('staff.html')"
          />
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
