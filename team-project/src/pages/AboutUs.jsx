import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo from "../assets/Oxaca_Restaurants_Logo_White.png";
import "../App.css";
import { Navbar } from '../common/Navbar';


function AboutUs() {
  return (
    <div className="App App2">
    <Navbar />

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
