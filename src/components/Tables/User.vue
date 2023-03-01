<template>
  <Table :url="props.url" :global="global" :redirect="{ create: 'userCreate', filter: 'userFilter' }" :paginator="true">
    <template #columns>
      <Column field="surname" header="Фамилия"></Column>
      <Column field="name" header="Имя"></Column>
      <Column field="patronymic" header="Отчество"></Column>
      <Column field="role.name" header="Роль"></Column>
      <Column field="organization.name" header="Организация" />
      <Column field="subdivision" header="Подразделение"></Column>
      <Column field="position" header="Должность"></Column>
      <Column field="address" header="Адрес"></Column>
      <Column field="cabinet" header="Кабинет"></Column>
      <Column header="Управление">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" class="p-button-sm p-button-raised" @click="Open(data.id)" />
        </template>
      </Column>
    </template>
  </Table>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import Table from "./Table.vue";

const router = useRouter();

const global = ["surname", "name", "patronymic", "organizaion", "subdivision", "position", "address", "cabinet", "organization.name"];

const props = defineProps({
  url: String,
});

const Open = (id) => {
  router.push({ name: "userEdit", params: { id } });
};
</script>

<style></style>
