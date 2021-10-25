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
                borderWidth: 2,
            },
            {
                data: props.pricesLow,
                label: 'Low',
                borderColor: 'red',
                fill: false,
                borderWidth: 2,
            },
            {
                data: props.pricesOpen,
                label: 'Open',
                borderColor: 'yellow',
                fill: false,
                borderWidth: 2,
            }
        ],
    }

    const options = {
       
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'black',
                    fontFamily: 'Montserrat',
                },
                font: {
                    size: 18,
                    weight: 'bold',
                    family: 'Montserrat',
                },
            },
            title: {
                display: true,
                text: 'Prices',
                padding: {
                    top: 10,
                    bottom: 30
                },
            font: {
                size: 32,
                family: 'Montserrat'
            },
        },
    }
        
    }
        
                
        
    return (
        <div className="chart">
            <Line data={data} options={options} />
        </div>
    )
}

export default Stock;