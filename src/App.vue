<template>
  <div class="main-template">
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <component :is="components[layout]"></component>
  </div>
</template>

<script setup>
import Standard from "./layouts/Standard.vue";
import Center from "./layouts/Center.vue";
import Init from "./layouts/Init.vue";

import { computed, watch } from "vue";
import { useRoute } from "vue-router";

import { useStore } from "vuex";

import { useToast } from "primevue/usetoast";

const toast = useToast();

const store = useStore();

const components = {
  Standard,
  Center,
  Init,
};

const route = useRoute();

const layout = computed(() => route.meta.layout);

store.dispatch("Refresh");

watch(
  () => store.getters.message,
  (values) => {
    toast.add({ severity: values.type, summary: values.header, detail: values.text, life: 3000 });
  }
);
</script>

<style>
body {
  padding: 0;
  margin: 0;
  background: #eff3f8;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
}

html {
  font-size: 14px;
}

.flex-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.flex-form-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.flex-form-between {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.p-button {
  margin: 0.2rem !important;
}

.search-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

.p-datatable {
  flex: 1 1;
  z-index: 0;
  margin-bottom: 1rem;
}

footer {
  display: flex;
  justify-content: end;
}

.p-card-footer {
  display: flex;
  justify-content: end;
}

.p-card-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field-checkbox {
  display: flex;
  gap: 0.5rem;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 10px;
}

*::-webkit-scrollbar-thumb {
  background-color: #3b82f6;
  border-radius: 10px;
}

textarea {
  width: 100%;
}

h5 {
  padding: 0;
  margin: 0;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}


/* .p-button.p-button-sm {
    font-size: 0.5rem;
    padding: 0.65625rem 1.09375rem;
} */
</style>
