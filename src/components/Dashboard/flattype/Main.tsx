import { Button } from "@/components/ui/button";
import { MyContext } from "@/context/context";
import { ResponseBody, rentalData } from "@/types/data";
import React, { useContext, useEffect, useMemo } from "react";
import { allAreas, allDistricts, allGraphData, allMonths, allProjects, allPropertyTypes, allStreets } from "@/data/constants";
import data from "@/data/rentals1.json";
import WindowedSelect from "react-windowed-select";


export default function FlatType() {
  const {
    flatTypes,
    setSelectedFlatType,
    selectedFlatType,
    isLoading,
    setIsLoading,
    setAreas,
    setMonths,
    setProperties,
    setprojects,
    setStreets,
    setdistricts,
    selectedDistrictName,
    selectedStreetName,
    selectedproject,
    selectedMonth,
    selectedProjectType,
    selectedArea,
    setTransactions,
    setGraphCalculation
  } = useContext(MyContext);
  const [isReady, setIsReady] = React.useState(false);
  const [localLoading, setLocalLoading] = React.useState(true);
  const array = data as rentalData[];


  useEffect(() => {
    // Set isReady to true after the initial render
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    setLocalLoading(false);
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
        setStreets(allStreets);
        setMonths(allMonths);
        setdistricts(allDistricts);
        setProperties(allPropertyTypes);
        setAreas(allAreas);
        setTransactions(array);
        setGraphCalculation(allGraphData)


        setLocalLoading(true);
        setIsLoading(false);
      } else {
        const res = await fetch("/api/processData", {
          method: "POST",
          body: JSON.stringify(preData),
        });
        const data: ResponseBody = await res.json();
        setdistricts(data.districts);
        setprojects(data.projects);
        setStreets(data.streets);
        setMonths(data.months);
        setProperties(data.projectTypes);
        setAreas(data.areas);
        setTransactions(data.rentalData);
        setGraphCalculation(data.graphCalculation);

        setLocalLoading(true);
        setIsLoading(false);
      }
    }
    processData();
  }, [selectedFlatType]);

  const getButtonClassName = (type: string | undefined) => {
    return selectedFlatType === type
      ? "bg-black text-white hover:bg-black hover:text-white"
      : "";
  };
  if (isLoading && localLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  const handleSelect = (e: any) => {
    setSelectedFlatType(e.value as string);
  }


  const options = flatTypes.map((flatType) => {
    return {
      value: flatType,
      label: flatType,
    }
  })

  return (
    <div>
      <WindowedSelect
        placeholder="Select FlatType"
        options={options}
        className="text-xs"
        value={selectedFlatType ? { value: selectedFlatType, label: selectedFlatType } : null}
        windowThreshold={50}
        onChange={(e: any) => handleSelect(e)}
      />
    </div>
  );
}
