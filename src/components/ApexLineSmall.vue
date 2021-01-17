<template>
  <apexchart :options="options" :series="serie" ref="lineSmall"></apexchart>
</template>

<script>
export default {
  name: 'ApexLineSmall',
  props: {
    seriedata: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      serie: [{
        data: []
      }]
    }
  },
  computed: {
    options: {
      get () {
        return {
          colors: ['#FFF', '#17ead9', '#f02fc2'],
          chart: {
            toolbar: {
              show: false
            }
          },
          grid: {
            show: false
          },
          stroke: {
            curve: 'smooth',
            width: 2
          },
          yaxis: {
            labels: {
              show: false
            }
          },
          xaxis: {
            labels: {
              style: {
                colors: '#FFF'
              }
            }
          },
          tooltip: {
            fixed: {
              enabled: true,
              position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
              offsetY: 0,
              offsetX: 0
            },
            x: {
              formatter: function (y) {
                if (typeof y !== 'undefined') {
                  return y.toFixed(0) + 'º año.'
                }
                return y
              }
            },
            y: {
              formatter: function (y) {
                if (typeof y !== 'undefined') {
                  return y.toFixed(0) + ' UA.'
                }
                return y
              },
              title: {
                formatter: () => ''
              }
            },
            theme: this.$q.dark.isActive ? 'dark' : 'light'
          }
        }
      }
    }
  },
  watch: {
    seriedata: {
      deep: true,
      handler () {
        this.updateSeriesLine()
      }
    }
  },
  mounted () {
    this.updateSeriesLine()
  },
  methods: {
    updateSeriesLine () {
      this.$refs.lineSmall.updateSeries([
        {
          data: this.seriedata.map(value => {
            return Math.round(value)
          })
        }
      ])
    }
  }
}
</script>
