const headers = [
  { label: "Order Id", key: "orderCode" },
  { label: "Jewelry Type", key: "jewelryType" },
  { label: "Process", key: "currentProcess" },
  { label: "Design Code", key: "designCode" },
  { label: "Type of Metal", key: "typeOfMetal" },
  { label: "ringSize", key: "ringSize" },
  { label: "Order Date", key: "createdAt" },
  { label: "Weight Input", key: "weightInput.$numberDecimal" },
  { label: "Weight Output", key: "weightOutput.$numberDecimal" },
  { label: "Quantity", key: "quantity" },
  { label: "Finding Weight", key: "findingWeight.$numberDecimal" },
  { label: "Wastage", key: "wastage.$numberDecimal" },
  { label: "Stone Weight Input", key: "stoneWeightInput.$numberDecimal" },
  { label: "Stone Weight Output", key: "stoneWeightOutput.$numberDecimal" },
  { label: "Stone Wastage", key: "stoneWastage.$numberDecimal" },
  { label: "Time Started", key: "timeStarted" },
  { label: "Time Completed", key: "timeCompleted" },
];

export default headers;
