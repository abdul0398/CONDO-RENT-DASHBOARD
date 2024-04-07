
import React from 'react';
import { MyContext } from "@/context/context";
import { useContext } from "react";
import dynamic from 'next/dynamic';
import { ListChildComponentProps } from 'react-window';

const List = dynamic(() => import('react-window').then((mod) => mod.FixedSizeList), {
 ssr: false // Disable SSR for this component
});

export default function Transactions() {
 const { transactions } = useContext(MyContext);


 
 // Define the Row component with proper types for props
 const Row: React.FC<ListChildComponentProps> = ({ index, style }) => {
 const transaction = transactions[index];

 if (!transaction) {
    return null; // Return null if transaction is not available
 }

 return (
    <div key={index} style={style} className="h-14 grid gap-1 grid-cols-[3%_17%_4%_7%_10%_10%_10%_14%_6%_17%] border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
      <div className="px-1 text-xs">{index}</div>
      <div className="px-1 text-xs">{transaction.project}</div>
      <div className="px-1 text-xs">{transaction.leaseDate}</div>
      <div className="px-1 text-xs">{transaction.rent}$</div>
      <div className="px-1 text-xs">{transaction.noOfBedRoom}</div>
      <div className="px-1 text-xs">{transaction.areaSqm}</div>
      <div className="px-1 text-xs">{transaction.areaSqft}</div>
      <div className="px-1 text-xs">{transaction.street}</div>
      <div className="px-1 text-xs">{transaction.district}</div>
      <div className="px-1 text-xs">{transaction.propertyType}</div>
    </div>
 );
};

 return (
    <div className="flex flex-col bg-white">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm: lg:px-8">
          <div className="overflow-hidden">
            <div className="min-w-full text-left text-sm font-light overflow-hidden">
              <div className="border-b font-medium dark:border-neutral-500 grid gap-1 grid-cols-[3%_17%_4%_7%_10%_10%_10%_14%_6%_17%] text-sm">
                <div className="px-1 py-4 text-xs">ID</div>
                <div className="px-1 py-4 text-xs">Project</div>
                <div className="px-1 py-4 text-xs">Month</div>
                <div className="px-1 py-4 text-xs">Rent</div>
                <div className="px-1 py-4 text-xs">Number Of Bedrooms</div>
                <div className="px-1 py-4 text-xs">Area(Sqm)</div>
                <div className="px-1 py-4 text-xs">Area(Sqft)</div>
                <div className="px-1 py-4 text-xs">Street</div>
                <div className="px-1 py-4 text-xs">District</div>
                <div className="px-1 py-4 text-xs">PropertyType</div>
              </div>
              <div className="overflow-hidden">
                <List
                 height={480}
                 itemCount={transactions.length}
                 itemSize={50} 
                 width={'100%'}
                >
                 {Row}
                </List>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 );
}
