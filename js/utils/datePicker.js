import datepicker from "js-datepicker";
import moment from "moment";

import { abortAll } from "./fetch";
import { getDatesDiff, transformData } from "./helper";
import { displayRegionDropdown, startLoading, stopLoading } from "./ui";

const dateRangeBtn = document.querySelector("#date-range-btn");
const abortBtn = document.querySelector(".abort-btn");
const graphContainer = document.querySelector(".graph-container");
const pieChartContainer = document.querySelector(".pie-chart-container");

let startDate = "",
  endDate = "",
  countriesData = [],
  signal,
  controller;

const startD = datepicker(document.querySelector(".start"), {
  dateSelected: new Date(Date.now() - 864e5 * 3),
  id: 1,
  minDate: new Date(2020, 1, 1)
});

datepicker(document.querySelector(".end"), {
  dateSelected: new Date(Date.now() - 864e5),
  id: 1,
  maxDate: new Date(Date.now() - 864e5)
});

abortBtn.addEventListener("click", e => {
  controller.abort();

  countriesData = [];
  graphContainer.innerHTML = "";
  pieChartContainer.innerHTML = "";
  graphContainer.style.display = "none";
  pieChartContainer.style.display = "none";
  stopLoading(".mid-section");
  abortBtn.style.display = "none";
});

async function getRangeData(start, end) {
  startDate = start;
  endDate = end;
  const dates = getDatesDiff(startDate, endDate);
  countriesData = [];
  graphContainer.innerHTML = "";
  pieChartContainer.innerHTML = "";
  graphContainer.style.display = "none";
  pieChartContainer.style.display = "none";

  let urls = [];
  controller = new AbortController();
  signal = controller.signal;

  for (let i = 0; i < dates.length; i++) {
    const currentDate = dates[i];
    urls.push(`https://covid19.mathdro.id/api/daily/${currentDate}`);
  }

  startLoading(".mid-section");
  abortBtn.style.display = "block";
  document.querySelector("#region").style.display = "none";

  abortAll(urls, signal).then(data => {
    for (let i = 0; i < dates.length; i++) {
      countriesData.push(transformData(data[i], dates[i]));
    }
    displayRegionDropdown(countriesData[countriesData.length - 1]);

    stopLoading(".mid-section");
    abortBtn.style.display = "none";
  });
}

dateRangeBtn.addEventListener("click", () => {
  startDate = moment(startD.getRange().start).format("MM-DD-YYYY");
  endDate = moment(startD.getRange().end).format("MM-DD-YYYY");

  getRangeData(startDate, endDate);
});

export { countriesData, startDate, endDate, getRangeData };
