<template>
  <Form :url="url" :invalid="v.$invalid" :object="state" :redirect="redirect" :typePage="typePage">
    <template #main>
      <h5>Данные о папке</h5>
      <div class="flex-form">
        <InputText v-model="state.name" placeholder="Наименование"></InputText>
      </div>
      <Textarea v-model="state.description" placeholder="Описание" rows="5" cols="30"></Textarea>

      <Divider></Divider>

      <div class="flex-form">
        <Button class="p-button-raised" label="Настроить фильтр" @click="display = true"></Button>
      </div>

      <Dialog v-model:visible="display" modal style="width: 25rem" header="Настройка фильтра">
        <div class="folder-filter">
          <Dropdown v-model="state.filter.creatorId" :options="users" optionLabel="name" optionValue="id" filter placeholder="Создатель" showClear></Dropdown>
          <Dropdown v-model="state.filter.executorId" :options="employees" optionLabel="name" optionValue="id" filter placeholder="Исполнитель" showClear> </Dropdown>
          <Dropdown v-model="state.filter.categoryId" :options="categories" optionLabel="name" optionValue="id" filter placeholder="Категория" showClear> </Dropdown>
          <Dropdown v-model="state.filter.statusId" :options="statuses" optionLabel="name" optionValue="id" filter placeholder="Статус" showClear></Dropdown>
          <Dropdown v-model="state.filter.wayId" :options="ways" optionLabel="name" optionValue="id" filter placeholder="Путь" showClear> </Dropdown>
          <Dropdown v-model="state.filter.priorityId" :options="priorities" optionLabel="name" optionValue="id" filter placeholder="Приоритет" showClear> </Dropdown>
        </div>
        <template #footer>
          <Button class="p-button-raised" label="Закрыть" @click="display = false" />
        </template>
      </Dialog>
    </template>
  </Form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import { Get } from "../../scripts/fetch";

import Form from "./Form.vue";

const users = await Get("/users");
const employees = await Get("/users/employees");
const categories = await Get("/categories");
const statuses = await Get("/statuses");
const ways = await Get("/ways");
const priorities = await Get("/priorities");

const props = defineProps({
  typePage: {
    type: String,
    default: "create",
  },
  state: {
    type: Object,
    default: {},
  },
});

const url = "/folders";
const redirect = { name: "folderAll" };

const rules = {
  name: { required },
  description: { required },
};

let state = reactive({
  name: null,
  description: null,
  filter: { creatorId: null, executorId: null, categoryId: null, statusId: null, wayId: null, priorityId: null },
});

const display = ref(false);

if (Object.keys(props.state).length != 0) {
  state = reactive(props.state);
}

const v = useVuelidate(rules, state);
</script>

<style>
.folder-filter {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}
</style>
