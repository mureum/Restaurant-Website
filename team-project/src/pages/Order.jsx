import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo from "../assets/Oxaca_Restaurants_Logo_White.png";
import "../App.css";
import menu from "../assets/Menu.png";
import { Navbar } from '../common/Navbar';



function Order() {
  return (
    <div className="App App2">
<Navbar />

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
