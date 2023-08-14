
<template>
  <BaseNavigaton />
  <main class="content-wrapper">
    <router-view></router-view>
  </main>
  <BaseFooter />
</template>


<script setup lang="ts">
import BaseNavigaton from './components/BaseNavigation'
import BaseFooter from './components/BaseFooter'
const message = 'Hello'
</script>

<style lang="scss" scoped>
.content-wrapper {
  margin: 1rem 0;
  height: fit-content;
  //background-color:#2a2a84;
}
</style>
