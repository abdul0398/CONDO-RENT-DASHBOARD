import FlatType from "./flattype/Main";
import Months from "./months/Main";
import Graph from "./graph/Main";
import MapCompenent from "./map/Main";
import Streets from "./streets/Main";
import Properties from "./propertytype/Main";
import Projects from "./projects/Main";
import Districts from "./districts/Main";
import Areas from "./areas/Main";
import Transactions from "./transaction-table/Main";
import { Button } from "../ui/button";
import { MouseEvent, useContext, useRef, useState } from "react";
import { MyContext } from "@/context/context";
import { allGraphData } from "@/data/constants";
import Sidebar from "./sidebar/Main";
import FilterBox from "../ui/filterBox";
import {
  MdChevronLeft,
  MdChevronRight,
  MdOutlineBedroomParent,
  MdCalendarMonth,
} from "react-icons/md";
import { SiCodeblocks } from "react-icons/si";
import { FaStreetView } from "react-icons/fa";

export default function Dashboard() {
  const {
    setSelectedArea,
    setGraphCalculation,
    setSelectedDistrictsName,
    setSelectedFlatType,
    setSelectedMonth,
    setSelectedProjectType,
    setSelectedStreetName,
    selectedArea,
    selectedDistrictName,
    selectedFlatType,
    selectedMonth,
    selectedProjectType,
    selectedproject,
    selectedStreetName,
    setSelectedproject,
  } = useContext(MyContext);

  const handleReset = (e: any) => {
    e.preventDefault();
    setSelectedArea("");
    setGraphCalculation(allGraphData);
    setSelectedDistrictsName("");
    setSelectedFlatType("");
    setSelectedMonth("");
    setSelectedProjectType("");
    setSelectedStreetName("");
    setSelectedproject("");
  };

  const [selectedView, setSelectedView] = useState<string>("graph");

  const slideLeft = () => {
    const slider = document.querySelector(".filter-slider") as HTMLElement;
    slider.scrollLeft += 400;
  };

  const slideRight = () => {
    const slider = document.querySelector(".filter-slider") as HTMLElement;
    slider.scrollLeft -= 400;
  };
  return (
    <section className="md:w-[90%] lg:w-[90%] w-full mt-5 mx-auto lg:p-3 md:p-3 overflow-hidden flex">
      <Sidebar selectedView={selectedView} setSelectedView={setSelectedView} />

      <div className="w-full sm:w-full overflow-y-auto max-h-[90vh] border rounded-3xl lg:rounded-l-none md:rounded-l-none shadow-lg">
        <section className="w-full lg:p-5 md:p-5 p-2">
          <section className="h-11 w-full relative">
            <Button
              className="bg-[#0e4884] font-bold text-white hover:bg-black hover:text-white absolute end-0"
              onClick={(e) => {
                handleReset(e);
              }}
              variant="outline"
            >
              Reset
            </Button>
          </section>
          <section>
            <div className="filter-slider h-48 mt-10 flex gap-8 overflow-x-scroll scroll-smooth mx-auto whitespace-nowrap w-[90%] p-2 no-scrollbar rounded-md">
              <FilterBox
                select={<Districts />}
                name="Districts"
                selected={selectedDistrictName}
                icon={<SiCodeblocks className="text-2xl text-white" />}
              />
              <FilterBox
                select={<Projects />}
                name="Project"
                selected={selectedproject}
                icon={<MdCalendarMonth className="text-2xl text-white" />}
              />
              <FilterBox
                select={<Streets />}
                name="Street"
                selected={selectedStreetName}
                icon={<FaStreetView className="text-2xl text-white" />}
              />

              <FilterBox
                select={<FlatType />}
                name="Flat Type"
                selected={selectedFlatType}
                icon={
                  <MdOutlineBedroomParent className="text-2xl text-white" />
                }
              />
              <FilterBox
                select={<Months />}
                name="Month"
                selected={selectedMonth}
                icon={<MdCalendarMonth className="text-2xl text-white" />}
              />
              <FilterBox
                select={<Areas />}
                name="Area"
                selected={selectedArea}
                icon={<MdCalendarMonth className="text-2xl text-white" />}
              />
              <FilterBox
                select={<Properties />}
                name="Property Type"
                selected={selectedProjectType}
                icon={<MdCalendarMonth className="text-2xl text-white" />}
              />
            </div>
            <div className="text-center flex justify-center gap-2 mt-3">
              <div className="rounded-full h-8 w-8 flex justify-center items-center bg-[#0e4884]">
                <MdChevronLeft
                  onClick={() => {
                    slideRight();
                  }}
                  className=" text-2xl cursor-pointer mx-auto text-white"
                />
              </div>
              <div className="rounded-full h-8 w-8 flex justify-center items-center bg-[#0e4884]">
                <MdChevronRight
                  onClick={() => {
                    slideLeft();
                  }}
                  className="text-2xl cursor-pointer text-white"
                />
              </div>
            </div>
          </section>
          <section className="w-[90%] overflow-x-auto overflow-y-hidden mx-auto border h-[700px] pb-3 mt-10 rounded-xl">
            <div className="min-w-[700px] w-full">
              <div className="bg-[#0e4884] w-full h-14 rounded-t-xl flex items-center ps-3">
                <Button
                  onClick={() => setSelectedView("graph")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "graph" ? "bg-white text-black" : ""
                  }`}
                >
                  GRAPH ANALYTICS
                </Button>
                <Button
                  onClick={() => setSelectedView("table")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "table" ? "bg-white text-black" : ""
                  }`}
                >
                  TABLE VIEW
                </Button>
                <Button
                  onClick={() => setSelectedView("map")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "map" ? "bg-white text-black" : ""
                  }`}
                >
                  MAP VIEW
                </Button>
              </div>
              <div className="w-full p-5 h-full">
                {selectedView == "graph" ? (
                  <Graph />
                ) : selectedView == "table" ? (
                  <Transactions />
                ) : (
                  <div className="h-[600px]">
                    <MapCompenent />
                  </div>
                )}
              </div>
            </div>
          </section>
          <section className="p-7 relative  bg-[url('/building-banner.jpeg')]  bg-cover bg-center before:bg-blue-400 bg-no-repeat w-[90%] mx-auto h-52 border rounded-xl mt-10">
            <div className="lg:w-2/3 md:2/3 w-full">
              <h2 className="lg:text-3xl md:text-2xl text-xl text-white z-20 opacity-100">
                Discover your dream condo rental and make it your home
              </h2>
            </div>
            <div className="text-[#0e4884] font-bold cursor-pointer h-9 w-28 flex justify-center bg-white items-center mt-5 rounded-md text-sm shadow-lg">
              Get Started
            </div>
          </section>
        </section>
      </div>
    </section>
  );
}
