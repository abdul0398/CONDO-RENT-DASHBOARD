import React, { useState, useContext, useEffect, use } from 'react';
import { FixedSizeList as List } from 'react-window';
import { MyContext } from "@/context/context";
import { allAreas, allBedrooms, allDistricts, allGraphData, allProjects, allPropertyTypes, allStreets } from '@/data/constants';
import data from '@/data/rentals1.json';
import { rentalData } from '@/types/data';
import WindowedSelect from 'react-windowed-select';

interface RowProps {
    index: number;
    style: React.CSSProperties;
    data: { month: string; selected: boolean }[];
    onCheckboxChange: (name: string, checked: boolean) => void;
}

const Row: React.FC<RowProps> = ({ index, style, data, onCheckboxChange }) => {
    return (
        <div style={style} className="flex mx-auto items-center">
            <input type="checkbox"
                onChange={(e) => onCheckboxChange(data[index].month, e.target.checked)}
                checked={data[index].selected}
                className="mr-2"
            />
            <p className="ms-1 text-xs text-slate-600 ">{data[index].month}</p>
        </div>
    );
};

export default function Months() {
    const {
        months,
        selectedMonth,
        selectedArea,
        selectedDistrictName,
        selectedFlatType,
        selectedProjectType,
        selectedStreetName,
        selectedproject,
        setSelectedMonth,
        setAreas,
        setFlatTypes,
        setIsLoading,
        setProperties,
        setdistricts,
        setStreets,
        setprojects,
        setTransactions,
        setGraphCalculation
    } = useContext(MyContext);

    const array = data as rentalData[];

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Set isReady to true after the initial render
        setIsReady(true);
    }, [])


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
                selectedStreetName == '' &&
                selectedproject == "" &&
                selectedFlatType === "" &&
                selectedMonth == "" &&
                selectedProjectType === "" &&
                selectedArea == ""
            ) {
                setprojects(allProjects);
                setStreets(allStreets);
                setdistricts(allDistricts);
                setAreas(allAreas);
                setFlatTypes(allBedrooms);
                setProperties(allPropertyTypes);
                setTransactions(array);
                setGraphCalculation(allGraphData)
                setIsLoading(false);

            } else {
                const res = await fetch("/api/processData", {
                    method: "POST",
                    body: JSON.stringify(preData),
                });
                const data: any = await res.json();
                setprojects(data.projects);
                setdistricts(data.districts);
                setStreets(data.streets);
                setAreas(data.areas);
                setProperties(data.projectTypes);
                setFlatTypes(data.flatTypes);
                setTransactions(data.rentalData);
                setGraphCalculation(data.graphCalculation);
                setIsLoading(false);
            }
        }
        processData();
    }, [selectedMonth])


    const handleSelect = (e: any) => {
        setSelectedMonth(e.value as string);
      }
    
      const options = months.map((month) => {
        return {
          value: month,
          label: month,
        }
      })

      const styles = {
        container: (css: any) => ({ ...css, width: '180px' }),
      };


    return (
        <section >
            <WindowedSelect
                placeholder="Select Month"
                options={options}
                className="text-xs"
                styles={styles}
                value={selectedMonth ? { value: selectedMonth, label: selectedMonth } : null}
                windowThreshold={50}
                onChange={(e: any) => handleSelect(e)}
            />
        </section>
    );
}
