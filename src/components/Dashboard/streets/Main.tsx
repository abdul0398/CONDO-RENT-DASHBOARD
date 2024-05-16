import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "@/context/context";
import {
  allAreas,
  allBedrooms,
  allDistricts,
  allGraphData,
  allMonths,
  allProjects,
  allPropertyTypes,
} from "@/data/constants";
import { ResponseBody, rentalData } from "@/types/data";
import data from "@/data/rentals1.json";
import WindowedSelect from "react-windowed-select";
import { customStyles } from "@/style/select";

export default function Streets() {
  const {
    streets,
    selectedDistrictName,
    selectedArea,
    selectedFlatType,
    selectedMonth,
    selectedProjectType,
    selectedStreetName,
    setSelectedStreetName,
    selectedproject,
    setAreas,
    setFlatTypes,
    setMonths,
    setProperties,
    setprojects,
    setdistricts,
    setIsLoading,
    setTransactions,
    setGraphCalculation,
  } = useContext(MyContext);

  const array = data as rentalData[];
  const [isReady, setIsReady] = useState(false);

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
        setMonths(allMonths);
        setAreas(allAreas);
        setProperties(allPropertyTypes);
        setFlatTypes(allBedrooms);
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
        setdistricts(data.districts);
        setMonths(data.months);
        setAreas(data.areas);
        setProperties(data.projectTypes);
        setFlatTypes(data.flatTypes);
        setTransactions(data.rentalData);
        setGraphCalculation(data.graphCalculation);

        setIsLoading(false);
      }
    }
    processData();
  }, [selectedStreetName]);

  const handleSelect = (e: any) => {
    setSelectedStreetName(e.value as string);
  };

  const options = streets.map((street) => {
    return {
      value: street,
      label: street,
    };
  });

  return (
    <section>
      <WindowedSelect
        placeholder="Select Street"
        options={options}
        styles={customStyles}
        className="text-xs"
        value={
          selectedStreetName
            ? { value: selectedStreetName, label: selectedStreetName }
            : null
        }
        windowThreshold={50}
        menuPortalTarget={document.querySelector("body")}
        onChange={(e: any) => handleSelect(e)}
      />
    </section>
  );
}
