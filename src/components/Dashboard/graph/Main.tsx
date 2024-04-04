
import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { MyContext } from "@/context/context";

// Register the CategoryScale plugin
Chart.register(...registerables);


function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


// Defining the LineChart component
const Graph = () => {
    // const [isLoading, setLoading] = useState(true);
    // const {transactions} = useContext(MyContext);
    // const [dynamicDataset, setData] = useState<any[]>([]);
    // const [dynamicLabels, setLabels] = useState<string[]>([])

    // useEffect(() => {
    //     const aggregatedData : {
    //         [date:string]:{
    //             [faltype:string]:{
    //                 totalRent:number,
    //                 count:number
    //             }
    //         }
    //     }= {};
    
    //     // Aggregate transactions by rent_approval_date and flat_type
    //     transactions.forEach(transaction => {
    //         const date = transaction.rent_approval_date;
    //         const flatType = transaction.flat_type;
    //         const rent = parseInt(transaction.monthly_rent);
    
    //         if (!aggregatedData[date]) {
    //             aggregatedData[date] = {};
    //         }
    
    //         if (!aggregatedData[date][flatType]) {
    //             aggregatedData[date][flatType] = { totalRent: 0, count: 0 };
    //         }
    
    //         aggregatedData[date][flatType].totalRent += rent;
    //         aggregatedData[date][flatType].count += 1;
    //     });
    //     const labels: string[] = Object.keys(aggregatedData);
    //     const datasets :any[] = [];

    //     labels.sort();
    //     // Create a dataset for each flat type
    //     labels.forEach(date => {
    //         const flatTypes = Object.keys(aggregatedData[date]);
    //         flatTypes.forEach(flatType => {
    //             if (!datasets.find(dataset => dataset.label === flatType)) {
    //                 datasets.push({
    //                     label: flatType,
    //                     data: [],
    //                     borderColor: getRandomColor(),
    //                     fill: false
    //                 });
    //             }
    
    //             const totalRent = aggregatedData[date][flatType].totalRent;
    //             const count = aggregatedData[date][flatType].count;
    //             const averageRent = totalRent / count;
    
    //             const dataset = datasets.find(dataset => dataset.label === flatType);
    //             dataset.data.push(averageRent);
    //         });
            
    //     });
    //     datasets.sort((a, b) => a.label.localeCompare(b.label));
    //     setData(datasets);
    //     setLabels(labels);
    //     setLoading(false);
    // }, [transactions]);
    // const data = {
    //     labels: dynamicLabels,
    //     datasets: dynamicDataset
    // };

    return (
        <div className="h-96 border border-slate-700 w-full">
            {/* <Line height={1000} width={1300} data={data} /> */}
        </div>
    );
};

export default Graph;
