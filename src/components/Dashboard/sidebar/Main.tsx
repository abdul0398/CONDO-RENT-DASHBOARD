"use client";

import Image from "next/image";
import React from "react";
import { FaTableCells } from "react-icons/fa6";
import { BsGraphUp } from "react-icons/bs";
import { FaMapMarkedAlt } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";

export default function Sidebar({
  selectedView,
  setSelectedView,
  isOpen,
  setIsOpen,
  isMobile,
}: {
  selectedView: string | null;
  setSelectedView: Function;
  isOpen: boolean;
  setIsOpen: Function;
  isMobile: boolean;
}) {
  return (
    <div>
      {isOpen && (
        <div className="fixed h-[98%] lg:h-[100%] md:h-[100%] w-1/2 md:w-fit lg:w-fit md:z-0 z-50 lg:z-0 md:block md:relative lg:relative  lg:block">
          <aside
            id="default-sidebar"
            className="w-1/2 md:w-full left-10 lg:w-full rounded-3xl z-40 h-full"
            aria-label="Sidebar"
          >
            <div className="h-full rounded-l-3xl py-4 overflow-y-auto min-w-[300px] bg-[#0e4884] dark:bg-gray-800 text-white">
              <div className="mb-5">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={220}
                  height={220}
                  className="mx-auto"
                />
              </div>
              <div className="w-3/4 mx-auto bg-[#022446] py-2 rounded-md flex gap-2 flex-col">
                <div
                  className={`flex items-center cursor-pointer h-10  rounded-md w-[90%] mx-auto ${
                    selectedView === "graph" ? "bg-[#0e4884]" : "bg-white"
                  }`}
                  onClick={() => {
                    setSelectedView("graph");
                    if (isMobile) setIsOpen(false);
                  }}
                >
                  <h1
                    className={`"text-md flex items-center text-black cursor-pointer" ${
                      selectedView === "graph" ? "text-white" : ""
                    }`}
                    onClick={() => {
                      setSelectedView("graph");
                      if (isMobile) setIsOpen(false);
                    }}
                  >
                    <BsGraphUp className="mx-4" />
                    GRAPH
                  </h1>
                </div>
                <div
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "table" ? "bg-[#0e4884]" : "bg-white "
                  }`}
                  onClick={() => {
                    setSelectedView("table");
                    if (isMobile) setIsOpen(false);
                  }}
                >
                  <h1
                    className={`"text-md flex items-center  text-black cursor-pointer" ${
                      selectedView === "table" ? "text-white" : ""
                    }`}
                    onClick={() => {
                      setSelectedView("table");
                      if (isMobile) setIsOpen(false);
                    }}
                  >
                    <GrTransaction className="mx-4" />
                    TRANSACTION
                  </h1>
                </div>
                <div
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "map" ? "bg-[#0e4884]" : "bg-white"
                  }`}
                  onClick={() => {
                    setSelectedView("map");
                    if (isMobile) setIsOpen(false);
                  }}
                >
                  <h1
                    className={`"text-md flex items-center  text-black cursor-pointer" ${
                      selectedView === "map" ? "text-white" : ""
                    }`}
                    onClick={() => {
                      setSelectedView("map");
                      if (isMobile) setIsOpen(false);
                    }}
                  >
                    <FaMapMarkedAlt className="mx-4" />
                    MAP
                  </h1>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
