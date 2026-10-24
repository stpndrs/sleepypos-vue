<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'ChartComponent',
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    type: {
      type: String,
      default: 'line'
    }
  },
  data() {
    return {
      series: [
        {
          name: 'Sales',
          data: [20, 50, 60,70],
        },
      ],
      yaxis:{
        min: 10,
        max: 50,
      },
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        xaxis: {
          categories: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
          ],
        },
      },
    }
  },
}
</script>

<template>
  <div>
    <apexchart 
      :type="type"
      height="300"
      :series="series"
      :options="chartOptions"
    />
  </div>
</template>