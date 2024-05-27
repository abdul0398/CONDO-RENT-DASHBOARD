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
    zoom: 12,
  });

  const usefulProjects = React.useMemo(() => {
    if (selectedDistrictName || selectedproject || projects.length <= 30) {
      if (selectedproject && !selectedDistrictName) {
        return [selectedproject];
      } else {
        return projects;
      }
    }
    return [];
  }, [selectedDistrictName, selectedproject, projects]);

  React.useEffect(() => {
    if (selectedproject) {
      setViewState({
        latitude: coordinate[selectedproject]?.LATITUDE,
        longitude: coordinate[selectedproject]?.LONGITUTDE,
        zoom: 16,
      });
      setModal(selectedproject);
    } else if (usefulProjects.length > 0) {
      const projectWithCoordinate = usefulProjects[usefulProjects.length - 1];
      const firstUsefulProjectCoordinate = coordinate[projectWithCoordinate];
      if (firstUsefulProjectCoordinate) {
        setViewState({
          latitude: firstUsefulProjectCoordinate.LATITUDE,
          longitude: firstUsefulProjectCoordinate.LONGITUTDE,
          zoom: 14,
        });
      }
      setModal("");
    }
  }, [selectedproject, selectedDistrictName, usefulProjects]);

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
        const projCoords = coordinate[project];
        return (
          projCoords && (
            <Marker
              key={index}
              latitude={coordinate[project].LATITUDE}
              longitude={coordinate[project].LONGITUTDE}
              offset={[0, 0]}
            >
              {isModal == project && (
                <div className="bg-white shadow-lg border z-50 py-1 px-2 rounded-lg">
                  <p>{project}</p>
                </div>
              )}
              <div
                onClick={() => {
                  setSelectedproject(project);
                  setModal(project);
                }}
                className="mx-auto w-12 h-12  hover:scale-125 duration-150 rounded-full border bg-white flex justify-center items-center shadow-lg"
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
                    coordinate[project].nonlanded >
                    coordinate[project].executive
                      ? "Non-Landed"
                      : "Executive Condo"
                  } \nMediun of rent (psf):  ${Math.round(
                    coordinate[project].totalRent /
                      coordinate[project].totalArea
                  )}\nRentals Count:  ${
                    coordinate[project].nonlanded >
                    coordinate[project].executive
                      ? coordinate[project].nonlanded
                      : coordinate[project].executive
                  }`}
                  color={"#000000"}
                />
              </div>
            </Marker>
          )
        );
      })}
    </Map>
  );
}
