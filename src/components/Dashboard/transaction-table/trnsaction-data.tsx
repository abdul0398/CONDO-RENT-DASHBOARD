import { MyContext } from "@/context/context";
import { useContext } from "react"




export default function TransactionData() {
const {transactions} =  useContext(MyContext);

const maxPrice = Math.max(...transactions.map((transaction) => transaction.monthly_rent));
const minPrice = Math.min(...transactions.map((transaction) => transaction.monthly_rent));


    return (
        <section className="h-96 mx-auto">
            <h2 className="text-xl">Transaction Details</h2>
            <div className="bg-white h-full">
                <div className="w-full p-5">
                    <h2 className="font-extrabold text-center">Transactions Count</h2>
                    <p className="text-center">{transactions.length}</p>
                </div>
                <div className="w-full p-5">
                    <h2 className="font-extrabold text-center">Highest Rentals</h2>
                    <p className="text-center">{maxPrice} $</p>
                </div>
                <div className="w-full p-5">
                    <h2 className="font-extrabold text-center">Lowest Rentals</h2>
                    <p className="text-center">{minPrice} $</p>
                </div>
            </div>
        </section>
    )

}