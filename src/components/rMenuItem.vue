<template>
  <li class="menu-item">
    <router-link :to="to" exact>
      <slot/>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'rMenuItem',
  props: {
    to: {
      required: true
    }
  }
}
</script>

<style scoped>

</style>
