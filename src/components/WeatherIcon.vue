<template>
  <div :style="containerStyle">
    <img :src="iconSrc" :style="imgStyle" />
  </div>
</template>
<script>
export default {
  name: "weather-icon",
  props: {
    conditionId: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      default: 50,
    },
  },
  computed: {
    iconSrc() {
      const iconId = conditionIdToIcon[this.conditionId];
      return require(`@/assets/weather-icons/${iconId}.png`);
    },
    containerStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`,
        display: "flex",
      };
    },
    imgStyle() {
      return {
        "max-height": `${this.size}px`,
        "max-width": `${this.size}px`,
        "align-self": "center",
      };
    },
  },
};

const conditionIdToIcon = {
  200: "cloud-thunder-rain",
  201: "cloud-thunder-rain",
  202: "cloud-thunder-rain",
  210: "cloud-thunder-rain",
  211: "cloud-thunder-rain",
  212: "cloud-thunder-rain",
  221: "cloud-thunder-rain",
  230: "cloud-thunder-rain",
  231: "cloud-thunder-rain",
  232: "cloud-thunder-rain",

  300: "cloud-rain",
  301: "cloud-rain",
  302: "cloud-rain",
  310: "cloud-rain",
  311: "cloud-rain",
  312: "cloud-rain",
  313: "cloud-rain",
  314: "cloud-rain",
  321: "cloud-rain",

  500: "cloud-rain",
  501: "cloud-rain",
  502: "cloud-rain",
  503: "cloud-rain",
  504: "cloud-rain",
  511: "cloud-snow",
  520: "cloud-rain",
  521: "cloud-rain",
  522: "cloud-rain",
  531: "cloud-rain",

  600: "cloud-snow",
  601: "cloud-snow",
  602: "cloud-snow",
  611: "cloud-snow",
  612: "cloud-snow",
  613: "cloud-snow",
  615: "cloud-snow",
  616: "cloud-snow",
  620: "cloud-snow",
  621: "cloud-snow",
  622: "cloud-snow",

  701: "cloud-mist",
  711: "cloud-mist",
  721: "cloud-mist",
  731: "cloud-mist",
  741: "cloud-mist",
  751: "cloud-mist",
  761: "cloud-mist",
  762: "cloud-mist",
  771: "cloud-mist",
  781: "cloud-mist",

  800: "sun",
  801: "cloud-sun",
  802: "cloud",
  803: "clouds",
  804: "clouds",
};
</script>