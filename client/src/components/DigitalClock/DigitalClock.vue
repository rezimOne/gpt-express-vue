<template>
  <div class="clock">
    <p>{{ clockHours }}</p>
    <p :style="{ visibility: isVisibleColon ? 'visible' : 'hidden' }">:</p>
    <p>{{ clockMinutes }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const clockInterval = ref<ReturnType<typeof setInterval> | null>(null);
const isVisibleColon = ref<boolean>(true);
const clockHours = ref<string>('00');
const clockMinutes = ref<string>('00');

const setCurrentTime = (): void => {
  const date = new Date();
  const [hours, minutes] = [date.getHours(), date.getMinutes()];
  clockHours.value = `${hours < 10 ? '0' + hours : hours}`;
  clockMinutes.value = `${minutes < 10 ? '0' + minutes : minutes}`;
  isVisibleColon.value = !isVisibleColon.value;
};

onMounted((): void => {
  clockInterval.value = setInterval(() => setCurrentTime(), 1000);
});

onUnmounted((): void => {
  clockInterval.value && clearInterval(clockInterval.value);
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');
.clock {
  //margin: 5px;
  //width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    color: rgb(116, 141, 162);
    font-size: 0.6rem;
    letter-spacing: 2px;
    line-height: 0.8;
    font-family: 'Press Start 2P', cursive;
  }
}
</style>
