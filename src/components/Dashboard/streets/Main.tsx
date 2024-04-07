import React, { useState, useContext, useEffect, use } from "react";
import { FixedSizeList as List } from "react-window";
import { MyContext } from "@/context/context";

interface RowProps {
  index: number;
  style: React.CSSProperties;
  data: { street: string; selected: boolean }[];
  onCheckboxChange: (name:string,checked: boolean) => void;
}

const Row: React.FC<RowProps> = ({ index, style, data, onCheckboxChange }) => {
  return (
    <div style={style} className="flex mx-auto items-center">
      <input
        type="checkbox"
        onChange={(e) => onCheckboxChange(data[index].street, e.target.checked)}
        checked={data[index].selected}
        className="mr-2"
      />
      <p className="ms-1 text-xs text-slate-600 ">{data[index].street}</p>
    </div>
  );
};

export default function Streets() {
  const {
    streets,
    selectedDistrictNames,
    selectedAreas,
    selectedFlatType,
    selectedMonths,
    selectedProjectType,
    selectedStreetNames,
    setSelectedStreetNames,
    selectedprojects,
    setAreas,
    setFlatTypes,
    setMonths,
    setProperties,
    setprojects,
    setStreets,
    setdistricts,
    isLoading,
    setIsLoading
  } = useContext(MyContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [localLoading, setLocalLoading] = useState(true);

  // Filter streets based on search query
  const filteredStreets = streets.filter((street, index) =>
    street.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemData = filteredStreets.map((street, index) => ({
    street,
    selected: selectedStreetNames.includes(street) ? true : false,
  }));

  const handleCheckboxChange = (name: string, checked: boolean) => {
    // Update selectedStreetNames based on the checkbox change
    if (checked) {
        setSelectedStreetNames(prev => [...prev, name]);
    } else {
        setSelectedStreetNames(prev => prev.filter(name => name !== name));
    }

    setIsLoading(true);
    setLocalLoading(false);
  };
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Set isReady to true after the initial render
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    setIsLoading(true);
    setLocalLoading(false);
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
      const res = await fetch("/api/processData", {
        method: "POST",
        body: JSON.stringify(preData),
      });
      const data: any = await res.json();
      setprojects(data.projects);
      setdistricts(data.districts);
      setMonths(data.months);
    }
    processData();
    setIsLoading(false);
    setLocalLoading(true);
  }, [selectedStreetNames]);

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
