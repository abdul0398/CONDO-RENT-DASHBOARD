
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
    <div key={index} style={style} className="h-14 grid gap-1 grid-cols-[10%_20%_30%_6%_10%_14%_10%] border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
      {/* <div className="px-1 font-medium">{transaction._id}</div>
      <div className="px-1">{transaction.town}</div>
      <div className="px-1">{transaction.street_name}</div>
      <div className="px-1">{transaction.block}</div>
      <div className="px-1">{transaction.flat_type}</div>
      <div className="px-1">{transaction.rent_approval_date}</div>
      <div className="px-1">{transaction.monthly_rent}$</div> */}
    </div>
 );
};

 return (
    <div className="flex flex-col bg-white">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm: lg:px-8">
          <div className="overflow-hidden">
            <div className="min-w-full text-left text-sm font-light overflow-hidden">
              <div className="border-b font-medium dark:border-neutral-500 grid gap-1 grid-cols-[10%_20%_30%_6%_10%_14%_10%] text-sm">
                <div className="px-1 py-4 text-sm">ID</div>
                <div className="px-1 py-4 text-sm">TOWN</div>
                <div className="px-1 py-4 text-sm">STREET</div>
                <div className="px-1 py-4 text-sm">BLOCK</div>
                <div className="px-1 py-4 text-sm">FLAT TYPE</div>
                <div className="px-1 py-4 text-sm">APPROVAL DATE</div>
                <div className="px-1 py-4 text-sm">RENTAL ($)</div>
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
