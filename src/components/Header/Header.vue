<template>
  <header class="system-header">
    <strong>{{ pageName }}</strong>
    <div class="client-panel" v-if="client">
      <Menubar :model="items"> </Menubar>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";

const store = useStore();

const route = useRoute();

const pageName = computed(() => route.meta.name);
const client = computed(() => store.getters.client);
const clientRole = computed(() => store.getters.clientRole);
const labelMenu = computed(() => (client.value ? client.value.surname : null));
const userId = computed(() => (client.value ? client.value.id : null));
const params = computed(() => (userId.value ? { id: userId.value } : {}));
const Exit = () => {
  store.dispatch("Exit");
};

const items = ref([
  {
    label: labelMenu,
    icon: "pi  pi-user",
    items: [
      {
        label: "Главная",
        icon: "pi pi-home",
        to: { name: "home" },
      },
      {
        label: "Кабинет",
        icon: "pi pi-user-edit",
        to: { name: "userEdit", params: params },
      },
      {
        label: "Статистика",
        icon: "pi pi-chart-line",
        to: { name: "statistic" },
        visible: () => clientRole.value > 1,
      },
      {
        label: "Выйти",
        icon: "pi pi-times",
        command: Exit,
      },
    ],
  },
]);
</script>

<style>
.system-header {
  padding: 1rem;
  font-size: 1.5rem;
  background-color: #fff;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  z-index: 10;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.client-panel {
  font-size: 1rem;
  margin-right: 5rem;
}

.p-menubar {
  padding: 0;
  z-index: 100;
}
</style>
