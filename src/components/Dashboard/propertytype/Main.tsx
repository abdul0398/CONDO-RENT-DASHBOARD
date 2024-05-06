import { Button } from "@/components/ui/button"
import { MyContext } from "@/context/context";
import { allAreas, allBedrooms, allDistricts, allGraphData, allMonths, allProjects, allStreets } from "@/data/constants";
import { ResponseBody, rentalData } from "@/types/data";
import { useContext, useEffect, useState } from "react";
import data from "@/data/rentals1.json";
import WindowedSelect from "react-windowed-select";
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
    isLoading,
    setIsLoading,
    setTransactions,
    setGraphCalculation
  } = useContext(MyContext)
  const [localLoading, setLocalLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const array = data as rentalData[];



  const handleButtonClick = (propertyType: string) => {
    if (selectedProjectType === propertyType) {
      setSelectedProjectType("");
    } else {
      setSelectedProjectType(propertyType);
    }

  }

  useEffect(() => {
    // Set isReady to true after the initial render
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    setLocalLoading(false)
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
      }

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
        setdistricts(allDistricts);
        setStreets(allStreets);
        setMonths(allMonths);
        setFlatTypes(allBedrooms);
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
        setprojects(data.projects);
        setStreets(data.streets);
        setMonths(data.months);
        setdistricts(data.districts);
        setFlatTypes(data.flatTypes);
        setAreas(data.areas);
        setTransactions(data.rentalData);
        setGraphCalculation(data.graphCalculation);

        setLocalLoading(true);
        setIsLoading(false);
      }
    }
    processData();
  }, [selectedProjectType]);





  if (isLoading && localLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }
  const getButtonClassName = (propertyType: string) => {
    return selectedProjectType === propertyType
      ? "bg-black text-white hover:bg-black hover:text-white"
      : "";
  };

  const handleSelect = (e: any) => {
    setSelectedProjectType(e.value as string);
  }

  const options = properties.map((propertie) => {
    return {
      value: propertie,
      label: propertie,
    }
  })

  return (
    <div className="">
       <WindowedSelect
          placeholder="Select Property Type"
          options={options}
          className="text-xs"
          value={selectedProjectType ? { value: selectedProjectType, label: selectedProjectType } : null}
          windowThreshold={50}
          onChange={(e: any) => handleSelect(e)}
        />
    </div>

  );
}