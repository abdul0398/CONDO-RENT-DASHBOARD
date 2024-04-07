import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from "@/context/context";
import { allBedrooms, allDistricts, allMonths, allProjects, allPropertyTypes, allStreets } from '@/data/constants';
import { ResponseBody } from '@/types/data';

export default function Areas() {
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
        setSelectedAreas,
        areas
    } = useContext(MyContext);
    const [localLoading, setLocalLoading] = useState(true);



    const handleBlockClick = (areas:string) => {
        setSelectedAreas(prev => {
            const newSelectedBlocks = [...prev]
            if (newSelectedBlocks.includes(areas)) {
                newSelectedBlocks.splice(newSelectedBlocks.indexOf(areas), 1);
            } else {
                newSelectedBlocks.push(areas);
            }
            return newSelectedBlocks;
        });
    };

        const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        setIsReady(true);
        async function start() {
        }
        start();
    }, [])

    useEffect (() => {
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
            setFlatTypes(allBedrooms);
          
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
          
            setLocalLoading(true);
            setIsLoading(false);
          }
        }
        processData();
    }, [selectedAreas]);


    if (isLoading && localLoading) {
        return (
          <div className="h-full w-full flex items-center justify-center bg-white">
            <p className="text-lg">Loading...</p>
          </div>
        );
      }
    


    return (
        <div className="">
            <div className="mx-4 grid grid-cols-5 h-96 overflow-auto min-w-[420px] bg-white">
                {areas.map((block, i) => (
                    <div
                        key={i}
                        className={`flex justify-center items-center border hover:border-slate-700 size-20 hover:cursor-pointer ${ selectedAreas.includes(block)  ? "bg-black text-white" : ""}`}
                        onClick={() => handleBlockClick(block)}
                    >
                        {block}
                    </div>
                ))}
            </div>
        </div>
    );
}