import { NextRequest, NextResponse } from "next/server";
import {
  allDistricts,
  allProjects,
  allStreets,
  allMonths,
} from "@/data/constants";
import data1 from "@/data/rentals1.json";
import data2 from "@/data/rentals2.json";
import data3 from "@/data/rentals3.json";
import data4 from "@/data/rentals4.json";
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
import { RequestBody, ResponseBody, rentalData } from "@/types/data";

const array1 = data1 as Array<rentalData>;
const array2 = data2 as Array<rentalData>;
const array3 = data3 as Array<rentalData>;
const array4 = data4 as Array<rentalData>;

const allData: rentalData[] = [...array1, ...array2, ...array3, ...array4];

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

    const filterDistricts: string[] = [];
    const filterStreets: string[] = [];
    const filterProjects: string[] = [];
    const filterFlatTypes: (string | undefined)[] = [];
    const filterMonths: string[] = [];
    const filterProjectTypes: string[] = [];
    const filterAreas: string[] = [];

    const filterTransactionData: rentalData[] = [];

    for (let i = 0; i < allData.length; i++) {
      let isDistrictPresent = false;
      let isStreetPresent = false;
      let isProjectPresent = false;
      let isFlatTypePresent = false;
      let isMonthPresent = false;
      let isProjectTypePresent = false;
      let isAreaPresent = false;

      const street = allData[i].street;
      const district = allData[i].district;
      const project = allData[i].project;
      const flatType = allData[i].noOfBedRoom;
      const month = `20${allData[i].leaseDate.slice(2)}-${allData[
        i
      ].leaseDate.slice(0, 2)}`;
      const projectType = allData[i].propertyType;
      const area = allData[i].areaSqft;

      if (selectedDistrictNames.length > 0) {
        if (selectedDistrictNames.includes(district)) {
          isDistrictPresent = true;
        }
      } else {
        isDistrictPresent = true;
      }

      if (selectedStreetNames.length > 0) {
        if (selectedStreetNames.includes(street)) {
          isStreetPresent = true;
        }
      } else {
        isStreetPresent = true;
      }

      if (selectedprojects.length > 0) {
        if (selectedprojects.includes(project)) {
          isProjectPresent = true;
        }
      } else {
        isProjectPresent = true;
      }

      if (selectedFlatType) {
        if (selectedFlatType === flatType) {
          isFlatTypePresent = true;
        }
      } else {
        isFlatTypePresent = true;
      }

      if (selectedMonths.length > 0) {
        if (selectedMonths.includes(month)) {
          isMonthPresent = true;
        }
      } else {
        isMonthPresent = true;
      }

      if (selectedProjectType) {
        if (selectedProjectType === projectType) {
          isProjectTypePresent = true;
        }
      } else {
        isProjectTypePresent = true;
      }

      if (selectedAreas.length > 0) {
        if (selectedAreas.includes(area)) {
          isAreaPresent = true;
        }
      } else {
        isAreaPresent = true;
      }

      if (
        isStreetPresent &&
        isProjectPresent &&
        isFlatTypePresent &&
        isMonthPresent &&
        isProjectTypePresent &&
        isAreaPresent
      ) {
        filterDistricts.push(district);
      }

      if (
        isDistrictPresent &&
        isProjectPresent &&
        isFlatTypePresent &&
        isMonthPresent &&
        isProjectTypePresent &&
        isAreaPresent
      ) {
        filterStreets.push(street);
      }

      if (
        isDistrictPresent &&
        isStreetPresent &&
        isFlatTypePresent &&
        isMonthPresent &&
        isProjectTypePresent &&
        isAreaPresent
      ) {
        filterProjects.push(project);
      }

      if (
        isDistrictPresent &&
        isStreetPresent &&
        isProjectPresent &&
        isMonthPresent &&
        isProjectTypePresent &&
        isAreaPresent
      ) {
        filterFlatTypes.push(flatType);
      }

      if (
        isDistrictPresent &&
        isStreetPresent &&
        isProjectPresent &&
        isFlatTypePresent &&
        isProjectTypePresent &&
        isAreaPresent
      ) {
        filterMonths.push(month);
      }

      if (
        isDistrictPresent &&
        isStreetPresent &&
        isProjectPresent &&
        isFlatTypePresent &&
        isMonthPresent &&
        isAreaPresent
      ) {
        filterProjectTypes.push(projectType);
      }

      if (
        isDistrictPresent &&
        isStreetPresent &&
        isProjectPresent &&
        isFlatTypePresent &&
        isMonthPresent &&
        isProjectTypePresent
      ) {
        filterAreas.push(area);
      }

      if (
        isDistrictPresent &&
        isStreetPresent &&
        isProjectPresent &&
        isFlatTypePresent &&
        isMonthPresent &&
        isProjectTypePresent &&
        isAreaPresent
      ) {
        filterTransactionData.push(allData[i]);
      }
    }

    return NextResponse.json({
      streets: [...new Set(filterStreets)].sort(),
      districts: [...new Set(filterDistricts)].sort(),
      projects: [...new Set(filterProjects)].sort(),
      flatTypes: [...new Set(filterFlatTypes)].sort(),
      months: [...new Set(filterMonths)].sort(),
      projectTypes: [...new Set(filterProjectTypes)].sort(),
      areas: [...new Set(filterAreas)].sort(),
      rentalData: filterTransactionData,
    });
  } else {
    // Handle any other HTTP method
    return NextResponse.error();
  }
}
