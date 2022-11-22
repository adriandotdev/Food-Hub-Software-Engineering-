import React, {useState, useEffect} from 'react'

import {
  Chart,
  ChartTitle,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisTitle,
  ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";

const COLORS = {
  accepted: "#059669",
  rejected: "#B91C1C",
  pending: "#6366F1",
  interviewing: "#2563EB",
  total: "#D97706",
};

const seriesLabels = {
  visible: true,
  padding: 3,
  font: "normal 16px Arial, sans-serif",
  position: "center",
};

function getMonthlySales(setSeries) {

    fetch ('http://localhost:3001/get-monthly-sales', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(data => {

        let arrayOfData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        let parsedData = JSON.parse(data);

        parsedData.forEach(data => {

            JSON.parse(data.items).forEach(item => {

                let currentDate = new Date(data.order_date);

                let indexOfDate = currentDate.getMonth();

                arrayOfData[indexOfDate] += item.quantity * item.menuPrice;
            })    
        })

        setSeries([{data: arrayOfData}]);
    })
}

function getTotalOfMenus(setNoOfMenus) {

     fetch ('http://localhost:3001/get-total-menus')
     .then(res => res.json())
     .then(data => {
        setNoOfMenus(JSON.parse(data).length)
     })
}

function getTodaysOrders(setTodaysOrders) {

    fetch ('http://localhost:3001/get-todays-orders')
     .then(res => res.json())
     .then(data => {
        setTodaysOrders(JSON.parse(data).length)
     })
}
function Summary() {

   const [month, setMonth] = useState("1");
   const [series, setSeries] = useState([]);
   const [noOfMenus, setNoOfMenus] = useState([])
   const [todaysOrders, setTodaysOrders] = useState([])

   useEffect(() => {
    document.title = "Food Hub | Summary"

    getTotalOfMenus(setNoOfMenus);
    getTodaysOrders(setTodaysOrders);
   }, [])

   useEffect(() => {

    getMonthlySales(setSeries);    
   }, [month])

  return (
    <div className="w-screen table-height flex flex-col">
         
        <h1 className="text-center text-3xl font-bold text-pnc">Monthly Sales</h1>

        <Chart>
        <ChartTitle text="" />
        <ChartLegend visible={true} />
        <ChartCategoryAxis>
            <ChartCategoryAxisItem >
            <ChartCategoryAxisTitle className="font-bold text-4xl" text="" />
            </ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartSeries>
            {series.map((item, idx) => (
            <ChartSeriesItem
                key={idx}
                type="column"
                gap={2}
                spacing={0.25}
                labels={seriesLabels}
                data={item.data}
                name={item.status}
                color={item.color}
            />
            ))}
        </ChartSeries>
        </Chart>
        
        <div className="flex items-center justify-center mt-6 gap-4">
            <div className="flex flex-col border w-max p-8 border-pnc rounded-md shadow drop-shadow-lg">
                <h1 className="text-4xl font-bold text-pnc">Total # of Menus</h1>
                <p className="text-red-900 text-8xl text-center">{noOfMenus}</p>
            </div>

            <div className="flex flex-col border w-max p-8 border-pnc rounded-md shadow drop-shadow-lg">
                <h1 className="text-4xl font-bold text-pnc">Todays Orders</h1>
                <p className="text-red-900 text-8xl text-center">{todaysOrders}</p>
            </div>
        </div>
        
    </div>
  );
}

export default Summary