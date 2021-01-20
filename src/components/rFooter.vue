<template>
  <footer class="footer" :class="classes">
    <div class="footer-container">
      <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/ve/" target="_blank" class="lic-img">
        <img src="~assets/lic.png">
      </a>
      <p class="copy">© 2020 - {{current_year}} | <a href="http://www.ucv.ve/" target="_blank">Universidad Central de Venezuela</a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'rFooter',
  data () {
    return {
      transparent: false,
      current_year: null
    }
  },
  computed: {
    classes () {
      return (this.transparent === true ? ' footer-transparent' : '')
    }
  },
  beforeMount () {
    this.current_year = new Date().getFullYear()
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
