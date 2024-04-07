export type data = {
  [town: string]: string[];
};

export type FilterHandlerParams = {
  selectedDistrict: string;
  selectedProjects: string[];
  selectedStreet: string[];
  selectedMonths: string[];
  selectedFlatType: string;
  selectedPropertyType: string;
  selectedAreas: string[];
};

export type filterHandlerReturn = {
  filterDistrict: string[];
  filterProjects: string[];
  filterStreet: string[];
  filterMonths: string[];
  filterFlatTypes: string[];
  filteredPropertyType: string[];
  filterAreas: string[];
};


export type rentalData = {
  x: string;
  y: string;
  project: string;
  street: string;
  areaSqm: string;
  leaseDate: string;
  propertyType: string;
  district: string;
  areaSqft: string;
  noOfBedRoom: string;
  rent: number;
}


export type RequestBody ={
  selectedDistrictNames: string[];
  selectedStreetNames: string[];
  selectedprojects: string[];
  selectedFlatType: (string| undefined);
  selectedMonths: string[];
  selectedProjectType: string;
  selectedAreas: string[];
};


export type ResponseBody = {
  districts: string[];
  streets: string[];
  projects: string[];
  flatTypes: (string |undefined)[];
  months: string[];
  projectTypes: string[];
  areas: string[];
  rentalData: rentalData[];
  graphCalculation: any;
};