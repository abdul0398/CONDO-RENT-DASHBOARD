import React, { useState, useContext, useEffect} from "react";
import { MyContext } from "@/context/context";
import { allAreas, allBedrooms, allDistricts, allGraphData, allMonths, allProjects, allPropertyTypes, allStreets } from "@/data/constants";
import { ResponseBody, rentalData } from "@/types/data";
import data from "@/data/rentals1.json";
import WindowedSelect from "react-windowed-select";


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
    isLoading,
    setIsLoading,
    setTransactions,
    setGraphCalculation
  } = useContext(MyContext);

  const [localLoading, setLocalLoading] = useState(true);
  const array = data as rentalData[];
  const [isReady, setIsReady] = useState(false);

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
      if(
        selectedDistrictName == "" &&
        selectedStreetName == '' &&
        selectedproject == "" &&
        selectedFlatType === "" &&
        selectedMonth == "" &&
        selectedProjectType === "" &&
        selectedArea == ""
      ){
          setprojects(allProjects);
          setdistricts(allDistricts);
          setMonths(allMonths);
          setAreas(allAreas);
          setProperties(allPropertyTypes);
          setFlatTypes(allBedrooms);
          setTransactions(array);
          setGraphCalculation(allGraphData)


          setLocalLoading(true);
          setIsLoading(false);
        }else{
          
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
      setLocalLoading(true);
    }
  }
    processData();
  }, [selectedStreetName]);

  if (isLoading && localLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }


  const handleSelect = (e: any) => {
    setSelectedStreetName(e.value as string);
  }

  const options = streets.map((street) => {
    return {
      value: street,
      label: street,
    }
  })


  return (
    <section>
     <WindowedSelect
          placeholder="Select Street"
          options={options}
          className="text-xs"
          value={selectedStreetName ? { value: selectedStreetName, label: selectedStreetName } : null}
          windowThreshold={50}
          onChange={(e: any) => handleSelect(e)}
        />
    </section>
  );
}
