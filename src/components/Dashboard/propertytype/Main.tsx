import { Button } from "@/components/ui/button"
import { MyContext } from "@/context/context";
import { allAreas, allBedrooms, allDistricts, allGraphData, allMonths, allProjects, allStreets } from "@/data/constants";
import { ResponseBody, rentalData } from "@/types/data";
import { useContext, useEffect, useState } from "react";
import data from "@/data/rentals1.json";
export default function Properties() {

  const {
    properties,
    setAreas,
    setFlatTypes,
    setMonths,
    setProperties,
    setdistricts,
    setprojects,
    setStreets,
    setSelectedProjectType,
    selectedAreas,
    selectedFlatType,
    selectedDistrictNames,
    selectedMonths,
    selectedProjectType,
    selectedprojects,
    selectedStreetNames,
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
        selectedDistrictNames,
        selectedStreetNames,
        selectedprojects,
        selectedFlatType,
        selectedMonths,
        selectedProjectType,
        selectedAreas,
      }

      if (selectedDistrictNames.length === 0 &&
        selectedStreetNames.length === 0 &&
        selectedprojects.length === 0 &&
        selectedFlatType === "" &&
        selectedMonths.length === 0 &&
        selectedProjectType === "" &&
        selectedAreas.length === 0) {
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

  return (
    <div className="flex flex-row gap-7 overflow-x-auto">
      {
        properties.map((propertyType, index) => (
          <Button key={index} className={getButtonClassName(propertyType)} onClick={() => handleButtonClick(propertyType)} variant="outline">
            {propertyType}
          </Button>
        ))
      }
    </div>

  );
}