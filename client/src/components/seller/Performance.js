import React from "react";
import { Line,Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import Chart from 'chart.js/auto';


function Performance({myAds}) {

  const adsList = useSelector((state) => state.adsList);
  const { ads, error: adsError, loading: loadingAds } = adsList;

  
  const barChartData = {
    labels: ["whatsapp", "Contacts", "Chat"],
    datasets: [
      {
        data: [myAds?.map((data)=> {return data.contactViews.length}), myAds?.map((data)=> {return data.whatsAppViews.length}), 6],
        label: "views",
        borderColor: "#3333ff",
        backgroundColor: ["#2FDE00", "#00A6B4", "#ff6600"],
        fill: true
      },
     
    ]
  };



  return (
    <div className="">
      <div>
     
<Bar
      type="bar"
      width={130}
      height={50}
      options={{
        title: {
          display: true,
          text: "COVID-19 Cases of Last 3 Months",
          fontSize: 15
        },
        legend: {
          display: true, //Is the legend shown?
          position: "top" //Position of the legend.
        }
      }}
      data={barChartData}
    />
      </div>
    </div>
  );
}

export default Performance;
