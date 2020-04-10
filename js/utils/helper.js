import moment from "moment";
import _ from "lodash";

import { countriesData } from "./datePicker";
import { displayLine } from "../highcharts/LineGraph";
import { displayPie } from "../highcharts/PieChart";

export const getDatesDiff = (
  start_date,
  end_date,
  date_format = "MM-DD-YYYY"
) => {
  const getDateAsArray = date => {
    return moment(date.split(/\D+/), date_format);
  };
  const diff =
    getDateAsArray(end_date).diff(getDateAsArray(start_date), "days") + 1;
  const dates = [];
  for (let i = 0; i < diff; i++) {
    const nextDate = getDateAsArray(start_date).add(i, "day");
    dates.push(nextDate.format(date_format));

    //eliminate weekends
    // const isWeekEndDay = nextDate.isoWeekday() > 5;
    // if (!isWeekEndDay) dates.push(nextDate.format(date_format));
  }
  return dates;
};

function addCountryData(data, countryData) {
  let confirmed = 0,
    recovered = 0,
    deaths = 0;

  for (let key in data) {
    const val = data[key];

    if (key === "confirmed") {
      confirmed = +val + +countryData[key];
    } else if (key === "recovered") {
      recovered = +val + +countryData[key];
    } else if (key === "deaths") {
      deaths = +val + +countryData[key];
    }
  }

  return {
    ...countryData,
    confirmed,
    recovered,
    deaths,
    lastUpdate: moment(countryData.lastUpdate).format("DD-MM-YYYY")
  };
}

function addCountryOnce(country) {
  return {
    ...country,
    confirmed: +country.confirmed,
    recovered: +country.recovered,
    deaths: +country.deaths,
    lastUpdate: moment(country.lastUpdate).format("DD-MM-YYYY")
  };
}

export const transformData = (data, currentDate) => {
  const dataByCountry = {};

  for (let country of data) {
    const countryRegion = country["countryRegion"];
    dataByCountry[countryRegion] = dataByCountry[countryRegion]
      ? addCountryData(country, dataByCountry[countryRegion])
      : addCountryOnce(country);

    dataByCountry[countryRegion].currentDate = moment(
      currentDate,
      "MM-DD-YYYY"
    ).format("DD-MM-YYYY");
  }

  return dataByCountry;
};

const getSortedPieData = (a, b) => {
  return b.countryData.confirmed - a.countryData.confirmed;
};

const getPieData = (countryObj, pieChartData) => {
  let pieChartCopy = _.cloneDeep(pieChartData),
    countryObjCopy = _.cloneDeep(countryObj);

  pieChartCopy = Object.entries(countryObjCopy).map(entry => {
    return {
      countryName: entry[0],
      countryData: entry[1]
    };
  });

  pieChartCopy = pieChartCopy.sort(getSortedPieData).slice(0, 5);
  return pieChartCopy;
};

export function onRegionSelect(event) {
  let value = event;
  if (typeof event !== "string") {
    value = event.target.value;
  }

  let confirmed = [],
    recovered = [],
    deaths = [],
    dates = [],
    pieChartData = [],
    c = 0;
  for (let countryObj of countriesData) {
    for (let country in countryObj) {
      if (country === value) {
        const countryData = countryObj[country];
        confirmed.push(countryData.confirmed);
        recovered.push(countryData.recovered);
        deaths.push(countryData.deaths);
        dates.push(countryData.currentDate);
        break;
      }
    }
    ++c;
    if (countriesData.length === c) {
      pieChartData = getPieData(countryObj, pieChartData);
    }
  }
  let highchartDataObj = {};
  highchartDataObj.confirmed = confirmed;
  highchartDataObj.recovered = recovered;
  highchartDataObj.deaths = deaths;
  highchartDataObj.currentDate = dates;

  displayLine(highchartDataObj);

  displayPie(pieChartData);
}
