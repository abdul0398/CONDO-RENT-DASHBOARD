import { MyContext } from "@/context/context";
import {
  allAreas,
  allBedrooms,
  allDistricts,
  allGraphData,
  allMonths,
  allProjects,
  allStreets,
} from "@/data/constants";
import { ResponseBody, rentalData } from "@/types/data";
import { useContext, useEffect, useState } from "react";
import data from "@/data/rentals1.json";
import WindowedSelect from "react-windowed-select";
import { customStyles } from "@/style/select";
export default function Properties() {
  const {
    properties,
    setAreas,
    setFlatTypes,
    setMonths,
    setdistricts,
    setprojects,
    setStreets,
    setSelectedProjectType,
    selectedArea,
    selectedFlatType,
    selectedDistrictName,
    selectedMonth,
    selectedProjectType,
    selectedproject,
    selectedStreetName,
    setIsLoading,
    setTransactions,
    setGraphCalculation,
  } = useContext(MyContext);
  const [isReady, setIsReady] = useState(false);
  const array = data as rentalData[];

  const handleButtonClick = (propertyType: string) => {
    if (selectedProjectType === propertyType) {
      setSelectedProjectType("");
    } else {
      setSelectedProjectType(propertyType);
    }
  };

  useEffect(() => {
    // Set isReady to true after the initial render
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    setIsLoading(true);
    async function processData() {
      const preData = {
        selectedDistrictName,
        selectedStreetName,
        selectedproject,
        selectedFlatType,
        selectedMonth,
        selectedProjectType,
        selectedArea,
      };

      if (
        selectedDistrictName == "" &&
        selectedStreetName == "" &&
        selectedproject == "" &&
        selectedFlatType === "" &&
        selectedMonth == "" &&
        selectedProjectType === "" &&
        selectedArea == ""
      ) {
        setprojects(allProjects);
        setdistricts(allDistricts);
        setStreets(allStreets);
        setMonths(allMonths);
        setFlatTypes(allBedrooms);
        setAreas(allAreas);
        setTransactions(array);
        setGraphCalculation(allGraphData);

        setIsLoading(false);
      } else {
        const res = await fetch("/api/processData", {
          method: "POST",
          body: JSON.stringify(preData),
        });
        const data: ResponseBody = await res.json();
        setprojects(data.projects);
        setStreets(data.streets);
        setMonths(data.months);
        setdistricts(data.districts);
        setFlatTypes(data.flatTypes);
        setAreas(data.areas);
        setTransactions(data.rentalData);
        setGraphCalculation(data.graphCalculation);

        setIsLoading(false);
      }
    }
    processData();
  }, [selectedProjectType]);

  const handleSelect = (e: any) => {
    setSelectedProjectType(e.value as string);
  };

  const options = properties.map((propertie) => {
    return {
      value: propertie,
      label: propertie,
    };
  });

  return (
    <div className="">
      <WindowedSelect
        placeholder="Select Property Type"
        options={options}
        styles={customStyles}
        className="text-xs"
        value={
          selectedProjectType
            ? { value: selectedProjectType, label: selectedProjectType }
            : null
        }
        windowThreshold={50}
        menuPortalTarget={document.querySelector("body")}
        onChange={(e: any) => handleSelect(e)}
      />
    </div>
  );
}
