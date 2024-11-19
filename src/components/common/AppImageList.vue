<template>
  <ul class="app-image-list-container" :class="{ vertical }">
    <li v-for="(image, index) in images" :key="image" @click="clickImage(index)">
      <img :src="image" alt="이미지" />
      <div class="overlay"></div>
    </li>
  </ul>

  <div class="big-image-modal" :class="{ show: showBigImageModal }">
    <button type="button" class="close-button" @click="closeModal">
      <i class="pi pi-times"></i>
    </button>
    <img :src="showingImage" alt="이미지" class="image" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const { images, vertical } = defineProps({
  images: {
    type: Array,
    required: true,
  },

  vertical: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const showBigImageModal = ref(false);
const currentBigImagePosition = ref(0);
const showingImage = computed(() => {
  return images.at(currentBigImagePosition);
});

const clickImage = targetPosition => {
  currentBigImagePosition.value = targetPosition;
  showBigImageModal.value = true;
};

const closeModal = () => {
  currentBigImagePosition.value = 0;
  showBigImageModal.value = false;
};
</script>

<style scoped>
.app-image-list-container {
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 10px;

  &.vertical {
    flex-direction: column;
  }

  li {
    position: relative;
  }

  img {
    object-fit: contain;
    border: 1px solid var(--p-content-border-color);
  }

  img,
  .overlay {
    width: 100px;
    height: 100px;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    &:hover {
      background-color: rgba(0, 0, 0, 0.45);
      cursor: pointer;
    }
  }
}

.big-image-modal {
  display: none;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100dvw;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;

  &.show {
    display: flex;
  }

  .image {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
  }

  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.8);
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-radius: 50%;
    }

    i {
      font-size: 20px;
    }
  }
}
</style>
