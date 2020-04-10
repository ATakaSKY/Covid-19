import moment from "moment";

import { startDate, endDate } from "../utils/datePicker";

const pieContainer = document.querySelector(".pie-chart-container");

export const displayPie = pieChartData => {
  pieContainer.style.display = "block";

  Highcharts.chart(pieContainer, {
    chart: {
      type: "variablepie"
    },
    title: {
      text: `Top 5 Countries covid-19 cases till ${moment(
        endDate,
        "MM-DD-YYYY"
      ).format("Do MMM ")}`
    },
    tooltip: {
      headerFormat: "",
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
        "Recovered: <b>{point.z}</b><br/>" +
        "Confirmed : <b>{point.y}</b><br/>" +
        "Deaths: <b>{point.x}</b><br/>"
    },
    series: [
      {
        minPointSize: 10,
        innerSize: "20%",
        zMin: 0,
        name: "countries",
        data: pieChartData.map(pie => {
          return {
            name: pie.countryName,
            z: pie.countryData.recovered,
            y: pie.countryData.confirmed,
            x: pie.countryData.deaths
          };
        })
      }
    ]
  });
};
