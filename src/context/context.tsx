import { rentalData } from '@/types/data';
import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface MyContextValue {
  graphCalculation: any;
  setGraphCalculation: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  districts: string[];
  setdistricts: React.Dispatch<React.SetStateAction<string[]>>;
  streets: string[];
  setStreets: React.Dispatch<React.SetStateAction<string[]>>;
  projects: string[];
  setprojects: React.Dispatch<React.SetStateAction<string[]>>;
  flatTypes: (string | undefined)[];
  setFlatTypes: React.Dispatch<React.SetStateAction<(string | undefined)[]>>;
  months: string[];
  setMonths: React.Dispatch<React.SetStateAction<string[]>>;
  properties: string[]; // Corrected typo
  setProperties: React.Dispatch<React.SetStateAction<string[]>>;
  areas: string[];
  setAreas: React.Dispatch<React.SetStateAction<string[]>>;
  selectedDistrictName: string; // Corrected typo
  setSelectedDistrictsName: React.Dispatch<React.SetStateAction<string>>;
  selectedStreetName: string;
  setSelectedStreetName: React.Dispatch<React.SetStateAction<string>>;
  selectedproject: string;
  setSelectedproject: React.Dispatch<React.SetStateAction<string>>;
  selectedFlatType: (string | undefined); // Corrected type
  setSelectedFlatType: React.Dispatch<React.SetStateAction<(string | undefined)>>;
  selectedMonth: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
  selectedProjectType: string; // Corrected type
  setSelectedProjectType: React.Dispatch<React.SetStateAction<string>>;
  selectedArea: string;
  setSelectedArea: React.Dispatch<React.SetStateAction<string>>;
  transactions: rentalData[];
  setTransactions: React.Dispatch<React.SetStateAction<any[]>>;
}

// Create the context with a default value
export const MyContext = createContext<MyContextValue>({
  graphCalculation: {},
  setGraphCalculation: () => { },
  isLoading: false,
  setIsLoading: () => { },
  districts: [],
  setdistricts: () => { },
  streets: [],
  setStreets: () => { },
  projects: [],
  setprojects: () => { },
  flatTypes: [],
  setFlatTypes: () => { },
  months: [],
  setMonths: () => { },
  properties: [], // Corrected typo
  setProperties: () => { },
  areas: [],
  setAreas: () => { },
  selectedDistrictName: '', // Corrected typo
  setSelectedDistrictsName: () => { },
  selectedStreetName: "",
  setSelectedStreetName: () => { },
  selectedproject: "",
  setSelectedproject: () => { },
  selectedFlatType: '', // Corrected type
  setSelectedFlatType: () => { },
  selectedMonth: "",
  setSelectedMonth: () => { },
  selectedProjectType: '', // Corrected type
  setSelectedProjectType: () => { },
  selectedArea: "",
  setSelectedArea: () => { },
  transactions: [],
  setTransactions: () => { },
});

const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [districts, setdistricts] = useState<string[]>([]);
  const [streets, setStreets] = useState<string[]>([]);
  const [projects, setprojects] = useState<string[]>([]);
  const [flatTypes, setFlatTypes] = useState<(string | undefined)[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [properties, setProperties] = useState<string[]>([]); // Corrected typo
  const [areas, setAreas] = useState<string[]>([]);
  const [graphCalculation, setGraphCalculation] = useState<any>({});
  const [selectedDistrictName, setSelectedDistrictsName] = useState<string>(''); // Corrected typo
  const [selectedStreetName, setSelectedStreetName] = useState<string>("");
  const [selectedproject, setSelectedproject] = useState<string>("");
  const [selectedFlatType, setSelectedFlatType] = useState<(string | undefined)>(''); // Corrected type
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedProjectType, setSelectedProjectType] = useState<string>(''); // Corrected type
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [transactions, setTransactions] = useState<rentalData[]>([]);

  // Provide the context value to children
  return (
    <MyContext.Provider value={{
      isLoading, setIsLoading, graphCalculation, setGraphCalculation,
      areas, setAreas, properties, setProperties, transactions, setTransactions, districts, setdistricts, streets, setStreets, projects, setprojects, flatTypes, setFlatTypes, months, setMonths, selectedDistrictName, setSelectedDistrictsName, selectedStreetName, setSelectedStreetName, selectedproject, setSelectedproject, selectedFlatType, setSelectedFlatType, selectedMonth, setSelectedMonth, selectedProjectType, setSelectedProjectType, selectedArea, setSelectedArea
    }}>
      {children}
    </MyContext.Provider>
  );
};

export default TodoProvider;
