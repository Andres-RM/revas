<template>
  <q-page>
    <div class="row wrap" :style="style">
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
            <h1>Moviento de Rebaño Vacuno</h1>
            <p class="text-h6 text-weight-light">Aprende el movimiento en el tiempo de un rebaño vacuno</p>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-7">
        <q-img
          class="dimmed"
          :src="require('assets/christina-maiia-VaQkEZMeI2k-unsplash.jpg')"
          :height="$q.screen.height + 'px'"
        >
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
  }
}
</script>

<style scoped lang="scss">
</style>
