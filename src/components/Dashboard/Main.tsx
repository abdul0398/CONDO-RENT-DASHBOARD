import FlatType from "./flattype/Main";
import Months from "./months/Main";
import Graph from "./graph/Main";
import MapCompenent from "./map/Main";
import Streets from "./streets/Main";
import Properties from "./propertytype/Main";
import Projects from "./projects/Main";
import Districts from "./districts/Main";
import Areas from "./areas/Main";
import Transactions from "./transaction-table/Main";
import { Button } from "../ui/button";
import { MouseEvent, useContext, useRef, useState } from "react";
import { MyContext } from "@/context/context";
import { allGraphData } from "@/data/constants";
import Sidebar from "./sidebar/Main";

export default function Dashboard() {
    const { setSelectedArea, setGraphCalculation, setSelectedDistrictsName, setSelectedFlatType, setSelectedMonth, setSelectedProjectType, setSelectedStreetName, setSelectedproject } = useContext(MyContext)

    const handleReset = (e: any) => {
        e.preventDefault()
        setSelectedArea('')
        setGraphCalculation(allGraphData)
        setSelectedDistrictsName('')
        setSelectedFlatType('')
        setSelectedMonth('')
        setSelectedProjectType('')
        setSelectedStreetName('')
        setSelectedproject('')
    }

    const [selected, setSelected] = useState<string | null>('filters');
    const [isOpen, setIsOpen] = useState(true);


    const mq = useRef(window.matchMedia("(max-width: 498px)"));

    const scrollHandler = (event: MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const targetId = event.currentTarget.getAttribute('data-target');
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }

        if (mq.current.matches) setIsOpen(false);


        setSelected(targetId)
    }


    return (
        <section className="mb-52 w-full mt-5 mx-auto p-3 overflow-auto ">
            <Sidebar scrollHandler={scrollHandler} selected={selected} isOpen={isOpen} setIsOpen={setIsOpen} />
            <section className="w-full md:w-4/5 lg:w-5/6 ms-auto p-5">
                <section className="h-11 w-full relative">
                    <Button className="bg-black text-white hover:bg-black hover:text-white absolute end-0" onClick={(e) => { handleReset(e) }} variant="outline">Reset</Button>
                </section>
                <h2 id="filters" className="ps-4 text-xl my-4">Filters</h2>
                <section className="flex gap-3 flex-wrap justify-center">
                    <Districts />
                    <Projects />
                    <Streets />
                    <Months />
                    <FlatType />
                    <Properties />
                    <Areas />
                </section>
                <h2 id="map" className="ps-4 text-xl my-4">Map</h2>
                <section className="flex mt-5 w-full flex-col">
                    <div className="p-3 rounded-lg border bg-white h-96">
                        <MapCompenent />
                    </div>
                </section>
                <h2 id="graph" className="ps-4 text-xl my-4">Graph</h2>
                <section className="w-full h-96 flex">
                    <div className="w-full">
                        <Graph />
                    </div>
                </section>
                <h2 id="transactions" className="ps-4 text-xl my-4">Transactions</h2>
            </section>
            <section className="min-w-[400px] mt-5">
                <Transactions />
            </section>
        </section>
    )
}