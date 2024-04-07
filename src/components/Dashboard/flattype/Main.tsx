import { Button } from "@/components/ui/button";
import { MyContext } from "@/context/context";
import { filterHandler } from "@/actions/filterHandler";
import { filterHandlerReturn } from "@/types/data";
import React, { useContext, useEffect, useMemo } from "react";

export default function FlatType() {
    const {
        flatTypes,
        setSelectedFlatType,
        selectedFlatType
    } = useContext(MyContext);

    const handleButtonClick = (flatType :(string|undefined)) => {
        if(flatType === selectedFlatType) {
            setSelectedFlatType(undefined);
        } else {
            setSelectedFlatType(flatType);
        }
    };

    const [isReady, setIsReady] = React.useState(false);
    useEffect(() => {
        // Set isReady to true after the initial render
        setIsReady(true);
    }, [])
    
    useEffect(() => {
        if (!isReady) return;
        // async function fetchData() {
        //     const values:filterHandlerReturn = await filterHandler({ selectedMonths, selectedTown, selectedStreetNames, selectedBlocks, selectedFlatType});
        //     setStreets(values.filterStreets);
        //     setBlocks(values.filterBlocks);
        //     setFlatTypes(values.filterFlatTypes);
        //     setMonths(values.filterMonths);
        //     setTowns(values.filterTowns);
        //     setTransactions(values.filteredTransaction);
        // }
        // fetchData();
    }, []);

    const getButtonClassName = (type : (string | undefined)) => {
        return selectedFlatType === type ? 'bg-black text-white hover:bg-black hover:text-white' : '';
    };

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
                            {type}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}
