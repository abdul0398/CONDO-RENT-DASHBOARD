import React, { useState, useContext, useEffect, use } from "react";
import { FixedSizeList as List } from "react-window";
import { MyContext } from "@/context/context";
import { ResponseBody, rentalData } from "@/types/data";

interface RowProps {
  index: number;
  style: React.CSSProperties;
  data: { district: string; selected: boolean }[];
  onCheckboxChange: (name: string, checked: boolean) => void;
}

const Row: React.FC<RowProps> = ({ index, style, data, onCheckboxChange }) => {
  return (
    <div style={style} className="flex mx-auto items-center">
      <input
        type="checkbox"
        onChange={(e) => onCheckboxChange(data[index].district, e.target.checked)}
        checked={data[index].selected}
        className="mr-2"
      />
      <p className="ms-1 text-xs text-slate-600 ">D{data[index].district}</p>
    </div>
  );
};

export default function Districts() {
  const {
    districts,
    setAreas,
    setFlatTypes,
    setMonths,
    setProperties,
    setprojects,
    setStreets,
    selectedAreas,
    selectedFlatType,
    selectedDistrictNames,
    selectedMonths,
    selectedProjectType,
    selectedprojects,
    selectedStreetNames,
    setSelectedDistrictsNames,
    isLoading,
    setIsLoading
  } = useContext(MyContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [localLoading, setLocalLoading] = useState(true);


  // Filter streets based on search query
  const filteredDistricts = districts.filter((district, index) =>
    district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemData = filteredDistricts.map((district, index) => ({
    district,
    selected: selectedDistrictNames.includes(district) ? true : false,
  }));

  const handleCheckboxChange = (name: string, checked: boolean) => {

    // Update selectedStreetNames based on the checkbox change
    if (checked) {
      setSelectedDistrictsNames((prev) => [...prev, name]);
    } else {
      setSelectedDistrictsNames((prev) =>
        prev.filter((name) => name != name)
      );
    }
    setIsLoading(true);
  };
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Set isReady to true after the initial render
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    setIsLoading(true);
    setLocalLoading(false)
    async function processData() {
        const preData = {
            selectedDistrictNames,
            selectedStreetNames,
            selectedprojects,
            selectedFlatType,
            selectedMonths,
            selectedProjectType ,
            selectedAreas,
        }
      const res = await fetch("/api/processData", {
        method: "POST",
        body: JSON.stringify(preData),
      });
      const data :ResponseBody = await res.json();
      setprojects(data.projects);
      setStreets(data.streets);
      setMonths(data.months);
    }
    processData();
    setLocalLoading(true);
    setIsLoading(false);
  }, [selectedDistrictNames]);


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
            {(props) => (
              <Row {...props} onCheckboxChange={handleCheckboxChange} />
            )}
          </List>
        </div>
      </div>
    </section>
  );
}
