<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated >
      <r-menu>
        <r-menu-item v-for="(item, index) in menu" :key="index" :to="item.to">
          {{ item.text }}
        </r-menu-item>
      </r-menu>
    </q-header>
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
