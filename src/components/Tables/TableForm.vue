<template>
  <DataTable
    :value="props.items"
    v-model:filters="filters"
    :editMode="editMode"
    :resizableColumns="true"
    columnResizeMode="fit"
    stripedRows
    class="p-datatable-sm"
    :reorderableColumns="false"
    :globalFilterFields="global"
    responsiveLayout="stack"
    @rowReorder="$emit('reorder', $event)"
    @cell-edit-complete="$emit('edit-cell', $event)"
  >
    <template #header v-if="search">
      <div class="table-statistic"></div>
      <div class="search-header">
        <span></span>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText class="p-inputtext-sm" placeholder="Поиск" v-model="filters['global'].value" />
        </span>
      </div>
    </template>

    <template #empty> Ничего не найдено </template>

    <slot name="columns"></slot>
  </DataTable>
</template>

<script setup>
import { ref, reactive } from "vue";
import { FilterMatchMode } from "primevue/api";

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const props = defineProps({
  items: Array,
  global: Array,
  editMode: {
    type: String,
    default: null,
  },
  search: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["reorder", "edit-cell"]);
</script>

<style></style>
