<template>
  <Table :url="props.url" :global="global" :redirect="{ create: 'categoryCreate', filter: 'categoryFilter' }" :paginator="true">
    <template #columns>
      <Column field="name" header="Наименование"></Column>
      <Column field="description" header="Описание"></Column>
      <Column field="priority.name" header="Приоритет"></Column>
      <Column field="way.name" header="Путь"></Column>
      <Column header="Управление">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" class="p-button-raised p-button-sm" @click="Open(data.id)" />
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

const global = ["id", "name", "way.name"];

const props = defineProps({
  url: String,
});

const Open = (id) => {
  router.push({ name: "categoryEdit", params: { id } });
};
</script>

<style></style>
