<template>
  <footer class="footer" :class="classes">
    <div class="footer-container">
      <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/ve/" target="_blank" class="lic-img">
        <img src="~assets/lic.png">
      </a>
      <p class="copy">2021 | <a href="http://www.ucv.ve/" target="_blank">Universidad Central de venezuela</a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'rFooter',
  data () {
    return {
      transparent: false
    }
  },
  computed: {
    classes () {
      return (this.transparent === true ? ' footer-transparent' : '')
    }
  },
  watch: {
    $route (to) {
      this.transparent = to.meta.footer_transparent ? to.meta.footer_transparent : false
    }
  },
  created () {
    this.transparent = this.$route.meta.footer_transparent ? this.$route.meta.footer_transparent : false
  }
}
</script>

<style scoped>

</style>
