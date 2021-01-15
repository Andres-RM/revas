import VueApexCharts from 'vue-apexcharts'

export default async ({ app, router, Vue }) => {
  Vue.use(VueApexCharts)
  Vue.component('apexchart', VueApexCharts)
}
