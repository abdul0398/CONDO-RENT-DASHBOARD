import React, { useState, useContext, useEffect, use } from 'react';
import { FixedSizeList as List } from 'react-window';
import { MyContext } from "@/context/context";
 

interface RowProps {
 index: number;
 style: React.CSSProperties;
 data: { month: string; selected: boolean }[];
 onCheckboxChange: (index: number, checked: boolean) => void;
}

const Row: React.FC<RowProps> = ({ index, style, data, onCheckboxChange }) => {
    return (
        <div style={style} className="flex mx-auto items-center">
            <input type="checkbox"
                onChange={(e) => onCheckboxChange(index, e.target.checked)}
                checked={data[index].selected}
                className="mr-2"
            />
            <p className="ms-1 text-xs text-slate-600 ">{data[index].month}</p>
        </div>
    );
};

export default function Months() {
    const { months } = useContext(MyContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMonths, setSelectedMonths,] = useState<boolean[]>(new Array(months.length).fill(false));

    // Filter streets based on search query
    const filteredMonths = months.filter((month, index) =>
    month.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const itemData = filteredMonths.map((month, index) => ({
        month,
        selected: selectedMonths[index]
    }));

    const handleCheckboxChange = (index: number, checked: boolean) => {
        setSelectedMonths(prev => {
            const newSelectedDistricts = [...prev];
            newSelectedDistricts[index] = checked;
            return newSelectedDistricts;
        });
    
        // // Update selectedStreetNames based on the checkbox change
        // if (checked) {
        //     setSelectedStreetNames(prev => [...prev, filteredStreets[index]]);
        // } else {
        //     setSelectedStreetNames(prev => prev.filter(name => name !== filteredStreets[index]));
        // }
    };
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Set isReady to true after the initial render
        setIsReady(true);
    },[])


    useEffect(() => {
        // if (!isReady) return;
        // async function fetchData() {
        //     const values:filterHandlerReturn = await filterHandler({ selectedMonths, selectedTown, selectedStreetNames, selectedBlocks, selectedFlatType});
        //     setBlocks(values.filterBlocks);
        //     setFlatTypes(values.filterFlatTypes);
        //     setMonths(values.filterMonths);
        //     setTowns(values.filterTowns);
        //     setTransactions(values.filteredTransaction);
        // }
        // fetchData();
    }, [])
    

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
