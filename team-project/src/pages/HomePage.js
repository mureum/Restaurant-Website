import { Carousel } from "react-responsive-carousel";

import p1 from "../assets/p1.png";
import p2 from "../assets/p2.png";
import p3 from "../assets/p3.png";
import p4 from "../assets/p4.png";

export const HomePage = () => {
  return (
    <Carousel
      useKeyboardArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      interval={2000}
      showThumbs={false}
      showStatus={false}
      renderArrowPrev={(cb) => (
        <div className="w-full h-full absolute z-10 cursor-pointer pointer-events-none">
          <div
            className="container mx-auto h-full flex items-center pointer-events-auto"
            onClick={() => cb()}
          >
            <i className="fa-solid fa-circle-chevron-left fa-3x text-white -ml-56 opacity-70"></i>
          </div>
        </div>
      )}
      renderArrowNext={(cb) => (
        <div className="w-full h-full absolute top-0 z-10 cursor-pointer pointer-events-none">
          <div
            className="container mx-auto h-full flex items-center justify-end pointer-events-auto"
            onClick={() => cb()}
          >
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
        <img className="object-cover h-[600px] w-full" src={p3} />
      </div>

      <div className="bg-indigo-300 my-10">
        <img className="object-cover h-[600px] w-full" src={p4} />
      </div>
    </Carousel>
  );
};
