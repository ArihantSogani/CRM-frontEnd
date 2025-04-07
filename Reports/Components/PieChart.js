import React from "react";
import CanvasJSReact from "../../../Assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = () => {
  const options = {
    animationEnabled: true,
    subtitles: [
      {
        text: "8%",
        verticalAlign: "center",
        fontSize: 20,
        color: "#02374e",
        dockInsidePlotArea: true,
      },
    ],

    data: [
      {
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###'%'",
        dataPoints: [
          { name: "Net Material Used (456Kg)", y: 92 },
          { name: "Net Material Wastage (40Kg)", y: 8 },
        ],
      },
    ],
  };
  return (
    <>
      <CanvasJSChart options={options} />
    </>
  );
};
export default PieChart;
