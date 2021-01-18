<template>
  <div class="super-menu fit row wrap justify-center content-center items-center">
    <div class="row wrap col-12">
      <div class="col-12">
        <ul class="row column justify-start items-center q-px-lg q-py-xl">
          <li v-for="(link, index) of menu" :key="index" @click="toggle($event)">
            <router-link :to="link.to" exact>
              {{ link.text }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rSuperMenu',
  data () {
    return {
      menu: [
        {
          to: {
            name: 'home'
          },
          text: 'Inicio'
        },
        {
          to: {
            name: 'simulacion'
          },
          text: 'Simulacion'
        }
      ]
    }
  },
  methods: {
    toggle (e) {
      this.$emit('togglemenu', e)
    }
  }
}
</script>

<style scoped>

</style>
