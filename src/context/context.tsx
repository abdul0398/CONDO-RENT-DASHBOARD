import { rentalCollection } from '@/types/data';
import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface MyContextValue {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
 districts: string[];
 setdistricts: React.Dispatch<React.SetStateAction<string[]>>;
 streets: string[];
 setStreets: React.Dispatch<React.SetStateAction<string[]>>;
 projects: string[];
 setprojects: React.Dispatch<React.SetStateAction<string[]>>;
 flatTypes: (string|null)[];
 setFlatTypes: React.Dispatch<React.SetStateAction<(string|null)[]>>;
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
 selectedFlatType: string; // Corrected type
 setSelectedFlatType: React.Dispatch<React.SetStateAction<string>>;
 selectedMonths: string[];
 setSelectedMonths: React.Dispatch<React.SetStateAction<string[]>>;
 selectedProjectType: string; // Corrected type
 setSelectedProjectType: React.Dispatch<React.SetStateAction<string>>;
 selectedAreas: string[];
 setSelectedAreas: React.Dispatch<React.SetStateAction<string[]>>;
 transactions: rentalCollection[];
 setTransactions: React.Dispatch<React.SetStateAction<any[]>>;
}

// Create the context with a default value
export const MyContext = createContext<MyContextValue>({
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
 const [flatTypes, setFlatTypes] = useState<(string|null)[]>([]);
 const [months, setMonths] = useState<string[]>([]);
 const [properties, setProperties] = useState<string[]>([]); // Corrected typo
 const [areas, setAreas] = useState<string[]>([]);
 const [selectedDistrictNames,     setSelectedDistrictsNames ] = useState<string[]>([]); // Corrected typo
 const [selectedStreetNames, setSelectedStreetNames] = useState<string[]>([]);
 const [selectedprojects, setSelectedprojects] = useState<string[]>([]);
 const [selectedFlatType, setSelectedFlatType] = useState<string>(''); // Corrected type
 const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
 const [selectedProjectType, setSelectedProjectType] = useState<string>(''); // Corrected type
 const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
 const [transactions, setTransactions] = useState<rentalCollection[]>([]);

 // Provide the context value to children
 return (
    <MyContext.Provider value={{  isLoading, setIsLoading,
      areas, setAreas, properties, setProperties, transactions, setTransactions, districts, setdistricts, streets, setStreets, projects, setprojects, flatTypes, setFlatTypes, months, setMonths, selectedDistrictNames, setSelectedDistrictsNames, selectedStreetNames, setSelectedStreetNames, selectedprojects, setSelectedprojects, selectedFlatType, setSelectedFlatType, selectedMonths, setSelectedMonths, selectedProjectType, setSelectedProjectType, selectedAreas, setSelectedAreas
    }}>
      {children}
    </MyContext.Provider>
 );
};

export default TodoProvider;
