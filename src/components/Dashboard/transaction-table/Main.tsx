
import React, { use, useEffect } from 'react';
import { MyContext } from "@/context/context";
import { useContext } from "react";
import dynamic from 'next/dynamic';
import { ListChildComponentProps } from 'react-window';
import { FaSort } from "react-icons/fa";

const List = dynamic(() => import('react-window').then((mod) => mod.FixedSizeList), {
  ssr: false // Disable SSR for this component
});

export default function Transactions() {
  const {
    transactions,
    setTransactions
  } = useContext(MyContext);


  const trimTransactions: any = transactions.length > 50000 ? transactions.slice(0, 50000) : transactions;

  // Define the Row component with proper types for props
  const Row: React.FC<ListChildComponentProps> = ({ index, style }) => {
    const transaction = trimTransactions[index];

    if (!transaction) {
      return null; // Return null if transaction is not available
    }

    return (
      <div key={index} style={style} className={`${index % 2 == 0 ? "bg-white" : ""}"h-14 grid gap-1 grid-cols-[17%_8%_7%_10%_10%_10%_14%_6%_13%] border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"`}>
        <div className="px-1 text-xs ps-5">{transaction.project}</div>
        <div className="px-1 text-xs ps-5">{`20${transaction.leaseDate.slice(2)}-${transaction.leaseDate.slice(0, 2)}`}</div>
        <div className="px-1 text-xs ps-5">${transaction.rent}</div>
        <div className="px-1 text-xs ps-5 text-center">{transaction.noOfBedRoom ? transaction.noOfBedRoom : "Blank"}</div>
        <div className="px-1 text-xs ps-5">{transaction.areaSqm}</div>
        <div className="px-1 text-xs ps-5">{transaction.areaSqft}</div>
        <div className="px-1 text-xs ps-5">{transaction.street}</div>
        <div className="px-1 text-xs text-center">{transaction.district}</div>
        <div className="px-1 text-xs ps-5">{transaction.propertyType}</div>
      </div>
    );
  };

  const handleSort = async (type: string) => {
    const isSortedAscending = trimTransactions.every((transaction: any, index: number) => {
      if (index === 0) return true;
      if (type === "rent" || type == 'district') {
        return (
          parseInt(transaction[type]) >= parseInt(trimTransactions[index - 1][type])
        );
      } else {
        return transaction[type] >= trimTransactions[index - 1][type];
      }
    });
    if (isSortedAscending) {
      setTransactions([...trimTransactions.reverse()]);
    } else {
      const sortedTransactions = [...trimTransactions].sort((a: any, b: any) => {
        if (type === "rent") {
          return parseInt(a[type]) - parseInt(b[type]);
        } else {
          return a[type].localeCompare(b[type]);
        }
      });
      setTransactions(sortedTransactions);
    }
  }







  return (
    <div className="flex flex-col bg-white">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm: lg:px-8">
          <div className="overflow-hidden">
            <div className="min-w-full text-left text-sm font-light overflow-hidden">
              <div className="border-b font-medium dark:border-neutral-500 grid gap-1 grid-cols-[17%_8%_7%_10%_10%_10%_14%_6%_13%] text-sm">
                <div className="px-1 py-4 text-xs ps-5 flex">Project <span className='flex items-center ms-2'><FaSort className='hover:cursor-pointer' onClick={() => handleSort("project")} /></span></div>
                <div className="px-1 py-4 text-xs ps-5 flex" >Month <span className='flex items-center ms-2'><FaSort className='hover:cursor-pointer' onClick={() => handleSort("leaseDate")} /></span></div>
                <div className="px-1 py-4 text-xs ps-5 flex">Rent <span className='flex items-center ms-2'><FaSort className='hover:cursor-pointer' onClick={() => handleSort("rent")} /></span></div>
                <div className="px-1 py-4 text-xs ps-5">Number Of Bedrooms</div>
                <div className="px-1 py-4 text-xs ps-5">Area(Sqm)</div>
                <div className="px-1 py-4 text-xs ps-5">Area(Sqft)</div>
                <div className="px-1 py-4 text-xs ps-5 flex">Street <span className='flex items-center ms-2'><FaSort className='hover:cursor-pointer' onClick={() => handleSort("street")} /></span></div>
                <div className="px-1 py-4 text-xs ps-5 flex">District <span className='flex items-center ms-2'><FaSort className='hover:cursor-pointer' onClick={() => handleSort("district")} /></span></div>
                <div className="px-1 py-4 text-xs ps-5">PropertyType</div>
              </div>
              <div className="overflow-hidden">
                <List
                  height={480}
                  itemCount={trimTransactions.length}
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
