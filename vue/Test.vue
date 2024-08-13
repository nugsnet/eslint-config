<template>
  <div :class="$style.SomeComponent">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  const foo = 'bar'

  // eslint-disable-next-line no-console
  console.log(foo)  
</script>

<style lang="scss" module>
  .SomeComponent {
    // style of component
    display: block;
  }
</style>