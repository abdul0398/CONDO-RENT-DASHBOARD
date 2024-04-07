import React, { useState, useContext, useEffect, use } from 'react';
import { FixedSizeList as List } from 'react-window';
import { MyContext } from "@/context/context";
import { allAreas, allBedrooms, allDistricts, allGraphData, allProjects, allPropertyTypes, allStreets } from '@/data/constants';
import data from '@/data/rentals1.json';
import { rentalData } from '@/types/data';

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
        selectedMonths,
        selectedAreas,
        selectedDistrictNames,
        selectedFlatType,
        selectedProjectType,
        selectedStreetNames,
        selectedprojects,
        setSelectedMonths,
        setAreas,
        setFlatTypes,
        setIsLoading,
        setProperties,
        setdistricts,
        setStreets,
        setprojects,
        setTransactions,
        setGraphCalculation,
        isLoading
    } = useContext(MyContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [localLoading, setLocalLoading] = useState(true);
    const array = data as rentalData[];


    // Filter streets based on search query
    const filteredMonths = months.filter((month, index) =>
        month.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const itemData = filteredMonths.map((month, index) => ({
        month,
        selected: selectedMonths.includes(month) ? true : false,
    }));

    const handleCheckboxChange = (name: string, checked: boolean) => {
        // Update selectedStreetNames based on the checkbox change
        if (checked) {
            setSelectedMonths(prev => [...prev, name]);
        } else {
            setSelectedMonths(prev => prev.filter(name => name !== name));
        }
        setIsLoading(true);
    };
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Set isReady to true after the initial render
        setIsReady(true);
    }, [])


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
            if (selectedDistrictNames.length === 0 &&
                selectedStreetNames.length === 0 &&
                selectedprojects.length === 0 &&
                selectedFlatType === "" &&
                selectedMonths.length === 0 &&
                selectedProjectType === "" &&
                selectedAreas.length === 0) {
                setprojects(allProjects);
                setStreets(allStreets);
                setdistricts(allDistricts);
                setAreas(allAreas);
                setFlatTypes(allBedrooms);
                setProperties(allPropertyTypes);
                setTransactions(array);
                setGraphCalculation(allGraphData)



                setLocalLoading(true);
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

                setLocalLoading(true);
                setIsLoading(false);
            }
        }
        processData();
    }, [selectedMonths])


    if (isLoading && localLoading) {
        return (
            <div className="h-full w-full flex items-center justify-center bg-white">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <section className="overflow-hidden">
            <div className="h-full bg-white overflow-auto min-w-[150px]">
                <input
                    type="text"
                    className="mb-2 w-full h-3 border-0 rounded-none focus:outline-none px-3 py-1 text-sm"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="pb-1 px-2 text-xsm">
                    <List
                        height={215}
                        itemCount={itemData.length}
                        itemSize={40}
                        width="100%"
                        itemData={itemData} // Pass combined data to the Row component
                    >
                        {props => <Row {...props} onCheckboxChange={handleCheckboxChange} />}
                    </List>
                </div>
            </div>
        </section>
    );
}
