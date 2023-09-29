<template>
  <div class="login-slide-container">
    <img
      v-for="(slideImage, index) in slideImages"
      :key="index"
      :src="slideImage"
      alt="slide-uba-img"
      class="login-slide-img"
      :class="{ active : index === activeSlideIndex}"
    >
    <div class="slides-indicator">
      <div
        v-for="(_, index) in slideImages"
        :key="index"
        :class="{ active : index === activeSlideIndex}"
        class="slide-indicator-item"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import slide1 from '~/assets/images/pic1.jpg'
import slide2 from '~/assets/images/pic2.jpg'
import slide3 from '~/assets/images/pic3.jpg'
import slide4 from '~/assets/images/pic4.jpg'

const activeSlideIndex = ref(0)
const slideImages = [slide1, slide2, slide3, slide4]

const slideTimer = setInterval(() => {
  activeSlideIndex.value += 1
  activeSlideIndex.value %= slideImages.length
}, 10000)

onUnmounted(() => {
  clearInterval(slideTimer)
})
</script>

<style lang="scss">
.login-slide-container {
  border-radius: 50px;
  overflow: hidden;
  height: 100%;
  position: relative;
  .login-slide-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    &.active {
      opacity: 1;
    }
  }
  .slides-indicator {
    display: flex;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    .slide-indicator-item {
      display: block;
      width: 15px;
      height: 6px;
      background-color: rgba(white, 0.5);
      margin-right: 6px;
      border-radius: 5px;
      transition: all 0.5s ease-in-out;
      &:last-child {
        margin-right: 0;
      }
      &.active {
        background-color: white;
        width: 25px;
      }
    }
  }
}
</style>
