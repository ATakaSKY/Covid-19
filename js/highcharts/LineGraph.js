// import Highcharts from "highcharts";

const graphContainer = document.querySelector(".graph-container");

export function displayLine(highchartDataObj) {
  graphContainer.style.display = "block";
  Highcharts.chart(graphContainer, {
    title: {
      text: "Covid Current Rate "
    },

    subtitle: {
      text: "Source: https://covid19.mathdro.id/api"
    },

    yAxis: {
      title: {
        text: "Number of people"
      }
    },

    xAxis: {
      title: {
        text: "Date"
      },
      categories: [...highchartDataObj.currentDate]
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle"
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        }
      }
    },

    series: [
      {
        name: "Confirmed",
        data: highchartDataObj && highchartDataObj.confirmed
      },
      {
        name: "Recovered",
        data: highchartDataObj && highchartDataObj.recovered,
        color: "lightgreen"
      },
      {
        name: "Death",
        data: highchartDataObj && highchartDataObj.deaths,
        color: "orangered"
      }
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom"
            }
          }
        }
      ]
    }
  });
}
