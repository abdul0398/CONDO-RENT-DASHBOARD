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

    const [selected, setSelected] = useState<string | null>('map');
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
        <section className="mb-52 w-full mt-5 mx-auto lg:p-3 md:p-3 overflow-auto ">
            <Sidebar scrollHandler={scrollHandler} selected={selected} isOpen={isOpen} setIsOpen={setIsOpen} />
            <section className="w-full md:w-4/5 lg:w-5/6 ms-auto lg:p-5 md:p-5 p-2">
                <section className="h-11 w-full relative">
                    <Button className="bg-black text-white hover:bg-black hover:text-white absolute end-0" onClick={(e) => { handleReset(e) }} variant="outline">Reset</Button>
                </section>
                {/* <h2 id="filters" className="ps-4 text-xl my-4">Filters</h2>
                <section className="flex gap-1 flex-wrap justify-center">
                    <Districts />
                    <Projects />
                    <Streets />
                    <Months />
                    <FlatType />
                    <Properties />
                    <Areas />
                </section> */}
                <section className="flex mt-5 w-full flex-col mb-5">
                    <div className="rounded-lg border bg-white shadow-lg">
                        <div className="flex gap-2 lg:flex-row md:flex-row flex-col">
                            <h2 id="map" className="ps-4 text-xl my-4 whitespace-nowrap">Map</h2>
                            <div className="flex gap-1 items-center flex-wrap justify-center pt-2">
                                <Districts />
                                <Projects />
                                <Streets />
                                <Months />
                                <FlatType />
                                <Properties />
                                <Areas />
                            </div>
                        </div>
                        <div className="h-[600px] mt-5 rounded-lg">
                            <MapCompenent />
                        </div>
                    </div>
                </section>
                <section className="w-full rounded-lg shadow-lg flex border mt-5 py-3">
                    <div className="w-full">
                        <div className="flex gap-2 lg:flex-row md:flex-row flex-col">
                            <h2 id="graph" className="ps-4 text-xl my-4 whitespace-nowrap">Rent Graph</h2>
                            <div className="flex gap-1 items-center flex-wrap justify-center">
                                <Districts />
                                <Projects />
                                <Streets />
                                <Months />
                                <FlatType />
                                <Properties />
                                <Areas />
                            </div>
                        </div>
                        <Graph />
                    </div>
                </section>
            </section>
            <section className="min-w-[900px] md:w-4/5 lg:w-5/6 mt-5 ms-auto ps-5  ">
                <div className="border rounded-xl p-3 shadow-lg">
                    <div className="flex gap-2">
                        <h2 id="transactions" className="ps-4 text-xl my-4">Transactions</h2>
                        <div className="flex gap-1 items-center flex-wrap justify-center">
                            <Districts />
                            <Projects />
                            <Streets />
                            <Months />
                            <FlatType />
                            <Properties />
                            <Areas />
                        </div>

                    </div>
                    <Transactions />
                </div>
            </section>
        </section>
    )
}