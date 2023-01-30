import logo from "../assets/Oxaca_Restaurants_Logo.png";

export const Navbar = () => {
  return (
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
          Home
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
  );
};
