import React from 'react';
import CanvasJSReact from '../../../Assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const LineChart = () => {
    const options = {
        theme: "light2",
        animationEnabled: true,
        axisY: {
            includeZero: false,
            suffix: "k"
        },
        toolTip: {
            shared: true
        },
        data: [
            {
                type: "area",
                showInLegend: true,
                yValueFormatString: "₹#,##0.##",
                dataPoints: [
                    { label: "Mon", y: 49 },
                    { label: "Tue", y: 49.5 },
                    { label: "Wed", y: 50 },
                    { label: "Thrus", y: 49.58 },
                    { label: "Fri", y: 49.05 },
                    { label: "Sat", y: 49.55 },
                    { label: "Sun", y: 49.8 }
                ]
            },
        ]
    }
    return (
        <>
            <CanvasJSChart options={options} />
        </>
    )
}
export default LineChart;