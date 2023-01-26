import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo from "./assets/Oxaca_Restaurants_Logo.png";
import p1 from "./assets/p1.png";
import p2 from "./assets/p2.png";
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
          <li className="p-3 px-6 mx-2 space-x-2 hover:bg-pink-500 text-red-500 text-xl font-bold font-sans hover:text-yellow-300 uppercase">
            <span>Order Online</span>
            <i className="fa-solid fa-chevron-down"></i>
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
    </div>
  );
}

export default App;
