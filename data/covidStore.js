import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";

const our_world_in_data_url =
  "https://covid.ourworldindata.org/data/owid-covid-data.json";
const our_world_in_data_vaccination =
  "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json";

const handleErrors = (res) => {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res;
};

export const createVaccinesDataSource = () => {
  return new Promise((res, rej) => {
    fetch(our_world_in_data_vaccination)
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        res(result);
      })
      .catch((e) => {
        rej(e);
      });
  });
};

const filterNonCountries = (arr) => {
  const countries = [];

  for (let i in arr) {
    if (arr[i].continent) {
      countries.push(arr[i]);
    }
  }

  return countries;
};

export const createCovidDataSource = () => {
  return new Promise((res, rej) => {
    fetch(our_world_in_data_url)
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        const filteredCountries = filterNonCountries(result);

        res(filteredCountries);
      })
      .catch((e) => {
        rej(e);
      });
  });
};
