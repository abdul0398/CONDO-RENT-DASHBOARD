import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "@/context/context";
import { ResponseBody, rentalData } from "@/types/data";
import {
  allProjects,
  allStreets,
  allMonths,
  allAreas,
  allBedrooms,
  allPropertyTypes,
  allGraphData,
} from "@/data/constants";
import WindowedSelect from "react-windowed-select";
import data from "@/data/rentals1.json";


export default function Districts() {
  const {
    districts,
    setAreas,
    setFlatTypes,
    setMonths,
    setProperties,
    setprojects,
    setStreets,
    selectedArea,
    selectedFlatType,
    selectedDistrictName,
    selectedMonth,
    selectedProjectType,
    selectedproject,
    selectedStreetName,
    setSelectedDistrictsName,
    setTransactions,
    setIsLoading,
    setGraphCalculation
  } = useContext(MyContext);

  // const [searchQuery, setSearchQuery] = useState("");
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
        setStreets(allStreets);
        setMonths(allMonths);
        setFlatTypes(allBedrooms);
        setProperties(allPropertyTypes);
        setAreas(allAreas);
        setTransactions(array);
        setGraphCalculation(allGraphData)


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
        setFlatTypes(data.flatTypes);
        setProperties(data.projectTypes);
        setAreas(data.areas);
        setTransactions(data.rentalData);
        setGraphCalculation(data.graphCalculation);
        setIsLoading(false);
      }
    }
    processData();
  }, [selectedDistrictName]);


  const handleSelect = (e: any) => {
    setSelectedDistrictsName(e.value as string);
  }

  const options = districts.map((district) => {
    return {
      value: district,
      label: district,
    }
  })

  const styles = {
    container: (css: any) => ({ ...css, width: '180px' }),
  };

  return (
    <section>
        <WindowedSelect
          placeholder="Select Districts"
          options={options}
          className="text-xs"
          styles={styles}
          value={selectedDistrictName ? { value: selectedDistrictName, label: selectedDistrictName } : null}
          windowThreshold={50}
          onChange={(e: any) => handleSelect(e)}
        />
    </section >
  );
}
