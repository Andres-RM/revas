<template>
  <q-layout view="hHh lpR fFf">
    <r-menu>
      <q-avatar slot="logo" rounded size="60px">
        <img src="~assets/logo-ucv.jpeg">
      </q-avatar>
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
