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
 flatTypes: (string|undefined)[];
 setFlatTypes: React.Dispatch<React.SetStateAction<(string|undefined)[]>>;
 months: string[];
 setMonths: React.Dispatch<React.SetStateAction<string[]>>;
 properties: string[]; // Corrected typo
 setProperties: React.Dispatch<React.SetStateAction<string[]>>;
 areas: string[];
 setAreas: React.Dispatch<React.SetStateAction<string[]>>;
 selectedDistrictNames: string[]; // Corrected typo
 setSelectedDistrictsNames: React.Dispatch<React.SetStateAction<string[]>>;
 selectedStreetNames: string[];
 setSelectedStreetNames: React.Dispatch<React.SetStateAction<string[]>>;
 selectedprojects: string[];
 setSelectedprojects: React.Dispatch<React.SetStateAction<string[]>>;
 selectedFlatType: (string|undefined); // Corrected type
 setSelectedFlatType: React.Dispatch<React.SetStateAction<(string|undefined)>>;
 selectedMonths: string[];
 setSelectedMonths: React.Dispatch<React.SetStateAction<string[]>>;
 selectedProjectType: string; // Corrected type
 setSelectedProjectType: React.Dispatch<React.SetStateAction<string>>;
 selectedAreas: string[];
 setSelectedAreas: React.Dispatch<React.SetStateAction<string[]>>;
 transactions: rentalData[];
 setTransactions: React.Dispatch<React.SetStateAction<any[]>>;
}

// Create the context with a default value
export const MyContext = createContext<MyContextValue>({
  graphCalculation: {},
  setGraphCalculation: () => {},
  isLoading: false,
  setIsLoading: () => {},
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
 selectedDistrictNames: [], // Corrected typo
 setSelectedDistrictsNames: () => { },
 selectedStreetNames: [],
 setSelectedStreetNames: () => { },
 selectedprojects: [],
 setSelectedprojects: () => { },
 selectedFlatType: '', // Corrected type
 setSelectedFlatType: () => { },
 selectedMonths: [],
 setSelectedMonths: () => { },
 selectedProjectType: '', // Corrected type
 setSelectedProjectType: () => { },
 selectedAreas: [],
 setSelectedAreas: () => { },
 transactions: [],
 setTransactions: () => { },
});

const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
 const [districts, setdistricts] = useState<string[]>([]);
 const [streets, setStreets] = useState<string[]>([]);
 const [projects, setprojects] = useState<string[]>([]);
 const [flatTypes, setFlatTypes] = useState<(string|undefined)[]>([]);
 const [months, setMonths] = useState<string[]>([]);
 const [properties, setProperties] = useState<string[]>([]); // Corrected typo
 const [areas, setAreas] = useState<string[]>([]);
 const [graphCalculation, setGraphCalculation] = useState<any>({});
 const [selectedDistrictNames,     setSelectedDistrictsNames ] = useState<string[]>([]); // Corrected typo
 const [selectedStreetNames, setSelectedStreetNames] = useState<string[]>([]);
 const [selectedprojects, setSelectedprojects] = useState<string[]>([]);
 const [selectedFlatType, setSelectedFlatType] = useState<(string| undefined)>(''); // Corrected type
 const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
 const [selectedProjectType, setSelectedProjectType] = useState<string>(''); // Corrected type
 const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
 const [transactions, setTransactions] = useState<rentalData[]>([]);

 // Provide the context value to children
 return (
    <MyContext.Provider value={{  isLoading, setIsLoading, graphCalculation, setGraphCalculation,
      areas, setAreas, properties, setProperties, transactions, setTransactions, districts, setdistricts, streets, setStreets, projects, setprojects, flatTypes, setFlatTypes, months, setMonths, selectedDistrictNames, setSelectedDistrictsNames, selectedStreetNames, setSelectedStreetNames, selectedprojects, setSelectedprojects, selectedFlatType, setSelectedFlatType, selectedMonths, setSelectedMonths, selectedProjectType, setSelectedProjectType, selectedAreas, setSelectedAreas
    }}>
      {children}
    </MyContext.Provider>
 );
};

export default TodoProvider;
