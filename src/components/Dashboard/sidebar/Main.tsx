"use client";

import Image from "next/image";
import React from "react";
import { FaTableCells } from "react-icons/fa6";

export default function Sidebar({
  selectedView,
  setSelectedView,
}: {
  setSelectedView: Function;
  selectedView: string | null;
}) {
  return (
    <div className="w-[300px] hidden lg:block md:block">
      <aside
        id="default-sidebar"
        className="w-1/2 md:w-full left-10 lg:w-full rounded-3xl z-40 h-[90vh]"
        aria-label="Sidebar"
      >
        <div className="h-full rounded-l-3xl py-4 overflow-y-auto min-w-[300px] bg-[#0e4884] dark:bg-gray-800 text-white">
          <div className="mb-5">
            <Image
              src="/logo.png"
              alt="logo"
              width={80}
              height={80}
              className="mx-auto"
            />
          </div>
          <div className="w-3/4 mx-auto bg-[#022446] py-2 rounded-md flex gap-2 flex-col">
            <div
              className={`flex items-center cursor-pointer h-10  rounded-md w-[90%] mx-auto ${
                selectedView === "graph" ? "bg-[#0e4884]" : "bg-white"
              }`}
              data-target="graph"
              onClick={(event) => setSelectedView("graph")}
            >
              <h1
                className={`"text-md flex text-black cursor-pointer" ${
                  selectedView === "graph" ? "text-white" : ""
                }`}
                data-target="graph"
                onClick={(event) => setSelectedView("graph")}
              >
                <FaTableCells className="mx-4" />
                GRAPH
              </h1>
            </div>
            <div
              className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                selectedView === "table" ? "bg-[#0e4884]" : "bg-white "
              }`}
              data-target="transactions"
              onClick={(event) => setSelectedView("table")}
            >
              <h1
                className={`"text-md flex items-center  text-black cursor-pointer" ${
                  selectedView === "table" ? "text-white" : ""
                }`}
                data-target="transactions"
                onClick={(event) => setSelectedView("table")}
              >
                <FaTableCells className="mx-4" />
                TRANSACTION
              </h1>
            </div>
            <div
              className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                selectedView === "map" ? "bg-[#0e4884]" : "bg-white"
              }`}
              data-target="map"
              onClick={(event) => setSelectedView("map")}
            >
              <h1
                data-target="map"
                className={`"text-md flex items-center  text-black cursor-pointer" ${
                  selectedView === "map" ? "text-white" : ""
                }`}
                onClick={(event) => setSelectedView("map")}
              >
                <FaTableCells className="mx-4" />
                MAP
              </h1>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
