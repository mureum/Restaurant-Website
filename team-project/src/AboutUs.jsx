import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo from "./assets/Oxaca_Restaurants_Logo_White.png";
import "./App.css";

function AboutUs() {
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
        <li className="p-3 px-6 mx-2 space-x-4 hover:bg-pink-500 bg-blue-500 text-yellow-500 text-2xl font-extrabold font-sans hover:text-yellow-300 uppercase">
            <span><a href="/aboutus">About Us</a></span>
          <i className="fa-solid fa-circle-chevron-right"></i>
        </li>
        <li className="p-3 px-6 mx-2 space-x-2 hover:bg-pink-500 text-red-500 text-xl font-bold font-sans hover:text-yellow-300 uppercase">
            <span><a href="/order">Order Online</a></span>
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
    <section id="about">
      <h2>About</h2>
      <p>Welcome to our restaurant, where we serve authentic Oaxacan cuisine made with fresh, locally sourced ingredients. Our menu features a variety of traditional dishes, including tacos al pastor, carne asada, and beef burritos. We also have a selection of vegetarian options. Come dine with us and experience the flavors of Oaxaca.</p>
    </section>
    <section id="contact">
      <h2>Contact Us</h2>
        <form>
            <input type="text" placeholder="Name"/>
            <input type="email" placeholder="Email"/>
            <textarea placeholder="Message"></textarea>
            <input type="submit" value="Send"/>
        </form>
    </section>
  </div>
  );
}

export default AboutUs;
