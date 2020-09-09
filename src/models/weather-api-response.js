function getRain(rain) {
  return parseFloat(typeof rain === "object" ? rain["1h"] : rain) || 0;
}

class WeatherApiResponse {
  /**
   * Detalhes do clima do dia. WeatherDetails
   */
  dayDetails;
  /**
   * Previsão do tempo para o dia atual e dos próximos. Array de WeatherForecast
   */
  forecast;

  constructor(apiResponse) {
    this.dayDetails = new WeatherDetails(
      apiResponse.current,
      apiResponse.hourlyForecast,
      apiResponse.cityName
    );
    this.forecast = apiResponse.dailyForecast
      .filter((_, index) => index > 0 && index < 7)
      .map((dailyForecast) => new DailyWeatherForecast(dailyForecast));
  }
}

class WeatherDetails {
  /**
   * Temperatura atual em ºC
   */
  temperature;
  /**
   * Temperatura mínima em ºC
   */
  maxTemperature;
  /**
   * Temperatura máxima em ºC
   */
  minTemperature;
  /**
   * Condição do tempo atual
   */
  condition;
  /**
   * Nome da cidade e estado
   */
  city;
  /**
   * Humidade média do dia em percentual
   */
  humidity;
  /**
   * Humidade atual do dia em percentual
   */
  currentHumidity;
  /**
   * Velocidade do vento atual em km/h
   */
  windSpeed;
  /**
   * Nuvens em percentual
   */
  clouds;
  /**
   * Volume de chuva em milimetros por hora médio do dia
   */
  rain;
  /**
   * Volume de chuva em milimetros por hora atual
   */
  currentRain;
  /**
   * Data da previsão
   */
  date;
  /**
   * Dia da semana
   */
  weekday;
  /**
   * Sensação términa
   */
  feelsLike;
  /**
   * Previsão de temperatura por hora. Array de HourlyWeatherForecast
   */
  hourlyForecast;

  constructor(currentData, hourlyForecast, cityName) {
    this.city = cityName;
    const deltaDate = new Date(currentData.dt * 1000);
    this.date = `${deltaDate.getDate()}/${deltaDate.getMonth() + 1}`;
    this.temperature = Math.round(currentData.temp).toFixed(0);

    this.weekday = deltaDate.getDay();
    this.condition = currentData.weather[0].id;
    this.currentHumidity = currentData.humidity;
    this.windSpeed = currentData.wind_speed || 0;
    this.currentRain = getRain(currentData.rain);
    this.clouds = currentData.clouds;
    this.feelsLike = currentData.feels_like;
    this.hourlyForecast = hourlyForecast
      .filter((_, index) => index > 2 && index < 27)
      .map((forecast) => new HourlyWeatherForecast(forecast));

    this.minTemperature = this.hourlyForecast
      .map((forecast) => Math.round(forecast.temp).toFixed(0))
      .reduce((temp1, temp2) => (temp1 < temp2 ? temp1 : temp2));

    this.maxTemperature = this.hourlyForecast
      .map((forecast) => Math.round(forecast.temp).toFixed(0))
      .reduce((temp1, temp2) => (temp1 > temp2 ? temp1 : temp2));

    this.humidity = (
      this.hourlyForecast
        .map((forecast) => forecast.humidity)
        .reduce((h1, h2) => h1 + h2) / this.hourlyForecast.length
    ).toFixed();

    this.rain = (
      this.hourlyForecast
        .map((forecast) => forecast.rain)
        .reduce((r1, r2) => r1 + r2) / this.hourlyForecast.length
    ).toFixed(2);
  }
}

class HourlyWeatherForecast {
  /**
   * Horário da previsão
   */
  hour;
  /**
   * temperatura
   */
  temp;
  /**
   * Sensação términa
   */
  feelsLike;
  /**
   * Humidade
   */
  humidity;
  /**
   * Velocidade do vento
   */
  windSpeed;
  /**
   * Nuvens em percentual
   */
  clouds;
  /**
   * Volume de chuva em milimetros na última hora
   */
  rain;

  constructor(forecast) {
    this.hour = new Date(forecast.dt * 1000);
    this.temp = Math.round(forecast.temp).toFixed(0);
    this.humidity = forecast.humidity;
    this.windSpeed = forecast.wind_speed || 0;
    this.clouds = forecast.clouds;
    this.feelsLike = Math.round(forecast.feels_like).toFixed(0);
    this.rain = getRain(forecast.rain);
  }
}

class DailyWeatherForecast {
  /**
   * Data da previsão em dd/mm
   */
  date;
  /**
   * Dia da semana abreviado
   */
  weekday;
  /**
   * Temperatura máxima
   */
  maxTemperature;
  /**
   * Temperatura mínima
   */
  minTemperature;
  /**
   * Descrição da condição do tempo
   */
  condition;
  /**
   * Humidade
   */
  humidity;
  /**
   * Velocidade do vento
   */
  windSpeed;
  /**
   * Nuvens em percentual
   */
  clouds;
  /**
   * Volume de chuva em milimetros na última hora
   */
  rain;

  constructor(forecast) {
    const forecastDate = new Date(forecast.dt * 1000);
    this.date = `${forecastDate.getDate()}/${forecastDate.getMonth() + 1}`;
    this.weekday = forecastDate.getDay();
    this.maxTemperature = Math.round(forecast.temp.max).toFixed(0);
    this.minTemperature = Math.round(forecast.temp.min).toFixed(0);
    this.condition = forecast.weather[0].id;
    this.humidity = forecast.humidity;
    this.windSpeed = forecast.wind_speed || 0;
    this.clouds = forecast.clouds;
    this.rain = getRain(forecast.rain);
  }
}

export {
  WeatherDetails,
  DailyWeatherForecast as WeatherForecast,
  WeatherApiResponse,
};
