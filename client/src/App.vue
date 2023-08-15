
<template>
  <BaseNavigaton/>
  <main class="content-wrapper">
    <router-view></router-view>
  </main>
  <BaseFooter class="footer"/>
</template>

<script setup lang="ts">
import BaseNavigaton from './components/BaseNavigation'
import BaseFooter from './components/BaseFooter'
</script>

<style lang="scss" scoped>
.content-wrapper {
  margin: .5rem 0;
  height: fit-content;
  //background-color:#2a2a84;
}
.footer{
  position: absolute;
  bottom: 0;

}
</style>
