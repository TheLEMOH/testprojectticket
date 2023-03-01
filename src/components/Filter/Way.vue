<template>
  <Filter :search="state" redirect="wayAll">
    <template #title>Фильтр путей </template>
    <template #content>
      <InputText v-model="state.name" placeholder="Наименование"></InputText>
    </template>
  </Filter>
</template>

<script setup>
import { reactive } from "vue";

import Filter from "./Filter.vue";

const state = reactive({});
</script>

<style></style>
