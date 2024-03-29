<template>
  <div class="sidebar">
    <template v-if="widthWindow > 960">
      <h3>Меню</h3>
      <TieredMenu class="sidebar-menu" :model="items" orientation="vertical"> </TieredMenu>
      <h3>Папки</h3>
      <TieredMenu class="sidebar-menu" :model="folders" orientation="vertical"> </TieredMenu>
      <template v-if="userFolders.length == 0">У Вас нет папок</template>
    </template>

    <template v-else>
      <Button class="p-button-text" type="button" label="Меню" @click="displayMenu = true" />
      <Dialog v-model:visible="displayMenu" modal style="width: 85%" fullscreen>
        <PanelMenu :model="items" popup />
      </Dialog>
    </template>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, ref, onMounted, onUnmounted } from "vue";
import PanelMenu from "primevue/panelmenu";

const store = useStore();
const router = useRouter();
const menu = ref();
const displayMenu = ref(false);
const clientRole = computed(() => store.getters.clientRole);
const widthWindow = ref(window.innerWidth);
const userFolders = computed(() => {
  const uf = store.getters.folders;
  const nf = uf.map((f) => {
    return {
      label: f.name,
      command: () => {
        console.log(f.filter);
        router.push({ name: "ticketTableFilter", query: f.filter });
      },
    };
  });
  return nf;
});

const items = [
  {
    label: "Заявки",
    items: [
      {
        label: "Создать заявку",
        to: { name: "ticketCreate" },
        visible: () => clientRole.value > 0,
      },
      {
        label: "Найти заявку",
        to: { name: "ticketFilter" },
        visible: () => clientRole.value > 0,
      },
      {
        label: "Открытые заявки",
        to: { name: "ticketOpen" },
        visible: () => clientRole.value > 1,
      },
      {
        label: "Закрытые заявки",
        to: { name: "ticketClose" },
        visible: () => clientRole.value > 1,
      },
      {
        label: "Мои заявки",
        to: { name: "ticketMy" },
        visible: () => clientRole.value > 0,
      },
    ],
    visible: () => clientRole.value > 0,
  },

  {
    label: "Пользователи",
    items: [
      {
        label: "Создать пользователя",
        to: { name: "userCreate" },
        visible: () => clientRole.value > 3,
      },
      {
        label: "Найти пользователя",
        to: { name: "userFilter" },
      },
      {
        label: "Все пользователи",
        to: { name: "userAll" },
      },
    ],
    visible: () => clientRole.value > 1,
  },
  {
    label: "Организация",
    items: [
      {
        label: "Создать организацию",
        to: { name: "organizationCreate" },
        visible: () => clientRole.value > 2,
      },
      {
        label: "Найти организацию",
        to: { name: "organizationFilter" },
      },
      {
        label: "Все организации",
        to: { name: "organizationAll" },
      },
    ],
    visible: () => clientRole.value > 1,
  },
  {
    label: "Области работ",
    items: [
      {
        label: "Создать область",
        to: { name: "areaCreate" },
        visible: () => clientRole.value > 2,
      },
      {
        label: "Найти область",
        to: { name: "areaFilter" },
      },
      {
        label: "Все области",
        to: { name: "areaAll" },
      },
    ],
    visible: () => clientRole.value > 1,
  },

  {
    label: "Категории",
    items: [
      {
        label: "Создать категорию",
        to: { name: "categoryCreate" },
        visible: () => clientRole.value > 2,
      },
      {
        label: "Найти категорию",
        to: { name: "categoryFilter" },
      },
      {
        label: "Все категории",
        to: { name: "categoryAll" },
      },
    ],
    visible: () => clientRole.value > 1,
  },

  {
    label: "Статусы",
    items: [
      {
        label: "Создать статус",
        to: { name: "statusCreate" },
        visible: () => clientRole.value > 2,
      },
      {
        label: "Найти статус",
        to: { name: "statusFilter" },
      },
      {
        label: "Все статусы",
        to: { name: "statusAll" },
      },
    ],
    visible: () => clientRole.value > 1,
  },
  {
    label: "Приоритеты",
    items: [{ label: "Все приоритеты", to: { name: "priorityAll" } }],
    visible: () => clientRole.value > 1,
  },
  {
    label: "Пути выполнения",
    items: [
      {
        label: "Создать путь",
        to: { name: "wayCreate" },
        visible: () => clientRole.value > 2,
      },
      {
        label: "Найти путь",
        to: { name: "wayFilter" },
      },
      {
        label: "Все пути",
        to: { name: "wayAll" },
      },
    ],
    visible: () => clientRole.value > 1,
  },

  {
    label: "Система",
    items: [
      {
        label: "Системные настройки",
        to: { name: "system" },
      },
    ],
    visible: () => clientRole.value > 3,
  },

  { separator: true },
];

const folders = computed(() => [
  {
    label: "Управление папками",
    items: [
      { label: "Создать папку", to: { name: "folderCreate" } },
      { label: "Все папки", to: { name: "folderAll" } },
    ],
    visible: () => clientRole.value > 1,
  },
  { separator: true, visible: () => clientRole.value > 1 },
  ...userFolders.value,
]);

const toggle = (event) => {
  menu.value.toggle(event);
};

const onWidthChange = () => (widthWindow.value = window.innerWidth);

onMounted(() => window.addEventListener("resize", onWidthChange));

onUnmounted(() => window.removeEventListener("resize", onWidthChange));
</script>

<style>
.sidebar {
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  z-index: 1;
  border-right: 1px solid #ccc;
}

.p-tieredmenu {
  border: 0px;
}

.p-submenu-list {
  border-radius: 5px;
}
</style>
