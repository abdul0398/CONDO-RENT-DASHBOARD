'use client'
import React, { useState, useMemo } from "react";
import Dashboard from "../components/Dashboard/Main";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { MyContext } from "@/context/context";
import { allBedrooms, allMonths, allProjects, allStreets , allPropertyTypes, allDistricts, allAreas, allGraphData} from "@/data/constants";
import { rentalData } from "@/types/data";
import data from "@/data/rentals1.json";
export default function Home() {
  const array = data as rentalData[]; 


  const [isLoading, setIsLoading] = useState<boolean>(false);
 const [districts, setdistricts] = useState<string[]>(allDistricts);
 const [streets, setStreets] = useState<string[]>(allStreets);
 const [projects, setprojects] = useState<string[]>(allProjects);
 const [flatTypes, setFlatTypes] = useState<(string | undefined)[]>(allBedrooms);
 const [months, setMonths] = useState<string[]>(allMonths);
 const [properties, setProperties] = useState<string[]>(allPropertyTypes);
 const [areas, setAreas] = useState<string[]>(allAreas);
 const [selectedDistrictNames, setSelectedDistrictsNames] = useState<string[]>([]);
 const [selectedStreetNames, setSelectedStreetNames] = useState<string[]>([]);
 const [selectedprojects, setSelectedprojects] = useState<string[]>([]);
 const [selectedFlatType, setSelectedFlatType] = useState<(string | undefined)>('');
 const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
 const [graphCalculation, setGraphCalculation] = useState<any>(allGraphData);
 const [selectedProjectType, setSelectedProjectType] = useState<string>(''); // Added missing state
 const [selectedAreas, setSelectedAreas] = useState<string[]>([]); // Added missing state
 const [transactions, setTransactions] = useState<rentalData[]>(array);

 // Memoize context value to prevent unnecessary re-renders
 const contextValue = useMemo(() => ({
  graphCalculation, setGraphCalculation,
 transactions, setTransactions,
 isLoading, setIsLoading,
 districts, setdistricts,
 streets, setStreets,
 projects, setprojects,
 flatTypes, setFlatTypes,
 months, setMonths,
 properties, setProperties,
 areas, setAreas,
 selectedDistrictNames, setSelectedDistrictsNames,
 selectedStreetNames, setSelectedStreetNames,
 selectedprojects, setSelectedprojects,
 selectedFlatType, setSelectedFlatType,
 selectedMonths, setSelectedMonths,
 selectedProjectType, setSelectedProjectType, // Included missing state
 selectedAreas, setSelectedAreas // Included missing state
 }), [transactions, isLoading, districts, graphCalculation, areas, streets, projects, flatTypes, months, properties, selectedDistrictNames, selectedStreetNames, selectedprojects, selectedFlatType, selectedMonths, selectedProjectType, selectedAreas, setProperties]);

 return (
    <main className="h-full w-full pt-8">
      <section className="w-[1200px] mx-auto h-full">
        <h1 className="text-3xl">HDB Rental Rates</h1>
        <MyContext.Provider value={contextValue}>
          <Dashboard />
        </MyContext.Provider>
      </section>
      <SpeedInsights />
    </main>
 );
}
