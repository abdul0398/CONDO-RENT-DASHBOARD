import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from "@/context/context";
import { filterHandlerReturn } from '@/types/data';
import { filterHandler } from '@/actions/filterHandler';

export default function Areas() {
    const {
areas,

    } = useContext(MyContext);
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
    const handleBlockClick = (block:string) => {
        setSelectedAreas(prev => {
            const newSelectedBlocks = [...prev]
            if (newSelectedBlocks.includes(block)) {
                newSelectedBlocks.splice(newSelectedBlocks.indexOf(block), 1);
            } else {
                newSelectedBlocks.push(block);
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
        // if (!isReady) return;
        // async function fetchData() {
        //     const values:filterHandlerReturn = await filterHandler({ selectedMonths, selectedTown, selectedStreetNames, selectedBlocks, selectedFlatType});
        //     setStreets(values.filterStreets);
        //     setFlatTypes(values.filterFlatTypes);
        //     setMonths(values.filterMonths);
        //     setTowns(values.filterTowns);
        //     setTransactions(values.filteredTransaction);
        // }
        // fetchData();
    }, []);

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