import { NextRequest, NextResponse } from "next/server";
import { rentalData } from "@/types/data";
export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const body = await req.json();
    const { type, transactions } = body;
    const isSortedAscending = transactions.every((transaction: any, index :number) => {
      if (index === 0) return true;
      if (type === "rent") {
        return (
          parseInt(transaction[type]) >= parseInt(transactions[index - 1][type])
        );
      } else {
        return transaction[type] >= transactions[index - 1][type];
      }
    });
    if (isSortedAscending) {
      return NextResponse.json({ transactions: transactions.reverse()});
    } else {
      const sortedTransactions = [...transactions].sort((a, b) => {
        if (type === "rent") {
          return parseInt(a[type]) - parseInt(b[type]);
        } else {
          return a[type].localeCompare(b[type]);
        }
      });
        return NextResponse.json({ transactions: sortedTransactions });
    }
  }

}
