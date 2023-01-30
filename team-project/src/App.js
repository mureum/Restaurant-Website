import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./App.css";
import { Navbar } from "./common/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

function App() {
  return (
    <div className="App container mx-auto">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
