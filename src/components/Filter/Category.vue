<template>
  <Filter :search="state" redirect="categoryAll">
    <template #title>Фильтр категорий</template>
    <template #content>
      <InputText v-model="state.name" placeholder="Наименование"></InputText>
      <Dropdown v-model="state.priorityId" :options="priorities" optionLabel="name" optionValue="id" filter placeholder="Приоритет"> </Dropdown>
      <Dropdown v-model="state.wayId" :options="ways" optionLabel="name" optionValue="id" filter placeholder="Путь"> </Dropdown>
      <div class="field-checkbox">
        <Checkbox v-model="state.disabledEditor" inputId="emp1" name="emp" :binary="true" />
        <label for="emp1">Отключить тектовый редактор</label>
      </div>
    </template>
  </Filter>
</template>

<script setup>
import { reactive } from "vue";

import Filter from "./Filter.vue";

import { Get } from "../../scripts/fetch";

const priorities = await Get("/priorities");
const ways = await Get("/ways");

const state = reactive({});
</script>

<style></style>
