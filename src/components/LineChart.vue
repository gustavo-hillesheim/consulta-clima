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
    datasetStep: 1,
  }),
  watch: {
    datasetStep() {
      this.updateChart();
    },
  },
  mounted() {
    this.createChart();
    window.addEventListener("resize", this.handleWindowSizeChange);
    if (this.config.responsive) {
      this.updateDatasetStep(window.innerWidth);
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  },
  updated() {
    this.updateChart();
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
        labels: this.labels,
        datasets: this.datasets,
      };
    },
    labels() {
      const datasetStep = this.datasetStep;
      return this.config.labels.filter(
        (label, index) => index % datasetStep === 0
      );
    },
    datasets() {
      const datasetStep = this.datasetStep;
      const chartData = this.config.data.map((set) => ({
        name: set.label,
        values: set.data.filter((value, index) => index % datasetStep === 0),
      }));
      return chartData;
    },
  },
  methods: {
    createChart() {
      this.chart = new Chart(this.$refs.chart, this.chartConfig);
    },
    updateChart() {
      this.chart.update(this.data);
    },
    handleWindowSizeChange(event) {
      if (this.config.responsive) {
        const screenWidth = event.target.innerWidth;
        this.updateDatasetStep(screenWidth);
      }
    },
    updateDatasetStep(screenWidth) {
      if (screenWidth <= 1400) {
        this.datasetStep = 2;
      } else {
        this.datasetStep = 1;
      }
    },
  },
};
</script>
