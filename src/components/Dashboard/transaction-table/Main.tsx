import React, { use, useEffect, useState } from "react";
import { MyContext } from "@/context/context";
import { useContext } from "react";
import dynamic from "next/dynamic";
import { ListChildComponentProps } from "react-window";
import { FaSort } from "react-icons/fa";

const List = dynamic(
  () => import("react-window").then((mod) => mod.FixedSizeList),
  {
    ssr: false, // Disable SSR for this component
  }
);

export default function Transactions() {
  const { transactions, setTransactions } = useContext(MyContext);
  const trimTransactions: any = transactions.slice(0, 50000).sort((a, b) => {
    // based on project name
    if (a.project < b.project) {
      return -1;
    }
    if (a.project > b.project) {
      return 1;
    }
    return 0;
  });
  const [listings, setListings] = useState<any[]>(trimTransactions);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>({
    key: "project",
    direction: "ascending",
  });

  useEffect(() => {
    setTransactions(transactions.slice(0, 50000));
  }, [transactions]);

  // Define the Row component with proper types for props
  const Row: React.FC<ListChildComponentProps> = ({ index, style }) => {
    const transaction = listings[index];

    if (!transaction) {
      return null; // Return null if transaction is not available
    }

    return (
      <div
        key={index}
        style={style}
        className={`${
          index % 2 == 0 ? "bg-white" : ""
        }"h-14 grid gap-1 grid-cols-[17%_8%_7%_10%_10%_10%_14%_6%_13%] border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"`}
      >
        <div className="px-1 text-xs ps-5">{transaction.project}</div>
        <div className="px-1 text-xs ps-5">{`20${transaction.leaseDate.slice(
          2
        )}-${transaction.leaseDate.slice(0, 2)}`}</div>
        <div className="px-1 text-xs ps-5">${transaction.rent}</div>
        <div className="px-1 text-xs ps-5 text-center">
          {transaction.noOfBedRoom ? transaction.noOfBedRoom : "Blank"}
        </div>
        <div className="px-1 text-xs ps-5">{transaction.areaSqm}</div>
        <div className="px-1 text-xs ps-5">{transaction.areaSqft}</div>
        <div className="px-1 text-xs ps-5">{transaction.street}</div>
        <div className="px-1 text-xs text-center">{transaction.district}</div>
        <div className="px-1 text-xs ps-5">{transaction.propertyType}</div>
      </div>
    );
  };

  const handleSort = (type: string) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === type) {
      direction =
        sortConfig.direction === "ascending" ? "descending" : "ascending";
    }
    setSortConfig({ key: type, direction });

    const sortedListings = [...listings].sort((a, b) => {
      if (
        type === "rent" ||
        type === "district" ||
        type === "project" ||
        type === "street" ||
        type === "propertyType"
      ) {
        // String comparison
        if (a[type] < b[type]) {
          return direction === "ascending" ? -1 : 1;
        }
        if (a[type] > b[type]) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      } else if (type === "leaseDate") {
        // Date comparison
        const dateA = new Date(
          `20${a.leaseDate.slice(2, 4)}-${a.leaseDate.slice(0, 2)}-01`
        );
        const dateB = new Date(
          `20${b.leaseDate.slice(2, 4)}-${b.leaseDate.slice(0, 2)}-01`
        );
        return direction === "ascending"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      } else {
        // Numeric comparison
        return direction === "ascending"
          ? a[type] - b[type]
          : b[type] - a[type];
      }
    });

    setListings(sortedListings);
  };

  return (
    <div className="flex flex-col bg-white">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm: lg:px-4">
          <div className="overflow-hidden">
            <div className="min-w-full text-left text-sm font-light overflow-hidden">
              <div className="border-b font-medium dark:border-neutral-500 grid gap-1 grid-cols-[17%_8%_7%_10%_10%_10%_14%_6%_13%] text-sm">
                <div className="px-1 py-4 text-xs ps-5 ">
                  <div className="flex">
                    Project
                    <span className="flex items-center ms-2">
                      <FaSort
                        className="hover:cursor-pointer"
                        onClick={() => handleSort("project")}
                      />
                    </span>
                  </div>
                </div>
                <div className="px-1 py-4 text-xs ps-5 ">
                  <div className="flex">
                    Month
                    <span className="flex items-center ms-2">
                      <FaSort
                        className="hover:cursor-pointer"
                        onClick={() => handleSort("leaseDate")}
                      />
                    </span>
                  </div>
                </div>
                <div className="px-1 py-4 text-xs ps-5">
                  <div className="flex">
                    Rent
                    <span className="flex items-center ms-2">
                      <FaSort
                        className="hover:cursor-pointer"
                        onClick={() => handleSort("rent")}
                      />
                    </span>
                  </div>
                </div>
                <div className="px-1 py-4 text-xs ps-5">Number Of Bedrooms</div>
                <div className="px-1 py-4 text-xs ps-5">Area(Sqm)</div>
                <div className="px-1 py-4 text-xs ps-5">Area(Sqft)</div>
                <div className="px-1 py-4 text-xs ps-5">
                  <div className="flex">
                    Street
                    <span className="flex items-center ms-2">
                      <FaSort
                        className="hover:cursor-pointer"
                        onClick={() => handleSort("street")}
                      />
                    </span>
                  </div>
                </div>
                <div className="px-1 py-4 text-xs ps-5">
                  <div className="flex">
                    District
                    <span className="flex items-center ms-2">
                      <FaSort
                        className="hover:cursor-pointer"
                        onClick={() => handleSort("district")}
                      />
                    </span>
                  </div>
                </div>
                <div className="px-1 py-4 text-xs ps-5">PropertyType</div>
              </div>
              <div className="overflow-hidden">
                <List
                  height={480}
                  itemCount={listings.length}
                  itemSize={50}
                  width={"100%"}
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
