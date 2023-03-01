<template>
  <Table :url="props.url" :global="global" :redirect="{ create: 'organizationCreate', filter: 'organizationFilter' }" :paginator="true">
    <template #columns>
      <Column field="id" header="Уникальный ID"></Column>
      <Column field="shortName" header="Сокращение"></Column>
      <Column field="name" header="Наименование организации"></Column>
      <Column field="address" header="Адрес"></Column>
      <Column field="isHead" header="Головная организация">
        <template #body="{ data }">
          <Checkbox v-model="data.isHead" disabled inputId="head" name="head" :binary="true" />
        </template>
      </Column>
      <Column header="Управление">
        <template #body="{ data }">
          <Button class="p-button-raised p-button-sm" icon="pi pi-pencil" @click="Open(data.id)" />
        </template>
      </Column>
    </template>
  </Table>
</template>

<script setup>
import { useRouter } from "vue-router";

import Table from "./Table.vue";

const router = useRouter();

const global = ["id", "name", "address"];

const props = defineProps({
  url: String,
});

const Open = (id) => {
  router.push({ name: "organizationEdit", params: { id } });
};
</script>

<style></style>
