import Vue from "vue";

import App from "./App.vue";
import BaseCard from "./components/BaseCard";
import BaseSelect from "./components/BaseSelect";
import LineChart from "./components/LineChart";
import WeatherIcon from "./components/WeatherIcon";
import ConditionInfo from "./components/ConditionInfo";

import filters from "./filters";

Vue.config.productionTip = false;

window.__env = {
  currentWeatherUrl:
    "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall",
  pastWeatherUrl:
    "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall/timemachine",
  geolocationUrl:
    "https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmap.org/search.php",
  cityNameUrl:
    "https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmap.org/reverse",
  apiKey: "1b435bdafcf29529842ea079aac25517",
};

Vue.component(BaseCard.name, BaseCard);
Vue.component(BaseSelect.name, BaseSelect);
Vue.component(LineChart.name, LineChart);
Vue.component(WeatherIcon.name, WeatherIcon);
Vue.component(ConditionInfo.name, ConditionInfo);

Object.keys(filters).forEach((filterName) =>
  Vue.filter(filterName, filters[filterName])
);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
