<template>
  <q-layout view="hHh lpR fff">
    <r-menu>
      <template slot="logo">
        <q-avatar size="60px">
          <img src="~assets/logo-ucv.png">
        </q-avatar>
        <div class="title">MOREVA <span>simulador</span></div>
      </template>
      <q-btn @click="toogle_menu" flat round size="lg" icon="fas fa-bars" slot="more"/>
    </r-menu>
    <r-super-menu :class="supermenu ? 'active': ''" @togglemenu="toogle_menu"></r-super-menu>
    <q-page-container>
      <router-view/>
    </q-page-container>
    <r-footer/>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
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
      ],
      supermenu: false
    }
  },
  methods: {
    toogle_menu () {
      this.supermenu = !this.supermenu
    }
  }
}
</script>
