
import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { MyContext } from "@/context/context";

// Register the CategoryScale plugin
Chart.register(...registerables);




// Defining the LineChart component
const Graph = () => {
    const {graphCalculation} = useContext(MyContext);
    const [dynamicDataset, setData] = useState<any[]>([]);
    const [dynamicLabels, setLabels] = useState<string[]>([])

    useEffect(() => {
        const labels: string[] = Object.keys(graphCalculation);
       const dataset =  [
            {
                label: 'Rents',
                data: Object.values(graphCalculation).map((data: any) => {
                    return data.averageRent;
                }),
            },
            {
                label: 'Rent/Sqft',
                data: Object.values(graphCalculation).map((data: any) => {
                    return data.averageRentSqft;
                }),

            },
        ]
        setData(dataset);
        setLabels(labels);
    }, [graphCalculation]);
    const data = {
        labels: dynamicLabels,
        datasets: dynamicDataset
    };

    const options = {
        maintainAspectRatio:false
    }

    return (
        <div className="h-96 border bg-white w-full ps-5">
            <Line height={1000} width={4000} data={data} options={options} />
        </div>
    );
};

export default Graph;
