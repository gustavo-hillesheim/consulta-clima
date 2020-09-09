<template>
  <div ref="chart"></div>
</template>
<script>
import { Chart } from "frappe-charts/dist/frappe-charts.esm";
import "frappe-charts/dist/frappe-charts.min.css";

export default {
  name: "line-chart",
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    chart: null,
  }),
  mounted() {
    this.chart = new Chart(this.$refs.chart, this.chartConfig);
  },
  beforeUpdate() {
    this.chart = new Chart(this.$refs.chart, this.chartConfig);
  },
  computed: {
    chartConfig() {
      return {
        title: this.config.title,
        data: this.data,
        height: this.config.height,
        type: "line",
        colors: this.config.colors || ["orange"],
        lineOptions: {
          regionFill: 1,
          heatline: 1,
        },
        axisOptions: {
          xAxisMode: "tick",
          xIsSeries: true,
        },
        valuesOverPoints:
          typeof this.config.showValues === "boolean"
            ? this.config.showValues
            : true,
        tooltipOptions: {
          formatTooltipY: this.config.formatY || ((d) => d),
        },
      };
    },
    data() {
      return {
        labels: Array(...this.config.labels),
        datasets: this.datasets,
      };
    },
    datasets() {
      const chartData = this.config.data.map((set) => ({
        name: set.label,
        values: set.data,
      }));
      return chartData;
    },
  },
};
</script>
