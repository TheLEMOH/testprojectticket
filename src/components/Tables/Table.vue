<template>
  <DataTable
    :value="items.rows"
    :lazy="true"
    v-model:filters="filters"
    :resizableColumns="true"
    stripedRows
    :rows="25"
    :totalRecords="items.count"
    :rowsPerPageOptions="[25, 50, 100]"
    class="p-datatable-sm"
    :reorderableColumns="false"
    :globalFilterFields="global"
    responsiveLayout="stack"
    :paginator="paginator"
    @page="Page"
  >
    <template #header v-if="search">
      <div class="search-header">
        <div class="table-statistic">
          <span style="margin-right: 1rem">Всего: {{ items.count }}</span>
          <span>На странице: {{ items.rows ? items.rows.length : 0 }}</span>
        </div>
        <div>
          <Button icon="pi pi-plus" class="p-button-sm p-button-raised p-button-success" @click="RedirectCreate" v-if="props.redirect.create"></Button>
          <Button icon="pi pi-filter" class="p-button-sm p-button-raised" style="margin-right: 1rem !important" @click="RedirectFilter" v-if="props.redirect.filter"></Button>

          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText placeholder="Поиск" v-model="filters['global'].value" />
          </span>
        </div>
      </div>
    </template>

    <template #empty> Ничего не найдено </template>

    <slot name="columns"></slot>
  </DataTable>
</template>

<script setup>
import { ref, reactive } from "vue";
import { FilterMatchMode } from "primevue/api";
import { Get } from "../../scripts/fetch";

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const query = route.query;

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const props = defineProps({
  url: String,
  items: {
    type: Array,
    default: [],
  },
  global: {
    type: Array,
    default: null,
  },
  paginator: Boolean,
  redirect: {
    create: {
      type: String,
      default: null,
    },
    filter: {
      type: String,
      default: null,
    },
    default: {
      create: null,
      filter: null,
    },
  },
  search: {
    type: Boolean,
    default: true,
  },
});

let items = ref({});

const GetItems = async (event = { page: 0, rows: 25 }) => {
  const filter = Object.fromEntries(Object.entries(query).filter(([_, v]) => v != null));
  const searchParams = { page: event.page, limit: event.rows, ...filter };
  items.value = await Get(`${props.url}`, { searchParams });
};

if (props.items.length == 0) {
  GetItems();
}

const Page = async (event) => {
  GetItems(event);
};

const RedirectCreate = () => {
  router.push({ name: props.redirect.create });
};

const RedirectFilter = () => {
  router.push({ name: props.redirect.filter });
};
</script>

<style></style>
