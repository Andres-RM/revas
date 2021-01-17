<template>
  <nav class="menu" :class="classes">
    <div class="menu-logo">
      <slot name="logo"></slot>
    </div>
    <ul class="menu-content">
      <slot></slot>
    </ul>
    <div class="menu-more">
      <slot name="more"></slot>
    </div>
    <q-resize-observer @resize="__onResize"/>
  </nav>
</template>

<script>
export default {
  name: 'rMenu',
  inject: {
    layout: {
      default () {
        console.error('rMenu needs to be child of QLayout')
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: true
    },
    heightHint: {
      type: [String, Number],
      default: 50
    }
  },
  data () {
    return {
      revealed: true,
      size: parseInt(this.heightHint, 10),
      reveal: false,
      transparent: false
    }
  },
  watch: {
    value (val) {
      this.__update('space', val)
      this.layout.__animate()
    },
    $route (to) {
      this.reveal = to.meta.header_reveal ? to.meta.header_reveal : false
      this.transparent = to.meta.header_transparent ? to.meta.header_transparent : false
    }
  },
  computed: {
    classes () {
      return (this.reveal === true ? 'menu-primary' : '') +
        (this.transparent === true ? ' menu-transparent' : '')
    }
  },
  created () {
    this.layout.instances.header = this
    this.__update('space', this.value)
    this.value === true && this.__update('size', this.size)
    this.reveal = this.$route.meta.header_reveal ? this.$route.meta.header_reveal : false
    this.transparent = this.$route.meta.header_transparent ? this.$route.meta.header_transparent : false
  },
  methods: {
    __update (prop, val) {
      if (this.layout.header[prop] !== val) {
        this.layout.header[prop] = val
      }
    },
    __updateLocal (prop, val) {
      if (this[prop] !== val) {
        this[prop] = val
      }
    },
    __onResize ({ height }) {
      if (this.transparent) this.__update('space', false)
      this.__updateLocal('size', height)
      this.__update('size', height)
    }
  }
}
</script>
