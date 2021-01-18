<template>
  <q-page>
    <div class="row wrap relative-position" :style="style">
      <div class="col-sm-6 col-md-5 bg-primary">
        <div class="super-title">
          <div class="square">
            <em class="line line-01"></em>
            <em class="line line-02"></em>
            <em class="line line-03"></em>
            <em class="line line-04"></em>
            <em class="line line-05"></em>
          </div>
          <div class="super-title-content">
            <h1>Movimiento de Rebaño Vacuno</h1>
            <p class="text-h6 text-weight-light">Aprende el movimiento en el tiempo de un rebaño vacuno</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-md-7">
        <q-img
          basic
          :src="require('assets/movimiento de rebaño vacuno.jpg')"
          :height="$q.screen.height + 'px'"
        >
          <div class="row justify-around wrap items-center fit">
            <q-btn color="primary"
                   class="self-end q-mb-xl"
                   icon-right="fas fa-angle-right"
                   size="lg"
                   @click="goSimulacion">
              <span class="text-white">Empieza ahora</span>
            </q-btn>
          </div>
        </q-img>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  computed: {
    style () {
      return {
        minHeight: this.$q.screen.height + 'px'
      }
    }
  },
  methods: {
    goSimulacion () {
      this.$router.push({ name: 'simulacion' })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
