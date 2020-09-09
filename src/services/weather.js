import { WeatherApiResponse } from "../models/weather-api-response.js";

const requestSettings = {
  method: "GET",
  cache: "default",
  mode: "cors",
  headers: { "Content-Type": "application/json" },
};

const getWeatherForecast = function(searchData = {}) {
  const { latitude, longitude, cityName } = searchData;

  if (!cityName) {
    return getCityNameByGeolocation({ latitude, longitude }).then((cityName) =>
      getWeather({ latitude, longitude, cityName })
    );
  }
  return getGeolocationByCityName(cityName).then(({ latitude, longitude }) =>
    getWeather({ latitude, longitude, cityName })
  );
};

function getCityNameByGeolocation({ latitude, longitude }) {
  const cityNameUrl = window.__env.cityNameUrl;
  return fetch(
    `${cityNameUrl}?lat=${latitude}&lon=${longitude}&format=json`,
    requestSettings
  ).then(async (response) => {
    if (response.ok) {
      const data = await response.json();
      return (
        data.address.city || data.address.town || data.address.municipality
      );
    }
    return Promise.reject("City Name API error");
  });
}

function getGeolocationByCityName(cityName) {
  const geolocationUrl = window.__env.geolocationUrl;
  return fetch(
    `${geolocationUrl}?q=${cityName}&format=jsonv2`,
    requestSettings
  ).then(async (response) => {
    if (response.ok) {
      const data = (await response.json())[0];
      return {
        latitude: data.lat,
        longitude: data.lon,
      };
    }
    return Promise.reject("Geolocation API error");
  });
}

function getWeather({ latitude, longitude, cityName }) {
  const { apiKey, currentWeatherUrl, pastWeatherUrl } = window.__env;

  return Promise.all([
    getCurrentWeatherForecast({
      latitude,
      longitude,
      apiKey,
      apiUrl: currentWeatherUrl,
    }),
    getPastWeatherForecast({
      latitude,
      longitude,
      apiKey,
      apiUrl: pastWeatherUrl,
    }),
  ]).then(([currentWeather, pastWeather]) => {
    const seenHourlyForecasts = [];
    const hourlyForecast = [
      ...(pastWeather.hourly || []),
      ...(currentWeather.hourly || []),
    ].filter((hourlyForecast) => {
      if (seenHourlyForecasts.includes(hourlyForecast.dt)) {
        return false;
      }
      seenHourlyForecasts.push(hourlyForecast.dt);
      return true;
    });
    const dailyForecast = currentWeather.daily;
    const current = currentWeather.current;
    return new WeatherApiResponse({
      current,
      dailyForecast,
      hourlyForecast,
      cityName,
    });
  });
}

const getCurrentWeatherForecast = function({
  latitude,
  longitude,
  apiKey,
  apiUrl,
} = {}) {
  return fetch(
    apiUrl +
      `?appid=${apiKey}&lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely`,
    requestSettings
  ).then(async (response) => {
    if (response.ok) {
      return await response.json();
    }
    return Promise.reject("Current Weather API error");
  });
};

const getPastWeatherForecast = function({
  latitude,
  longitude,
  apiKey,
  apiUrl,
} = {}) {
  const timezoneOffset = 3 * 60 * 60 * 1000;
  const deltaTime = ((new Date().getTime() - timezoneOffset) / 1000).toFixed(0);
  return fetch(
    apiUrl +
      `?appid=${apiKey}&lat=${latitude}&lon=${longitude}&dt=${deltaTime}&units=metric&exclude=current`,
    requestSettings
  ).then(async (response) => {
    if (response.ok) {
      return await response.json();
    }
    return Promise.reject("Past Weather API error");
  });
};

export { getWeatherForecast };
