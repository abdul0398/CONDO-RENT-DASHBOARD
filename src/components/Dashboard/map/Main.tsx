import "maplibre-gl/dist/maplibre-gl.css";
import * as React from "react";
import Map, { Marker } from "react-map-gl/maplibre";
import { MyContext } from "@/context/context";
import { FaHouseUser } from "react-icons/fa";
import { coordinate } from "@/data/constants";
import "maplibre-gl/dist/maplibre-gl.css";
export default function MapComponent() {
  const {
    projects,
    selectedproject,
    selectedDistrictName,
    setSelectedproject,
  } = React.useContext(MyContext);
  const [isModal, setModal] = React.useState("");
  const [viewState, setViewState] = React.useState({
    latitude: 1.30743547948389,
    longitude: 103.854713903431,
    zoom: 10,
  });

  const usefulProjects: string[] = [];

  if (
    selectedDistrictName != "" ||
    selectedproject != "" ||
    projects.length <= 30
  ) {
    if (selectedproject != "" && selectedDistrictName == "") {
      usefulProjects.push(selectedproject);
    } else {
      usefulProjects.push(...projects);
    }
  }

  // Calculate the center coordinates for the first usefulProject
  const firstUsefulProject = usefulProjects[0];
  const firstUsefulProjectCoordinate = coordinate[firstUsefulProject] || {
    LATITUDE: 1.30743547948389,
    LONGITUTDE: 103.854713903431,
  };
  const centerCoordinates = {
    latitude: firstUsefulProjectCoordinate.LATITUDE,
    longitude: firstUsefulProjectCoordinate.LONGITUTDE,
    zoom: 14,
  };

  React.useEffect(() => {
    if (usefulProjects.length > 0) {
      setViewState(centerCoordinates);
    }
  }, [selectedproject, selectedDistrictName]);

  return (
    <Map
      {...viewState}
      onMove={(e) => {
        setViewState(e.viewState);
      }}
      maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
      mapStyle="https://www.onemap.gov.sg/maps/json/raster/mbstyle/Default.json"
    >
      {usefulProjects?.map((project, index) => {
        return (
          <Marker
            key={index}
            latitude={coordinate[project].LATITUDE}
            longitude={coordinate[project].LONGITUTDE}
            offset={[0, 0]}
          >
            {isModal == project && (
              <div className="bg-white shadow-lg border py-1 px-2 rounded-lg">
                <p>{project}</p>
              </div>
            )}
            <div
              onClick={() => {
                setSelectedproject(project);
                setModal(project);
              }}
              className="mx-auto w-12 h-12 rounded-full border bg-white flex justify-center items-center shadow-lg"
            >
              <FaHouseUser
                size={30}
                onClick={() => {
                  setSelectedproject(project);
                  setModal(project);
                }}
                className="mx-auto hover:opacity-100 cursor-pointer"
                data-id={project}
                title={`Project:  ${project}\nProperty Type:  ${
                  coordinate[project].nonlanded > coordinate[project].executive
                    ? "Non-Landed"
                    : "Executive Condo"
                } \nMediun of rent (psf):  ${Math.round(
                  coordinate[project].totalRent / coordinate[project].totalArea
                )}\nRentals Count:  ${
                  coordinate[project].nonlanded > coordinate[project].executive
                    ? coordinate[project].nonlanded
                    : coordinate[project].executive
                }`}
                color={"#000000"}
              />
            </div>
          </Marker>
        );
      })}
    </Map>
  );
}
