<template>
  <nav class="menu">
    <div class="menu-logo">
      <slot name="logo"></slot>
    </div>
    <ul class="menu-content">
      <slot></slot>
    </ul>
    <div class="menu-more">
      <slot name="more"></slot>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'rMenu'
}
</script>
