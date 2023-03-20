<template>
  <Filter :search="state" redirect="userAll">
    <template #title>Фильтр пользователей</template>
    <template #content>
      <InputText v-model="state.surname" placeholder="Фамилия"></InputText>
      <InputText v-model="state.name" placeholder="Имя"></InputText>
      <InputText v-model="state.patronymic" placeholder="Отчество"></InputText>
      <Dropdown v-model="state.organizationId" :options="organizations" optionLabel="shortName" optionValue="id" filter placeholder="Организация"></Dropdown>
      <InputText v-model="state.subdivision" placeholder="Подразделение"></InputText>
      <InputText v-model="state.position" placeholder="Должность"></InputText>
      <InputText v-model="state.email" placeholder="Почта"></InputText>
      <Dropdown v-model="state.roleId" :options="roles" optionLabel="name" optionValue="id" filter placeholder="Роль"> </Dropdown>
      <div class="field-checkbox">
        <Checkbox v-model="state.isEmployee" inputId="emp1" name="emp" :binary="true" />
        <label for="emp1">Является исполнителем</label>
      </div>
    </template>
  </Filter>
</template>

<script setup>
import { Get } from "../../scripts/fetch";
import { reactive } from "vue";

import Filter from "./Filter.vue";

const organizations = await Get("/organizations");
const roles = await Get("/roles");

const state = reactive({});
</script>

<style></style>
