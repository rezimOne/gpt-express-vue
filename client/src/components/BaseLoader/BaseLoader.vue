<template>
  <transition appear name="fade">
    <div
      class="loader-base"
      :class="{ 'loader-base-modal': modal }"
    >
      <div
        :class="[
          modal
            ? 'loader-base-modalContent'
            : 'loader-base-content'
        ]"
      >
        <span>
          <transition name="fade" mode="out-in">
            <div class="loader-container">
              <svg height="20" width="20" viewBox="0 0 100 100">
                <defs>
                  <filter id="shadow">
                    <feDropShadow
                      dx="0"
                      dy="0"
                      stdDeviation="1.5"
                      flood-color="#409eff"

                    />
                  </filter>
                </defs>
                <circle
                  id="spinner"
                  style="
                    fill: transparent;
                    stroke: #925a7f;
                    stroke-width: 10px;
                    stroke-linecap: round;
                    filter: url(#shadow);
                  "
                  cx="50"
                  cy="50"
                  r="45"
                />
              </svg>
            </div>
          </transition>
        </span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseLoader",
  props: {
    modal: {
      type: Boolean,
      default: false
    }
  },
});
</script>

<style lang="scss">
.loader-base {
  display: grid;
  place-items: center;
  grid-gap: 10px;

  &-modal {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    backdrop-filter: blur(3px);
  }

  &-modalContent {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: auto auto;
    border: solid 4px #808080;
    border-radius: 10px;
    padding: 1rem;
    font-size: 1.5rem;
    font-weight: 300;
    background-color: #d3d3d3
  }

  &-content {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: auto auto;
  }
}

@keyframes loader-animation {
  0% {
    stroke-dasharray: 1 98;
    stroke-dashoffset: -105;
  }
  50% {
    stroke-dasharray: 100 10;
    stroke-dashoffset: -160;
    transform: rotate(145deg);
  }
  100% {
    stroke-dasharray: 1 98;
    stroke-dashoffset: -300;
  }
}

#spinner {
  transform-origin: center;
  animation-name: loader-animation;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
</style>
