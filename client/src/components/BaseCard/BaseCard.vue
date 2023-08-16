<template>
  <div id="card" :class="['display-card', props.role === 'user' ? 'user' : 'chat' ]">
  <slot name="content"></slot>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  role: String
}
const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.display-card {
  box-sizing: border-box;
  background-color: #615074;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 4px 4px hsl(0, 2%, 53%);
}
.user {
    background-color: #4d71b5;
  }
</style>