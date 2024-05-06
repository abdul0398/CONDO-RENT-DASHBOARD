import React, { useState, useContext, useEffect, } from "react";
import { MyContext } from "@/context/context";
import { allAreas, allBedrooms, allDistricts, allGraphData, allMonths, allPropertyTypes, allStreets } from "@/data/constants";
import data from "@/data/rentals1.json";
import { rentalData } from "@/types/data";
import WindowedSelect from "react-windowed-select";


export default function Projects() {
  const {
    selectedproject,
    selectedArea,
    selectedDistrictName,
    selectedFlatType,
    selectedMonth,
    selectedProjectType,
    selectedStreetName,
    projects,
    setStreets,
    setdistricts,
    setIsLoading,
    setAreas,
    setSelectedproject,
    setFlatTypes,
    setProperties,
    setTransactions,
    setMonths,
    setGraphCalculation,
    isLoading
  } = useContext(MyContext);

  const [localLoading, setLocalLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const array = data as rentalData[];

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    setLocalLoading(false);
    setIsLoading(true)
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
        selectedStreetName == '' &&
        selectedproject == "" &&
        selectedFlatType === "" &&
        selectedMonth == "" &&
        selectedProjectType === "" &&
        selectedArea == ""
      ) {
        setStreets(allStreets);
        setMonths(allMonths);
        setdistricts(allDistricts);
        setAreas(allAreas);
        setProperties(allPropertyTypes);
        setFlatTypes(allBedrooms);
        setTransactions(array);
        setGraphCalculation(allGraphData)


        setLocalLoading(true);
        setIsLoading(false);

      } else {
        const res = await fetch("/api/processData", {
          method: "POST",
          body: JSON.stringify(preData),
        });
        const data: any = await res.json();
        setdistricts(data.districts);
        setStreets(data.streets);
        setMonths(data.months);
        setProperties(data.projectTypes);
        setFlatTypes(data.flatTypes);
        setTransactions(data.rentalData);
        setAreas(data.areas);
        setGraphCalculation(data.graphCalculation)

        setLocalLoading(true);
        setIsLoading(false);
      }
    }
    processData();
  }, [selectedproject]);


  if (isLoading && localLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  const handleSelect = (e: any) => {
    setSelectedproject(e.value as string);
  }

  const options = projects.map((project) => {
    return {
      value: project,
      label: project,
    }
  })


  return (

    <section>
      <WindowedSelect
        placeholder="Select Project"
        options={options}
        className="text-xs"
        value={selectedproject ? { value: selectedproject, label: selectedproject } : null}
        windowThreshold={50}
        onChange={(e: any) => handleSelect(e)}
      />
    </section>
  );
}
