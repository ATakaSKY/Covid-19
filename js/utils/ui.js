import { onRegionSelect } from "./helper";

export const startLoading = parentSelector => {
  const parentNode = document.querySelector(parentSelector);
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "loading";

  parentNode.style.pointerEvents = "none";

  parentNode.appendChild(loadingDiv);
};

export const stopLoading = parentSelector => {
  const parentNode = document.querySelector(parentSelector);
  const loadingNode = [...parentNode.childNodes].filter(
    child => child.className === "loading"
  );

  parentNode.style.pointerEvents = "auto";

  parentNode.removeChild(loadingNode[0]);
};

function calculatePercentage(total, amount) {
  return ((amount / total) * 100).toFixed(2);
}

export function displayStats(data) {
  const stats = `
  <div class="confirmed card"><label>Confirmed: </label> <span class="confirmed">${
    data.confirmed.value
  }(100%)</span></div>
  <div class="recovered card"><label>Recovered: </label> <span class="green">${
    data.recovered.value
  }(${calculatePercentage(
    data.confirmed.value,
    data.recovered.value
  )}%)</span></div>
  <div class="deaths card"><label>Deaths: </label> <span class="red">${
    data.deaths.value
  }(${calculatePercentage(
    data.confirmed.value,
    data.deaths.value
  )}%)</span></div>
    `;

  return stats;
}

export function displayCountries(data, country) {
  const options = Object.entries(data.countries)
    .map(([currentCountry, code]) => {
      const selected = code.iso3 === country ? true : null;
      return `
              <option ${selected ? `selected=${selected}` : ""}  value="${
        code.iso3
      }">${code.name}</option>
          `;
    })
    .join("");

  const countries = `
              <h2 class="countryHeader">Showing results for ${country}</h2>
  
              <select class="country-select">
                  ${options}
              </select>
      `;

  return countries;
}

export function displayRegionDropdown(data) {
  let selected = "";
  const options = Object.entries(data)
    .map(([countryName, code]) => {
      return `
            <option ${
              selected ? `selected=${countryName === "US"}` : ""
            }  value="${countryName}">${countryName}</option>
        `;
    })
    .join("");

  onRegionSelect("US");

  const regionDropdown = document.querySelector("#region");
  regionDropdown.style.display = "block";
  regionDropdown.innerHTML = options;

  regionDropdown.addEventListener("change", onRegionSelect);
}
