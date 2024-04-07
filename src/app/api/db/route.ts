import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import data1 from "@/data/rentals1.json";
import data2 from "@/data/rentals2.json";
import data3 from "@/data/rentals3.json";
import data4 from "@/data/rentals4.json";
import { rentalData } from "@/types/data";

const array1 = data1 as rentalData[];
const array2 = data2 as rentalData[];
const array3 = data3 as rentalData[];
const array4 = data4 as rentalData[];



const array = [...array1, ...array2, ...array3, ...array4];

export async function GET(req: NextRequest) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    await sql`
    INSERT INTO rentals (
        district,
        street,
        project,
        noofbedroom,
        propertytype,
        leaseDate,
        areasqft,
        rent,
        areasqm,
        x,
        y
    )
    VALUES
    (
        ${element.district},
        ${element.street},
        ${element.project},
        ${element.noOfBedRoom},
        ${element.propertyType},
        ${element.leaseDate},
        ${element.areaSqft},
        ${element.rent},
        ${element.areaSqm},
        ${element.x},
        ${element.y}
    )
    `    
  }

  return NextResponse.json(array.length);
}


export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, email } = body;
    await sql`INSERT INTO customers (name, email) VALUES (${name}, ${email})`;
    return NextResponse.json({ name, email });
}