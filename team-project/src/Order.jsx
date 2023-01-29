import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo from "./assets/Oxaca_Restaurants_Logo_White.png";
import "./App.css";
import menu from "./assets/Menu.png";


function Order() {
  return (
    <div className="App App2">
    <header className="flex items-center header2">
        <a href="/">
        <img
            src={logo}
            width="300"
            height="300"
            style={{ marginLeft: "10px", marginTop: "10px" }}
        />
        </a>

      <ul className="flex p-3">
        <li className="p-3 px-6 mx-2 space-x-2 hover:bg-pink-500 text-red-500 text-xl font-bold font-sans hover:text-yellow-300 uppercase">
          <span><a href="/">Book Now</a></span>
        </li>
        <li className="p-3 px-6 mx-2 hover:bg-pink-500 text-red-500 text-xl font-bold font-sans hover:text-yellow-300 uppercase">
            <span><a href="/aboutus">About Us</a></span>
        </li>
        <li className="p-3 px-6 mx-2 space-x-4 hover:bg-pink-500 bg-blue-500 text-yellow-500 text-2xl font-extrabold font-sans hover:text-yellow-300 uppercase">
          <span>Order Online</span>
          <i className="fa-solid fa-circle-chevron-right"></i>
        </li>
        <li className="p-3 px-6 mx-2 hover:bg-pink-500 text-red-500 text-xl font-bold font-sans hover:text-yellow-300 uppercase">
          Menus
        </li>
        <li className="p-3 px-6 mx-2 space-x-2 hover:bg-pink-500 text-red-500 text-xl font-bold font-sans hover:text-yellow-300 uppercase">
          <span>Locations</span>
          <i className="fa-solid fa-chevron-down"></i>
        </li>
        <li className="p-3 px-6 mx-2 hover:bg-pink-500 text-red-500 text-xl font-bold font-sans hover:text-yellow-300 uppercase">
          Contact Us
        </li>
      </ul>
    </header>
    <div style={{alignContent: "center", textAlign: "center"}}>
        <img
            src={menu}
            width="300"
            height="300"
            style={{ marginLeft: "38%", marginRight: "40%", marginTop: "30px", marginBottom: "30px" }}
        />
      <div className="menu">
        <table style={{backgroundColor: "rgba(255, 255, 255, 0.8)"}}>
          <tr id="product">
            <td width="100px">
              <img
                src="https://images-gmi-pmc.edge-generalmills.com/e59f255c-7498-4b84-9c9d-e578bf5d88fc.jpg"
                title="taco"
                alt="taco"
                width="200px"
                heigth="300px"
                style={{float: "left"}}
              />
            </td>
            <td width="100px">Classic Taco</td>
            <td width="500px">
              <input
                type="Checkbox"
                id="myCheck"
                className="checkbox"
                name="pizza"
                value="pizza_marghe"
                style={{float: "right"}}
                align="right"
              />
            </td>
          </tr>
          <tr id="product2">
            <td width="100px">
              <img
                src="https://img.taste.com.au/uq5uo4mA/taste/2016/11/chicken-fajitas-98151-1.jpeg"
                title="fajita"
                alt="fajita"
                width="200px"
                heigth="300px"
                style={{float: "left"}}
              />
            </td>
            <td>Fajitas served with chips or rice</td>
            <td width="500px">
              <input
                type="Checkbox"
                id="myCheck2"
                className="checkbox"
                name="fajitas"
                value="fajitas"
                style={{float: "right"}}
                align="right"
              />
            </td>
          </tr>
          <tr id="product3">
            <td width="100px">
              <img
                src="https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/03/Mexican-Rice-8.jpg"
                title="rice"
                alt="rice"
                width="200px"
                heigth="300px"
                style={{float: "left"}}
              />
            </td>
            <td>Mexican Rice</td>
            <td width="500px">
              <input
                type="Checkbox"
                id="myCheck3"
                className="checkbox"
                name="rice"
                value="rice"
                style={{float: "right"}}
                align="right"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  );
}

export default Order;
