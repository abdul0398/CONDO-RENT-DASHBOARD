import { Button } from "@/components/ui/button";
import { MyContext } from "@/context/context";
import { filterHandler } from "@/actions/filterHandler";
import { ResponseBody, filterHandlerReturn, rentalData } from "@/types/data";
import React, { useContext, useEffect, useMemo } from "react";
import { allAreas, allBedrooms, allDistricts, allGraphData, allMonths, allProjects, allPropertyTypes, allStreets } from "@/data/constants";
import data from "@/data/rentals1.json";

export default function FlatType() {
  const {
    flatTypes,
    setSelectedFlatType,
    selectedFlatType,
    isLoading,
    setIsLoading,
    setAreas,
    setFlatTypes,
    setMonths,
    setProperties,
    setprojects,
    setStreets,
    setdistricts,
    selectedDistrictNames,
    selectedStreetNames,
    selectedprojects,
    selectedMonths,
    selectedProjectType,
    selectedAreas,
    setTransactions,
    setGraphCalculation

  } = useContext(MyContext);
  const [isReady, setIsReady] = React.useState(false);
  const [localLoading, setLocalLoading] = React.useState(true);
  const array = data as rentalData[];


  const handleButtonClick = (flatType: string | undefined) => {
    if (flatType === selectedFlatType) {
      setSelectedFlatType(undefined);
    } else {
      setSelectedFlatType(flatType);
    }
  };

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
        selectedDistrictNames,
        selectedStreetNames,
        selectedprojects,
        selectedFlatType,
        selectedMonths,
        selectedProjectType,
        selectedAreas,
      };

      if (
        selectedDistrictNames.length === 0 &&
        selectedStreetNames.length === 0 &&
        selectedprojects.length === 0 &&
        selectedFlatType === "" &&
        selectedMonths.length === 0 &&
        selectedProjectType === "" &&
        selectedAreas.length === 0
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

  return (
    <div className="w-full">
      <div className="">
        <div className="flex flex-row gap-7">
          {flatTypes.map((type, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleButtonClick(type)}
              className={getButtonClassName(type)}
            >
              {type?type:'Blank'}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
