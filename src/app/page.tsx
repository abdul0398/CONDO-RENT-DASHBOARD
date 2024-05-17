"use client";
import React, { useState, useMemo } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MyContext } from "@/context/context";
import {
  allBedrooms,
  allMonths,
  allProjects,
  allStreets,
  allPropertyTypes,
  allDistricts,
  allAreas,
  allGraphData,
} from "@/data/constants";
import { rentalData } from "@/types/data";
import data from "@/data/rentals1.json";
import dynamic from "next/dynamic";
import { BsBuildings } from "react-icons/bs";
import { useSearchParams } from "next/navigation";
const Dashboard = dynamic(() => import("@/components/Dashboard/Main"), {
  ssr: false,
});
export default function Home() {
  const searchParams = useSearchParams();
  const project = searchParams.get("project");
  const validProject = project && allProjects.includes(project) ? project : "";
  const array = data as rentalData[];

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [districts, setdistricts] = useState<string[]>(allDistricts);
  const [streets, setStreets] = useState<string[]>(allStreets);
  const [projects, setprojects] = useState<string[]>(allProjects);
  const [flatTypes, setFlatTypes] =
    useState<(string | undefined)[]>(allBedrooms);
  const [months, setMonths] = useState<string[]>(allMonths);
  const [properties, setProperties] = useState<string[]>(allPropertyTypes);
  const [areas, setAreas] = useState<string[]>(allAreas);
  const [selectedDistrictName, setSelectedDistrictsName] = useState<string>("");
  const [selectedStreetName, setSelectedStreetName] = useState<string>("");
  const [selectedproject, setSelectedproject] = useState<string>(validProject);
  const [selectedFlatType, setSelectedFlatType] = useState<string | undefined>(
    ""
  );
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [graphCalculation, setGraphCalculation] = useState<any>(allGraphData);
  const [selectedProjectType, setSelectedProjectType] = useState<string>(""); // Added missing state
  const [selectedArea, setSelectedArea] = useState<string>(""); // Added missing state
  const [transactions, setTransactions] = useState<rentalData[]>(array);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      graphCalculation,
      setGraphCalculation,
      transactions,
      setTransactions,
      isLoading,
      setIsLoading,
      districts,
      setdistricts,
      streets,
      setStreets,
      projects,
      setprojects,
      flatTypes,
      setFlatTypes,
      months,
      setMonths,
      properties,
      setProperties,
      areas,
      setAreas,
      selectedDistrictName,
      setSelectedDistrictsName,
      selectedStreetName,
      setSelectedStreetName,
      selectedproject,
      setSelectedproject,
      selectedFlatType,
      setSelectedFlatType,
      selectedMonth,
      setSelectedMonth,
      selectedProjectType,
      setSelectedProjectType, // Included missing state
      selectedArea,
      setSelectedArea, // Included missing state
    }),
    [
      transactions,
      isLoading,
      districts,
      graphCalculation,
      areas,
      streets,
      projects,
      flatTypes,
      months,
      properties,
      selectedDistrictName,
      selectedStreetName,
      selectedproject,
      selectedFlatType,
      selectedMonth,
      selectedProjectType,
      selectedArea,
      setProperties,
    ]
  );

  return (
    <>
      {isLoading && (
        <div className="bg-black fixed z-50 w-full h-full flex justify-center items-center opacity-80">
          <div role="status">
            <BsBuildings size={50} color="white" />
            <p className="text-white">Loading...</p>
          </div>
        </div>
      )}
      <main className="h-full w-full pt-8">
        <section className="w-full mx-auto h-full">
          <MyContext.Provider value={contextValue}>
            <Dashboard />
          </MyContext.Provider>
        </section>
        <SpeedInsights />
      </main>
    </>
  );
}
