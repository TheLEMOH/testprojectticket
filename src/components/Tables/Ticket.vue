<template>
  <Table :url="props.url" :global="global" :paginator="true" :redirect="{ create: 'ticketCreate', filter: 'ticketFilter' }">
    <template #columns>
      <Column field="createdAt" header="Дата создания">
        <template #body="{ data }">
          {{ new Date(data.createdAt).toLocaleString("ru") }}
        </template>
      </Column>
      <Column field="creator" header="От">
        <template #body="{ data }"> {{ data.creator.surname }} {{ data.creator.name }} {{ data.creator.patronymic }} </template>
      </Column>
      <Column field="executor" header="Исполнитель">
        <template #body="{ data }">
          <template v-if="data.executor"> {{ data.executor.surname }} {{ data.executor.name }} {{ data.executor.patronymic }} </template>
          <template v-else><b>Исполнитель не назначен</b></template>
        </template>
      </Column>
      <Column field="category.name" header="Категория"></Column>
      <Column header="Путь">
        <template #body="{ data }"> {{ data.way.name }} ({{ data.stepNumber }}) </template>
      </Column>
      <Column field="status.name" header="Статус"> </Column>
      <Column header="Приоритет">
        <template #body="{ data }">
          <Badge :value="data.priority.name" :severity="data.priority.type"></Badge>
        </template>
      </Column>
      <Column header="Управление">
        <template #body="{ data }">
          <Button label="Открыть" class="p-button-raised p-button-sm" @click="Open(data.id)" />
        </template>
      </Column>
    </template>
  </Table>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

import Table from "./Table.vue";

const router = useRouter();
const route = useRoute();

const global = ["category.name"];

const props = defineProps({
  url: String,
});

const Open = (id) => {
  router.push({ name: "ticketEdit", params: { id } });
};
</script>

<style>
.custom-badge {
  border-radius: 2px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.3px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  color: #fff;
  border-radius: 6px;
}
</style>
