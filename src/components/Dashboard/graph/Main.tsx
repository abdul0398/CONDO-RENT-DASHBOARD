
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
    const {graphCalculation, isLoading} = useContext(MyContext);
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

    
    if (isLoading) {
        return (
          <div className="h-full w-full flex items-center justify-center bg-white">
            <p className="text-lg">Loading...</p>
          </div>
        );
    }


    return (
        <div className="h-96 border bg-white w-full ps-5">
            <Line height={1000} width={1300} data={data} />
        </div>
    );
};

export default Graph;
