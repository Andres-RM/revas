<template>
  <apexchart type="line" :options="options" :series="series" ref="chart"/>
</template>
<script>
export default {
  name: 'ApexAnimal',
  props: {
    animaldata: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      numero: [],
      total: [],
      partos: [],
      series: [],
      labels: [],
      compras: [],
      disponibles: [],
      ventas: []
    }
  },
  computed: {
    options: {
      get () {
        return {
          chart: {
            id: 'animalChart',
            stacked: false,
            toolbar: {
              show: true,
              tools: {
                zoom: false,
                zoomin: false,
                zoomout: false
              }
            },
            zoom: {
              enabled: false
            }
          },
          colors: [
            '#74bdde',
            '#cb1fe7',
            '#f37d2c',
            '#07c638',
            '#e5e010',
            '#192f9a'
          ],
          dataLabels: {
            enabled: false
          },
          fill: {
            opacity: [1, 0.5, 1, 1, 1, 0.8],
            type: ['solid', 'gradient', 'pattern', 'solid', 'solid', 'solid'],
            gradient: {
              shade: 'light',
              type: 'vertical',
              shadeIntensity: 0.5,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 0.8,
              stops: [0, 50, 100]
            },
            pattern: {
              style: 'verticalLines',
              width: 15,
              height: 1,
              strokeWidth: 13
            }
          },
          markers: {
            size: 4
          },
          title: {
            text: 'Movimiento del rebaño - crecimiento de población',
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
            width: [3, 1, 3, 3, 1, 1]
          },
          tooltip: {
            shared: false,
            theme: this.$q.dark.isActive ? 'dark' : 'light',
            fixed: {
              enabled: true,
              position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
              offsetY: 30,
              offsetX: 40
            },
            y: {
              formatter: function (y) {
                if (typeof y !== 'undefined') {
                  return y.toFixed(0) + ' Und.'
                }
                return y
              }
            }
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
              showForNullSeries: false,
              labels: {
                style: {
                  colors: this.$q.dark.isActive ? '#fff' : '#232323'
                }
              },
              axisBorder: {
                show: true,
                color: '#1342bd'
              },
              tooltip: {
                enabled: true
              },
              axisTicks: {
                show: true
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
      this.numero = []
      this.total = []
      this.labels = []
      this.compras = []
      this.disponibles = []
      this.ventas = []
      this.partos = []
      this.animaldata.forEach((animal, index) => {
        this.labels.push(index + 1 + 'º año')
        this.numero.push(Math.round(animal.numero))
        this.partos.push(Math.round(animal.num_partos))
        this.compras.push(Math.round(animal.compras))
        this.disponibles.push(Math.round(animal.disponibles))
        this.ventas.push(Math.round(animal.ventas))
        this.total.push(Math.round(animal.total))
      })
      this.series.push({
        name: 'Inicio',
        data: this.numero
      })
      this.series.push({
        name: 'Partos',
        type: 'area',
        data: this.partos
      })
      this.series.push({
        name: 'Compras',
        data: this.compras
      })
      this.series.push({
        name: 'Disponibles',
        data: this.disponibles
      })
      this.series.push({
        name: 'Ventas',
        type: 'column',
        data: this.ventas
      })
      this.series.push({
        name: 'Total',
        type: 'column',
        data: this.total
      })
    }
  }
}
</script>
