<template>
  <Table :url="props.url" :global="global" :redirect="{ create: 'wayCreate', filter: 'wayFilter' }" :paginator="true">
    <template #columns>
      <Column field="name" header="Наименование"></Column>
      <Column field="description" header="Описание"></Column>
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

const global = ["id", "name"];

const props = defineProps({
  url: String,
});

const Open = (id) => {
  router.push({ name: "wayEdit", params: { id } });
};
</script>

<style></style>
