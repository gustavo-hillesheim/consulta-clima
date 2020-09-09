<template>
  <div>
    <base-select :options="chartTypeOptions" @select="chartType = $event"></base-select>
    <line-chart :key="chartConfig" :config="chartConfig"></line-chart>
  </div>
</template>
<script>
export default {
  name: "hourly-weather-forecast",
  props: {
    hourlyForecasts: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    chartTypeOptions: [
      {
        label: "Temperatura",
        value: "temperature",
        selected: true,
      },
      {
        label: "Chuva",
        value: "rain",
      },
      {
        label: "Humidade",
        value: "humidity",
      },
    ],
    typeTranslation: {
      temperature: "Temperatura",
      rain: "Chuva",
      humidity: "Humidade",
    },
    typeFormat: {
      temperature: (d) => d + "ºC",
      rain: (d) => d + "mm/h",
      humidity: (d) => d + "%",
    },
    chartType: "temperature",
  }),
  computed: {
    chartConfig() {
      return {
        id: "hourly-forecast",
        title: this.typeTranslation[this.chartType] + " ao longo do dia",
        height: 300,
        data: this.chartData,
        labels: new Array(24).fill(null).map((_, index) => index + "h"),
        showValues: false,
        formatY: this.typeFormat[this.chartType],
      };
    },
    chartData() {
      switch (this.chartType) {
        case "rain":
          return [this.rainForecast];
        case "humidity":
          return [this.humidityForecast];
        case "temperature":
        default:
          return [this.temperatureForecast, this.feelsLikeForecast];
      }
    },
    chartLabels() {
      return this.hourlyForecasts.map((forecast) => forecast.weekday);
    },
    temperatureForecast() {
      return {
        label: "Temperatura",
        data: this.hourlyForecasts.map((forecast) => forecast.temp),
      };
    },
    feelsLikeForecast() {
      return {
        label: "Sensação",
        data: this.hourlyForecasts.map((forecast) => forecast.feelsLike),
      };
    },
    rainForecast() {
      return {
        label: "Chuva",
        data: this.hourlyForecasts.map((forecast) => forecast.rain),
      };
    },
    humidityForecast() {
      return {
        label: "Humidade",
        data: this.hourlyForecasts.map((forecast) => forecast.humidity),
      };
    },
  },
};
</script>
<style scoped>
div {
  margin-top: auto;
}
</style>
