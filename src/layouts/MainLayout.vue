<template>
  <q-layout view="hHh lpR fff">
    <r-menu>
      <template slot="logo">
        <q-avatar  size="60px">
          <img src="~assets/logo-ucv.png">
        </q-avatar>
      </template>
      <q-btn flat round size="lg" icon="fas fa-bars" slot="more"/>
    </r-menu>
    <q-page-container>
      <router-view/>
    </q-page-container>
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
      ]
    }
  }
}
</script>
