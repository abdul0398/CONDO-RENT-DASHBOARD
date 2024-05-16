import { Button } from "@/components/ui/button";
import { MyContext } from "@/context/context";
import { ResponseBody, rentalData } from "@/types/data";
import React, { useContext, useEffect, useMemo } from "react";
import {
  allAreas,
  allDistricts,
  allGraphData,
  allMonths,
  allProjects,
  allPropertyTypes,
  allStreets,
} from "@/data/constants";
import data from "@/data/rentals1.json";
import WindowedSelect from "react-windowed-select";
import { customStyles } from "@/style/select";

export default function FlatType() {
  const {
    flatTypes,
    setSelectedFlatType,
    selectedFlatType,
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
    setGraphCalculation,
  } = useContext(MyContext);
  const [isReady, setIsReady] = React.useState(false);
  const array = data as rentalData[];

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
        setStreets(allStreets);
        setMonths(allMonths);
        setdistricts(allDistricts);
        setProperties(allPropertyTypes);
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
        setdistricts(data.districts);
        setprojects(data.projects);
        setStreets(data.streets);
        setMonths(data.months);
        setProperties(data.projectTypes);
        setAreas(data.areas);
        setTransactions(data.rentalData);
        setGraphCalculation(data.graphCalculation);

        setIsLoading(false);
      }
    }
    processData();
  }, [selectedFlatType]);

  const handleSelect = (e: any) => {
    setSelectedFlatType(e.value as string);
  };

  const options = flatTypes.map((flatType) => {
    return {
      value: flatType,
      label: flatType,
    };
  });

  return (
    <div>
      <WindowedSelect
        placeholder="Select FlatType"
        options={options}
        styles={customStyles}
        className="text-xs"
        value={
          selectedFlatType
            ? { value: selectedFlatType, label: selectedFlatType }
            : null
        }
        windowThreshold={50}
        menuPortalTarget={document.querySelector("body")}
        onChange={(e: any) => handleSelect(e)}
      />
    </div>
  );
}
