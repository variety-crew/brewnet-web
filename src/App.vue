<template>
  <div>
    <Button label="나는 버튼" />
    <AutoComplete v-model="value" :suggestions="items" @complete="search" />
    <div class="card flex flex-wrap justify-center gap-4">
      <div class="flex items-center gap-2">
        <Checkbox v-model="pizza" input-id="ingredient1" name="pizza" value="Cheese" />
        <label for="ingredient1">치즈</label>
      </div>
      <div class="flex items-center gap-2">
        <Checkbox v-model="pizza" input-id="ingredient2" name="pizza" value="Mushroom" />
        <label for="ingredient2">버섯</label>
      </div>
      <div class="flex items-center gap-2">
        <Checkbox v-model="pizza" input-id="ingredient3" name="pizza" value="Pepper" />
        <label for="ingredient3">고추</label>
      </div>
      <div class="flex items-center gap-2">
        <Checkbox v-model="pizza" input-id="ingredient4" name="pizza" value="Onion" />
        <label for="ingredient4">양파</label>
      </div>
    </div>

    <div class="flex flex-wrap gap-4">
      <div class="flex items-center gap-2">
        <RadioButton v-model="pizza2" input-id="cheese1" name="pizza2" value="Cheese" />
        <label for="cheese1">Cheese</label>
      </div>
      <div class="flex items-center gap-2">
        <RadioButton v-model="pizza2" input-id="mushroom2" name="pizza2" value="Mushroom" />
        <label for="mushroom2">Mushroom</label>
      </div>
      <div class="flex items-center gap-2">
        <RadioButton v-model="pizza2" input-id="pepper3" name="pizza2" value="Pepper" />
        <label for="pepper3">Pepper</label>
      </div>
      <div class="flex items-center gap-2">
        <RadioButton v-model="pizza2" input-id="onion4" name="pizza2" value="Onion" />
        <label for="onion4">Onion</label>
      </div>
    </div>

    <h1>주문관리 하하하</h1>
    <h2>가맹점 주문하라!! 하하하</h2>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
const items = ref([]);
const pizza = ref();
const pizza2 = ref();

const search = event => {
  items.value = [...Array(10).keys()].map(item => event.query + '-' + item);
};
</script>

<style scoped></style>
