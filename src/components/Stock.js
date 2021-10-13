import React from "react";
import { Line } from 'react-chartjs-2';

const Stock = (props) => {
   
    const data = {
        labels: props.dates,
        datasets: [
            {
                data: props.pricesHigh,
                label: 'High',
                borderColor: '#3333ff',
                fill: false,
            },
            {
                data: props.pricesLow,
                label: 'Low',
                borderColor: 'red',
                fill: false,
            },
            {
                data: props.pricesOpen,
                label: 'Open',
                borderColor: 'yellow',
                fill: false,
            }
        ],
        
    }

    const options = {
        title: {
            display: true,
            text: props.query,
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            ]
        },
        
    }
        
                
        
    return (
        <div className="chart">
            <Line data={data} options={options} />
        </div>
    )
}

export default Stock;