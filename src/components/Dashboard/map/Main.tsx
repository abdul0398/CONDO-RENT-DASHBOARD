import "maplibre-gl/dist/maplibre-gl.css";
import * as React from "react";
import Map, { Marker, ScaleControl } from "react-map-gl/maplibre";
import { MyContext } from "@/context/context";
import { FaHouseUser } from "react-icons/fa";
import { coordinate } from "@/data/constants";

export default function MapComponent() {
  const {
    projects,
    selectedproject,
    selectedDistrictName,
    setSelectedproject,
  } = React.useContext(MyContext);
  const [isModal, setModal] = React.useState("");

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
    LATITUDE: 1.3521,
    LONGITUTDE: 103.8198,
  };
  const centerCoordinates = {
    latitude: firstUsefulProjectCoordinate.LATITUDE,
    longitude: firstUsefulProjectCoordinate.LONGITUTDE,
    zoom: firstUsefulProject ? 12 : 10,
  };

  return (
    <Map
      maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
      mapStyle="https://www.onemap.gov.sg/maps/json/raster/mbstyle/Default.json"
    >
      {usefulProjects?.map((project, index) => {
        return (
          <Marker
            key={index}
            latitude={coordinate[project].LATITUDE}
            longitude={coordinate[project].LONGITUTDE}
            offset={[0, -50]}
          >
            {isModal == project && (
              <div className="bg-white shadow-lg border py-1 px-2 rounded-lg">
                <p>{project}</p>
              </div>
            )}
            <div>
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
