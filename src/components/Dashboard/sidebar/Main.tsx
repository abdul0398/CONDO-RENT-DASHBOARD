'use client'

import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"


export default function Sidebar({ scrollHandler, selected, isOpen, setIsOpen }: { scrollHandler: Function, selected: string | null, isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const mq = useRef(window.matchMedia("(max-width: 498px)"));

    useEffect(() => {
        const handleResize = () => {
            setIsOpen(!mq.current.matches);
        };

        mq.current.addEventListener('change', handleResize);
        handleResize();

        return () => {
            mq.current.removeEventListener('change', handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button onClick={toggleSidebar} type="button" className="absolute top-0 right-0 p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            {isOpen && (
                <aside id="default-sidebar" className="w-1/2 md:w-1/5 lg:w-1/6 fixed rounded-3xl left-3 z-40 h-[90vh] top-1/2 translate-y-[-50%]" aria-label="Sidebar">
                    <Image
                        src='/building.png'
                        width={0}
                        height={0}
                        className="absolute bottom-0 rounded-3xl"
                        alt="building"
                        sizes="100vw"
                        style={{ width: '100%', height: '50%' }}
                    />
                    <div className="h-full rounded-3xl py-4 overflow-y-auto bg-[#303dd7] dark:bg-gray-800 text-white">
                        <div className="mb-5">
                            <a href="#" className="flex items-center p-2 pointer-events-none justify-center">
                                <span className="ms-3 text-2xl font-sans">Condo Rental</span>
                            </a>
                        </div>
                        <hr />
                        <ul className="space-y-2 font-medium mt-11 ">
                            <li>
                                <a onClick={(event) => scrollHandler(event)} data-target="filters" className={`flex items-center ms-auto p-2 w-[90%] rounded-s-3xl  ${selected == "filters" ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}>

                                    <span className="flex-1 ps-5 ms-3 text-xl font-sans whitespace-nowrap cursor-pointer">Filters</span>
                                </a>
                            </li>
                            <li>
                                <a onClick={(event) => scrollHandler(event)} data-target="map" className={`flex items-center ms-auto p-2 w-[90%] rounded-s-3xl  ${selected == "map" ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}>

                                    <span className="flex-1 ps-5 ms-3 text-xl whitespace-nowrap font-sans cursor-pointer">Map</span>
                                </a>
                            </li>
                            <li>
                                <a onClick={(event) => scrollHandler(event)} data-target="graph" className={`flex items-center ms-auto p-2 w-[90%] rounded-s-3xl ${selected == "graph" ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}>

                                    <span className="flex-1 ps-5 ms-3 text-xl whitespace-nowrap font-sans cursor-pointer">Graph</span>
                                </a>
                            </li>
                            <li>
                                <a onClick={(event) => scrollHandler(event)} data-target="transactions" className={`flex items-center ms-auto p-2 w-[90%] rounded-s-3xl  ${selected == "transactions" ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}>

                                    <span className="flex-1 ps-5 ms-3 text-xl whitespace-nowrap font-sans cursor-pointer">Transactions</span>
                                </a>
                            </li>

                        </ul>
                    </div>
                </aside>
            )}
        </div>
    )
}