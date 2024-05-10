import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from "@/context/context";
import { allBedrooms, allDistricts, allGraphData, allMonths, allProjects, allPropertyTypes, allStreets } from '@/data/constants';
import { ResponseBody, rentalData } from '@/types/data';
import data from "@/data/rentals1.json";
import WindowedSelect from "react-windowed-select";


export default function Areas() {
  const {
    selectedFlatType,
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
  const array = data as rentalData[];

  useEffect(() => {
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

        setIsLoading(false);
      }
    }
    processData();
  }, [selectedArea]);


  const handleSelect = (e: any) => {
    setSelectedArea(e.value as string);
  }

  const options = areas.map((area) => {
    return {
      value: area,
      label: area,
    }
  })

  const styles = {
    container: (css: any) => ({ ...css, width: '180px' }),
  };

  return (
    <div className="">
      <WindowedSelect
        placeholder="Select Area"
        options={options}
        className="text-xs"
        styles={styles}
        value={selectedArea ? { value: selectedArea, label: selectedArea } : null}
        windowThreshold={50}
        onChange={(e: any) => handleSelect(e)}
      />
    </div>
  );
}