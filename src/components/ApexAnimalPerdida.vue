<template>
  <apexchart :options="options" :series="series"></apexchart>
</template>

<script>
export default {
  name: 'ApexAnimalPerdida',
  props: {
    animaldata: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      series: [],
      labels: [],
      mortalidad: [],
      descarte: [],
      reemplazo: []
    }
  },
  computed: {
    options: {
      get () {
        return {
          chart: {
            id: 'animalChartPerdida',
            stacked: false,
            toolbar: {
              show: true,
              tools: {
                zoom: false,
                zoomin: false,
                zoomout: false,
                customIcons: this.$q.fullscreen.isActive ? [{
                  icon: '<i class="fas fa-compress"></i>',
                  title: 'contraer',
                  class: 'q-px-sm',
                  click: this.toogleFullScree
                }] : [{
                  icon: '<i class="fas fa-expand"></i>',
                  title: 'expander',
                  class: 'q-px-sm',
                  click: this.toogleFullScree
                }]
              }
            },
            zoom: {
              enabled: false
            },
            height: '100%'
          },
          dataLabels: {
            enabled: false
          },
          colors: [
            '#008FFB',
            '#00E396',
            '#f37d2c'
          ],
          title: {
            text: 'Movimiento del rebaño - (Mortalidad, Descarte, Reemplazo)',
            align: 'left',
            offsetX: 30,
            style: {
              color: this.$q.dark.isActive ? '#fff' : '#232323'
            }
          },
          legend: {
            showForZeroSeries: false,
            horizontalAlign: 'left'
          },
          stroke: {
            show: true,
            curve: 'smooth',
            width: [1, 1, 4]
          },
          tooltip: {
            fixed: {
              enabled: true,
              position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
              offsetY: 30,
              offsetX: 60
            },
            theme: this.$q.dark.isActive ? 'dark' : 'light'
          },
          xaxis: {
            categories: this.labels,
            labels: {
              style: {
                colors: this.$q.dark.isActive ? '#fff' : '#232323'
              }
            }
          },
          yaxis: [
            {
              showAlways: false,
              showForNullSeries: false,
              axisTicks: {
                show: true
              },
              axisBorder: {
                show: true,
                color: '#f37d2c'
              },
              labels: {
                style: {
                  colors: '#f37d2c'
                }
              },
              tooltip: {
                enabled: true
              }
            },
            {
              seriesName: 'Descarte',
              showForNullSeries: false,
              showAlways: false,
              opposite: true,
              axisTicks: {
                show: true
              },
              axisBorder: {
                show: true,
                color: '#00E396'
              },
              labels: {
                style: {
                  colors: '#00E396'
                }
              }
            },
            {
              seriesName: 'Mortalidad',
              opposite: true,
              axisTicks: {
                show: true
              },
              axisBorder: {
                show: true,
                color: '#008FFB'
              },
              labels: {
                style: {
                  colors: '#008FFB'
                }
              }
            }
          ],
          theme: {
            mode: this.$q.dark.isActive ? 'dark' : 'light'
          }
        }
      }
    }
  },
  watch: {
    animaldata: {
      deep: true,
      handler () {
        this.prepareData()
      }
    }
  },
  created () {
    this.prepareData()
  },
  methods: {
    prepareData () {
      this.series = []
      this.mortalidad = []
      this.descarte = []
      this.reemplazo = []
      this.animaldata.forEach((animal, index) => {
        this.labels.push(index + 1 + 'º año')
        this.mortalidad.push(Math.round(animal.num_mortalidad))
        this.descarte.push(Math.round(animal.num_descarte))
        this.reemplazo.push(Math.round(animal.reemplazo))
      })
      this.series.push({
        name: 'Mortalidad',
        type: 'column',
        data: this.mortalidad
      })
      this.series.push({
        name: 'Descarte',
        type: 'column',
        data: this.descarte
      })
      this.series.push({
        name: 'Reemplazo',
        type: 'line',
        data: this.reemplazo
      })
    },
    toogleFullScree (chart, options, e) {
      this.$q.fullscreen.toggle(this.$parent.$el.parentNode)
        .then(() => {
        })
        .catch(() => {
        })
    }
  }
}
</script>
