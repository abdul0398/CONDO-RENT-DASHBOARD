import { NextRequest, NextResponse } from "next/server";
import data from "@/data/rentals.json";
import { allDistricts, allProjects, allStreets } from "@/data/constants";
import {
  streets_areaSqftObj,
  streets_districtObj,
  streets_leaseDateObj,
  streets_noOfBedRoomObj,
  streets_projectObj,
  streets_propertyTypeObj,
} from "@/data/streetRelation";
import {
  district_areaSqftObj,
  district_leaseDateObj,
  district_noOfBedRoomObj,
  district_projectObj,
  district_propertyTypeObj,
  district_streetObj,
} from "@/data/districtRelation";
import {
  project_areaSqftObj,
  project_districtObj,
  project_leaseDateObj,
  project_noOfBedRoomObj,
  project_propertyTypeObj,
  project_streetObj,
} from "@/data/projectRelation";
import { RequestBody, ResponseBody, rentalCollection } from "@/types/data";

const array: rentalCollection[] = data as rentalCollection[];

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const body = await req.json();

    const {
      selectedDistrictNames,
      selectedStreetNames,
      selectedprojects,
      selectedFlatType,
      selectedMonths,
      selectedProjectType,
      selectedAreas,
    }: RequestBody = body;

    let isAnyFilterSelected = true;
    let isStreetFilterSelected = selectedStreetNames.length > 0;
    let isDistrictFilterSelected = selectedDistrictNames.length > 0;
    let isProjectFilterSelected = selectedprojects.length > 0;
    

    if (
      selectedDistrictNames.length === 0 &&
      selectedStreetNames.length === 0 &&
      selectedprojects.length === 0 &&
      selectedFlatType.length === 0 &&
      selectedMonths.length === 0 &&
      !selectedProjectType &&
      selectedAreas.length === 0
    ) {

      isAnyFilterSelected = false
    }    
    
    
    // Street Filter Logic
    let filterStreets: string[] = [];
    // check if nothing is selected then return all streets
    
    let districtsStreets: string[] = [];
    let projectsStreets: string[] = [];
    let areaSqftStreets: string[] = [];
    let leaseDateStreets: string[] = [];
    let noOfBedRoomStreets: string[] = [];
    let projectTypeStreets: string[] = [];

    if (selectedDistrictNames.length > 0) {
      const districtSreetSet = new Set<string>();
      for (let i = 0; i < selectedDistrictNames.length; i++) {
        const array = district_streetObj[selectedDistrictNames[i]];
        array.forEach((element) => {
          districtSreetSet.add(element);
        });
      }
      districtsStreets = Array.from(districtSreetSet);
    }

    if (selectedprojects.length > 0) {
      const projectSreetSet = new Set<string>();
      for (let i = 0; i < selectedprojects.length; i++) {
        const array = project_streetObj[selectedprojects[i]];
        array.forEach((element) => {
          projectSreetSet.add(element);
        });
      }
      projectsStreets = Array.from(projectSreetSet);
    }

    if (selectedAreas.length > 0) {
      const areaSqftStreetSet = new Set<string>();
      for (let i = 0; i < selectedAreas.length; i++) {
        const selectedArea = parseInt(selectedAreas[i]);
        for (let key in streets_areaSqftObj) {
          const array = streets_areaSqftObj[key];
          for (let j = 0; j < array.length; j++) {
            const elem = array[j];
            // Split the range properly

            // Handle special cases
            if (elem === `<=1000` && selectedArea <= 1000) {
              areaSqftStreetSet.add(key);
            } else if (elem === `>3000` && selectedArea > 3000) {
              areaSqftStreetSet.add(key);
            } else {
              const range = elem.split("-");
              const lowerBound = parseFloat(range[0]);
              const upperBound = parseFloat(range[1] || range[0]); // If upper bound is not provided, assume it's the same as lower bound
              if (selectedArea >= lowerBound && selectedArea <= upperBound) {
                areaSqftStreetSet.add(key);
              }
            }
          }
        }
      }
      areaSqftStreets = Array.from(areaSqftStreetSet);
    }

    if (selectedFlatType.length > 0) {
      const propertyTypeStreetSet = new Set<string>();
      for (let i = 0; i < selectedFlatType.length; i++) {
        for (let key in streets_noOfBedRoomObj) {
          const array = streets_noOfBedRoomObj[key];
          for (let j = 0; j < array.length; j++) {
            const elem = array[j];
            if (elem == selectedFlatType[i]) {
              propertyTypeStreetSet.add(key);
            }
          }
        }
      }
      noOfBedRoomStreets = Array.from(propertyTypeStreetSet);
    }

    if (selectedMonths.length > 0) {
      const leaseDateStreetSet = new Set<string>();
      for (let i = 0; i < selectedMonths.length; i++) {
        // change 2023-03 to 0323

        const selectedMonth =
          selectedMonths[i].split("-")[1] +
          selectedMonths[i].split("-")[0].slice(2);
        for (let key in streets_leaseDateObj) {
          const array = streets_leaseDateObj[key];
          for (let j = 0; j < array.length; j++) {
            const elem = array[j];
            if (elem == selectedMonth) {
              leaseDateStreetSet.add(key);
            }
          }
        }
      }
      leaseDateStreets = Array.from(leaseDateStreetSet);
    }

    if (selectedProjectType.length > 0) {
      const projectTypeStreetSet = new Set<string>();
      for (let key in streets_projectObj) {
        const array = streets_projectObj[key];
        for (let j = 0; j < array.length; j++) {
          const elem = array[j];
          if (elem == selectedProjectType) {
            projectTypeStreetSet.add(key);
          }
        }
      }
      projectTypeStreets = Array.from(projectTypeStreetSet);
    }





    // intersection of all the streets
    filterStreets = intersection(districtsStreets, projectsStreets);
    filterStreets = intersection(filterStreets, areaSqftStreets);
    filterStreets = intersection(filterStreets, leaseDateStreets);
    filterStreets = intersection(filterStreets, noOfBedRoomStreets);
    filterStreets = intersection(filterStreets, projectTypeStreets);

    if(!isDistrictFilterSelected && isStreetFilterSelected && !isProjectFilterSelected){
      filterStreets = allStreets
    }


    // District Filter Logic
    let filterDistricts: string[] = [];

    let streetsDistricts: string[] = [];
    let projectsDistricts: string[] = [];
    let areaSqftDistricts: string[] = [];
    let leaseDateDistricts: string[] = [];
    let noOfBedRoomDistricts: string[] = [];
    let projectTypeDistricts: string[] = [];

    if (selectedStreetNames.length > 0) {
      const streetDistrictSet = new Set<string>();
      for (let i = 0; i < selectedStreetNames.length; i++) {
        const array = streets_districtObj[selectedStreetNames[i]];
        array.forEach((element) => {
          streetDistrictSet.add(element);
        });
      }
      streetsDistricts = Array.from(streetDistrictSet);
    }

    if (selectedprojects.length > 0) {
      const projectDistrictSet = new Set<string>();
      for (let i = 0; i < selectedprojects.length; i++) {
        const array = project_districtObj[selectedprojects[i]];
        array.forEach((element) => {
          projectDistrictSet.add(element);
        });
      }
      projectsDistricts = Array.from(projectDistrictSet);
    }

    if (selectedAreas.length > 0) {
      const areaSqftDistrictSet = new Set<string>();
      for (let i = 0; i < selectedAreas.length; i++) {
        const selectedArea = parseInt(selectedAreas[i]);
        for (let key in district_areaSqftObj) {
          const array = district_areaSqftObj[key];
          for (let j = 0; j < array.length; j++) {
            const elem = array[j];
            // Split the range properly
            // Handle special cases
            if (elem === `<=1000` && selectedArea <= 1000) {
              areaSqftDistrictSet.add(key);
            } else if (elem === `>3000` && selectedArea > 3000) {
              areaSqftDistrictSet.add(key);
            } else {
              const range = elem.split("-");
              const lowerBound = parseFloat(range[0]);
              const upperBound = parseFloat(range[1] || range[0]); // If upper bound is not provided, assume it's the same as lower bound
              if (selectedArea >= lowerBound && selectedArea <= upperBound) {
                areaSqftDistrictSet.add(key);
              }
            }
          }
        }
      }
      areaSqftDistricts = Array.from(areaSqftDistrictSet);
    }

    if (selectedFlatType.length > 0) {
      const propertyTypeDistrictSet = new Set<string>();
      for (let i = 0; i < selectedFlatType.length; i++) {
        for (let key in district_noOfBedRoomObj) {
          const array = district_noOfBedRoomObj[key];
          for (let j = 0; j < array.length; j++) {
            const elem = array[j];
            if (elem == selectedFlatType[i]) {
              propertyTypeDistrictSet.add(key);
            }
          }
        }
      }
      noOfBedRoomDistricts = Array.from(propertyTypeDistrictSet);
    }

    if (selectedMonths.length > 0) {
      const leaseDateDistrictSet = new Set<string>();
      for (let i = 0; i < selectedMonths.length; i++) {
        // change 2023-03 to 0323
        const selectedMonth =
          selectedMonths[i].split("-")[1] +
          selectedMonths[i].split("-")[0].slice(2);
        for (let key in district_leaseDateObj) {
          const array = district_leaseDateObj[key];
          for (let j = 0; j < array.length; j++) {
            const elem = array[j];
            if (elem == selectedMonth) {
              leaseDateDistrictSet.add(key);
            }
          }
        }
      }
      leaseDateDistricts = Array.from(leaseDateDistrictSet);
    }


    if (selectedProjectType.length > 0) {
      const projectTypeDistrictSet = new Set<string>();
      for (let key in district_projectObj) {
        const array = district_projectObj[key];
        for (let j = 0; j < array.length; j++) {
          const elem = array[j];
          if (elem == selectedProjectType) {
            projectTypeDistrictSet.add(key);
          }
        }
      }
      projectTypeDistricts = Array.from(projectTypeDistrictSet);
    }

   

    // intersection of all the districts
    filterDistricts = intersection(streetsDistricts, projectsDistricts);
    filterDistricts = intersection(filterDistricts, areaSqftDistricts);
    filterDistricts = intersection(filterDistricts, leaseDateDistricts);
    filterDistricts = intersection(filterDistricts, noOfBedRoomDistricts);
    filterDistricts = intersection(filterDistricts, projectTypeDistricts);
    
    if(isDistrictFilterSelected && !isStreetFilterSelected && !isProjectFilterSelected){
      filterDistricts = allDistricts
    }


    // // Project Filter Logic
    let filterProjects: string[] = [];


    let streetsProjects: string[] = [];
    let districtsProjects: string[] = [];
    let areaSqftProjects: string[] = [];
    let leaseDateProjects: string[] = [];
    let noOfBedRoomProjects: string[] = [];


    if (selectedStreetNames.length > 0) {
      const streetProjectSet = new Set<string>();
      for (let i = 0; i < selectedStreetNames.length; i++) {
        const array = streets_projectObj[selectedStreetNames[i]];
        console.log(array)
        array.forEach((element) => {
          streetProjectSet.add(element);
        });
      }
      streetsProjects = Array.from(streetProjectSet);
    }

    if (selectedDistrictNames.length > 0) {
      const districtProjectSet = new Set<string>();
      for (let i = 0; i < selectedDistrictNames.length; i++) {
        const array = district_projectObj[selectedDistrictNames[i]];
        array.forEach((element) => {
          districtProjectSet.add(element);
        });
      }
      districtsProjects = Array.from(districtProjectSet);
    }


    if (selectedAreas.length > 0) {
      const areaSqftProjectSet = new Set<string>();
      for (let i = 0; i < selectedAreas.length; i++) {
        const selectedArea = parseInt(selectedAreas[i]);
        for (let key in project_areaSqftObj) {
          const array = project_areaSqftObj[key];
          for (let j = 0; j < array.length; j++) {
            const elem = array[j];
            // Split the range properly
            // Handle special cases
            if (elem === `<=1000` && selectedArea <= 1000) {
              areaSqftProjectSet.add(key);
            } else if (elem === `>3000` && selectedArea > 3000) {
              areaSqftProjectSet.add(key);
            } else {
              const range = elem.split("-");
              const lowerBound = parseFloat(range[0]);
              const upperBound = parseFloat(range[1] || range[0]); // If upper bound is not provided, assume it's the same as lower bound
              if (selectedArea >= lowerBound && selectedArea <= upperBound) {
                areaSqftProjectSet.add(key);
              }
            }
          }
        }
      }
      areaSqftProjects = Array.from(areaSqftProjectSet);
    }



    if (selectedFlatType.length > 0) {
      const propertyTypeProjectSet = new Set<string>();
      for (let i = 0; i < selectedFlatType.length; i++) {
        for (let key in project_noOfBedRoomObj) {
          const array = project_noOfBedRoomObj[key];
          for (let j = 0; j < array.length; j++) {
            const elem = array[j];
            if (elem == selectedFlatType[i]) {
              propertyTypeProjectSet.add(key);
            }
          }
        }
      }
      noOfBedRoomProjects = Array.from(propertyTypeProjectSet);
    }



    if (selectedMonths.length > 0) {
      const leaseDateProjectSet = new Set<string>();
      for (let i = 0; i < selectedMonths.length; i++) {
        // change 2023-03 to 0323
        const selectedMonth =
          selectedMonths[i].split("-")[1] +
          selectedMonths[i].split("-")[0].slice(2);
        for (let key in project_leaseDateObj) {
          const array = project_leaseDateObj[key];
          for (let j = 0; j < array.length; j++) {
            const elem = array[j];
            if (elem == selectedMonth) {
              leaseDateProjectSet.add(key);
            }
          }
        }
      }
      leaseDateProjects = Array.from(leaseDateProjectSet);
    }


    // intersection of all the projects

    filterProjects = intersection(streetsProjects, districtsProjects);
    filterProjects = intersection(filterProjects, areaSqftProjects);
    filterProjects = intersection(filterProjects, leaseDateProjects);
    filterProjects = intersection(filterProjects, noOfBedRoomProjects);

    if(isProjectFilterSelected && !isStreetFilterSelected && !isDistrictFilterSelected){
      filterProjects = allProjects
    }
    
    
    return NextResponse.json({
      streets:isAnyFilterSelected?filterStreets:allStreets,
      districts: isAnyFilterSelected?filterDistricts:allDistricts,
      projects:isAnyFilterSelected?filterProjects:allProjects,
    });



    





  } else {
    // Handle any other HTTP method
    return NextResponse.error();
  }
}

const intersection = (a: string[], b: string[]) => {
  // handle if not selected then return all streets
  if (a.length === 0) {
    return b;
  }
  if (b.length === 0) {
    return a;
  }
  return a.filter((value) => b.includes(value));
};
