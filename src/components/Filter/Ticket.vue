<template>
  <Filter :search="state" redirect="ticketTableFilter">
    <template #title>Фильтр заявок</template>
    <template #content>
      <Calendar inputId="range" v-model="state.date" selectionMode="range" :manualInput="false" placeholder="Дата создания" />
      <Dropdown v-model="state.creatorId" :options="users" optionLabel="name" optionValue="id" filter placeholder="Создатель "></Dropdown>
      <Dropdown v-model="state.executorId" :options="employees" optionLabel="name" optionValue="id" filter placeholder="Исполнитель "> </Dropdown>
      <Dropdown v-model="state.categoryId" :options="categories" optionLabel="name" optionValue="id" filter placeholder="Категория"> </Dropdown>
      <Dropdown v-model="state.statusId" :options="statuses" optionLabel="name" optionValue="id" filter placeholder="Статус "></Dropdown>
      <Dropdown v-model="state.wayId" :options="ways" optionLabel="name" optionValue="id" filter placeholder="Путь "> </Dropdown>
      <Dropdown v-model="state.priorityId" :options="priorities" optionLabel="name" optionValue="id" filter placeholder="Приоритет "> </Dropdown>
    </template>
  </Filter>
</template>

<script setup>
import Filter from "./Filter.vue";

import { Get } from "../../scripts/fetch";
import { reactive } from "vue";

const users = await Get("/users");
const employees = await Get("/users/employees");
const categories = await Get("/categories");
const statuses = await Get("/statuses");
const ways = await Get("/ways");
const priorities = await Get("/priorities");

const state = reactive({
  id: null,
  creatorId: null,
  executorId: null,
  categoryId: null,
  statusId: null,
  wayId: null,
  priorityId: null,
});
</script>

<style></style>
