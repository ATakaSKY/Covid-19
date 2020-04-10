import moment from "moment";

import useStats from "./utils/fetch";
import {
  displayStats,
  displayCountries,
  startLoading,
  stopLoading
} from "./utils/ui";
import { getRangeData } from "./utils/datePicker";

const body = document.querySelector("body");
const statsContainer = document.querySelector(".stats-global");
const countries = document.querySelector(".countries");
const statsCountryContainer = document.querySelector(
  ".stats-country-container"
);

body.addEventListener("change", onCountrySelect);

function onCountrySelect(event) {
  if (event.target.classList.contains("country-select")) {
    document.querySelector(
      ".countryHeader"
    ).innerHTML = `Showing results for ${event.target.value}`;
    getStatsForCountry(event.target.value);
  }
}

async function getCountries() {
  startLoading(".right-section");

  const { data, error } = await useStats(
    "https://covid19.mathdro.id/api/countries"
  );
  stopLoading(".right-section");

  const countriesData = displayCountries(data, "USA");

  countries.innerHTML += countriesData;
}

async function getStatsForCountry(country) {
  statsCountryContainer.innerHTML = "";

  startLoading(".right-section");
  const { data, error } = await useStats(
    `https://covid19.mathdro.id/api/countries/${country}`
  );
  stopLoading(".right-section");

  if (data.error) {
    statsCountryContainer.innerHTML = `<span class="no-data">No data for ${country}</span>`;
    return;
  }

  const stats = displayStats(data);

  statsCountryContainer.innerHTML = stats;
}

async function init() {
  document.querySelector("#region").style.display = "none";

  getCountries();
  getStatsForCountry("USA");

  startLoading(".left-section");
  const { data } = await useStats("https://covid19.mathdro.id/api");
  stopLoading(".left-section");

  const stats = displayStats(data);

  statsContainer.innerHTML = stats;

  const startDate = moment()
    .subtract(3, "days")
    .format("MM-DD-YYYY");

  const endDate = moment()
    .subtract(1, "days")
    .format("MM-DD-YYYY");

  await getRangeData(startDate, endDate);
}

window.addEventListener("load", () => {
  init();
});
