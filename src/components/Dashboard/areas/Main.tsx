import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from "@/context/context";
import { allBedrooms, allDistricts, allGraphData, allMonths, allProjects, allPropertyTypes, allStreets } from '@/data/constants';
import { ResponseBody, rentalData } from '@/types/data';
import data from "@/data/rentals1.json";
import WindowedSelect from "react-windowed-select";


export default function Areas() {
  const {
    selectedFlatType,
    isLoading,
    setIsLoading,
    setFlatTypes,
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
    setSelectedArea,
    areas,
    setTransactions,
    setGraphCalculation,
  } = useContext(MyContext);
  const [localLoading, setLocalLoading] = useState(true);
  const array = data as rentalData[];

  useEffect(() => {
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
        selectedStreetName == '' &&
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
        setFlatTypes(allBedrooms);
        setTransactions(array);
        setGraphCalculation(allGraphData);
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
        setFlatTypes(data.flatTypes);
        setTransactions(data.rentalData);
        setGraphCalculation(data.graphCalculation);

        setLocalLoading(true);
        setIsLoading(false);
      }
    }
    processData();
  }, [selectedArea]);


  if (isLoading && localLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  const handleSelect = (e: any) => {
    setSelectedArea(e.value as string);
  }

  const options = areas.map((area) => {
    return {
      value: area,
      label: area,
    }
  })


  return (
    <div className="">
      <WindowedSelect
        placeholder="Select Area"
        options={options}
        className="text-xs"
        value={selectedArea ? { value: selectedArea, label: selectedArea } : null}
        windowThreshold={50}
        onChange={(e: any) => handleSelect(e)}
      />
    </div>
  );
}