<template>
  <Table :url="props.url" :global="global" :redirect="{ create: 'statusCreate', filter: 'statusFilter' }" :paginator="true">
    <template #columns>
      <Column field="name" header="Наименование"></Column>
      <Column field="nameForInternalUsers" header="Внутреннее наименование"></Column>
      <Column field="nameForExternalUsers" header="Внешнее наименование"></Column>
      <Column header="Управление">
        <template #body="{ data }">
          <Button icon="pi pi-pencil p-button-sm" class="p-button-raised" @click="Open(data.id)" />
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

const global = ["id"];

const props = defineProps({
  url: String,
});

const Open = (id) => {
  router.push({ name: "statusEdit", params: { id } });
};
</script>

<style></style>
