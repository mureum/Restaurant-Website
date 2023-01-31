import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo from "../assets/Oxaca_Restaurants_Logo.png";
import p1 from "../assets/p1.png";
import p2 from "../assets/p2.png";
import "../App.css";
import { Link } from 'react-router-dom';
import { Navbar } from '../common/Navbar';


function Home() {
  return (
    <div className="App">
    <Navbar />

      <Carousel
        useKeyboardArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        interval={2000}
        showThumbs={false}
        showStatus={false}
        renderArrowPrev={() => (
          <div className="w-full h-full absolute z-10">
            <div className="container mx-auto h-full flex items-center">
              <i className="fa-solid fa-circle-chevron-left fa-3x text-white -ml-56 opacity-50"></i>
            </div>
          </div>
        )}
        renderArrowNext={() => (
          <div className="w-full h-full absolute top-0 z-10">
            <div className="container mx-auto h-full flex items-center justify-end">
              <i class="fa-solid fa-circle-chevron-right fa-3x text-white -mr-56 opacity-50"></i>
            </div>
          </div>
        )}
      >
        <div className="bg-indigo-300 my-10">
          <img className="object-cover h-[600px] w-full" src={p1} />
        </div>

        <div className="bg-indigo-300 my-10">
          <img className="object-cover h-[600px] w-full" src={p2} />
        </div>

        <div className="bg-indigo-300 my-10">
          <img className="object-cover h-[600px] w-full" src={p1} />
        </div>

        <div className="bg-indigo-300 my-10">
          <img className="object-cover h-[600px] w-full" src={p1} />
        </div>
      </Carousel>
      <div
        style={{
        backgroundColor: "pink",
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        }}
        >
            <div>
                <h1 style={{textAlign: "center", fontSize: "40px", fontWeight:"bold"}}>TRULY MEXICAN FOOD</h1>
            <br></br>
            <p style={{ textAlign: 'center', width:"80%", paddingLeft:"20%" }}>
            Indulge in authentic Mexican flavors at our restaurant, serving up fresh street-style tacos, crispy taquitos, and more. 
            Savor the taste of Mexico inspired by its bustling markets and made with eco-friendly ingredients. 
            Come share a meal with us!
            </p>
            <br></br>
            <button className="p-3 px-6 mx-2 space-x-4 hover:bg-pink-500 bg-blue-500 text-yellow-500 text-2xl font-extrabold font-sans hover:text-yellow-300 uppercase">
            <span><a href="/order">Menu</a></span>
            <i className="fa-solid fa-circle-chevron-right"></i>
            </button>
            </div>
            <img
            src="https://pyxis.nymag.com/v1/imgs/3fd/fa2/b970047a3c5363c3ac6bb723b9eee8036c-2-boca-santa-11.rhorizontal.w610.jpg"
            alt="Image of a Plate"
            style={{ width: '50%' }}
            />
        </div>
        <div
        style={{
        backgroundColor: "#fff37f",
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        }}
        >
            <img
            src="https://boec.org/wp-content/uploads/2021/06/Mi-Casa.jpg"
            alt="Oaxaca Logo"
            style={{ width: '50%' }}
            />
            <div>
                <h1 style={{textAlign: "center", fontSize: "40px", fontWeight:"bold"}}>ABOUT US</h1>
            <br></br>
            <p style={{ textAlign: 'center', width:"80%", paddingLeft:"20%" }}>
            Welcome to our restaurant, where we serve authentic Oaxacan cuisine made with fresh, locally sourced ingredients. 
            Our menu features a variety of traditional dishes, including tacos al pastor, carne asada, and beef burritos. 
            We also have a selection of vegetarian options. 
            Come dine with us and experience the flavors of Oaxaca.
            </p>
            <br></br>
            <button className="p-3 px-6 mx-2 space-x-4 hover:bg-pink-500 bg-red-500 text-yellow-500 text-2xl font-extrabold font-sans hover:text-yellow-300 uppercase">
            <span><a href="/aboutus">About Us</a></span>
            <i className="fa-solid fa-circle-chevron-right"></i>
            </button>
            </div>
        </div>
        <footer>
            <p>© 2023 OAXACA Restaurants</p>
        </footer>
    </div>
  );
}

export default Home;
