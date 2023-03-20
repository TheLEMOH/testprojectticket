<template>
  <Form :object="object" :invalid="v.$invalid" :url="url" :redirect="redirect" :typePage="props.typePage">
    <template #main>
      <h5>Основные данные</h5>
      <div class="flex-form-column">
        <InputText v-model="state.name" placeholder="Наименование *"></InputText>
      </div>
      <Textarea v-model="state.description" placeholder="Описание" rows="5"></Textarea>

      <Divider></Divider>

      <div class="flex-form-between">
        <h5>Организации</h5>
        <Button class="p-button-sm p-button-raised" icon="pi pi-plus" @click="displayOrg = true" />
      </div>

      <Table :items="state.organizations" @reorder="ReorderOrg">
        <template #columns>
          <Column :rowReorder="true" headerStyle="width: 3rem" :reorderableColumn="false" />
          <Column field="shortName" header="Сокращение"></Column>
          <Column field="isHead" header="Головная организация">
            <template #body="{ data }">
              <Checkbox v-model="data.isHead" disabled binary />
            </template>
          </Column>
          <Column header="">
            <template #body="{ data, index }">
              <Button class="p-button-sm p-button-raised" icon="pi pi-pencil" @click="[(displaySettings = true), SelecteOrg(data)]" />
              <Button class="p-button-sm p-button-danger p-button-raised" icon="pi pi-times" @click="DeleteOrg(data, index)" />
            </template>
          </Column>
        </template>
      </Table>

      <Dialog header="Выбор организации" v-model:visible="displayOrg" :modal="true" :maximizable="true">
        <Table :items="organizations">
          <template #columns>
            <Column field="shortName" header="Сокращение"></Column>
            <Column field="name" header="Наименование"></Column>
            <Column field="isHead" header="Головная организация">
              <template #body="{ data }">
                <Checkbox v-model="data.isHead" disabled binary />
              </template>
            </Column>
            <Column header="">
              <template #body="{ data }">
                <Button class="p-button-sm p-button-raised" icon="pi pi-plus" @click="AddOrg(data)" :disabled="Disabled(data)" />
              </template>
            </Column>
          </template>
        </Table>

        <template #footer>
          <Button label="Закрыть" icon="pi pi-times" @click="displayOrg = false" />
        </template>
      </Dialog>

      <Dialog header="Настройка пути" v-model:visible="displaySettings" :modal="true" :maximizable="true">
        <div class="flex-form">
          <div class="emp">
            <h5>Существующие сотрудники</h5>
            <Table :items="employees">
              <template #columns>
                <Column header="ФИО">
                  <template #body="{ data }"> {{ data.surname }} {{ data.name }} {{ data.patronymic }} </template>
                </Column>
                <Column field="organization.shortName" header="Сокращение"></Column>
                <Column header="">
                  <template #body="{ data }">
                    <Button class="p-button-sm p-button-raised" icon="pi pi-plus" @click="AddStep(data)" />
                  </template>
                </Column>
              </template>
            </Table>
          </div>
          <Divider layout="vertical" />
          <div class="emp">
            <h5>Выбранные сотрудники</h5>
            <Table :items="selectOrg.steps ? selectOrg.steps : []" @reorder="ReorderEmp">
              <template #columns>
                <Column :rowReorder="true" headerStyle="width: 3rem" :reorderableColumn="false" />
                <Column header="ФИО">
                  <template #body="{ data }"> {{ data.user.surname }} {{ data.user.name }} {{ data.user.patronymic }} </template>
                </Column>
                <Column field="user.organization.shortName" header="Сокращение"></Column>
                <Column header="Описание работ">
                  <template #body="{ data }">
                    <Textarea v-model="data.description" class="p-button-sm p-button-raised" cols="50" />
                  </template>
                </Column>
                <Column header="">
                  <template #body="{ data, index }">
                    <Button class="p-button-sm p-button-danger p-button-raised" icon="pi pi-times" @click="DeleteStep(data, index)" />
                  </template>
                </Column>
              </template>
            </Table>
          </div>
        </div>

        <template #footer>
          <Button label="Закрыть" class="p-button-raised" icon="pi pi-times" @click="displaySettings = false" />
        </template>
      </Dialog>
    </template>
  </Form>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Form from "./Form.vue";

import Table from "../Tables/TableForm.vue";

const props = defineProps({
  organizations: Array,
  employees: Array,
  typePage: {
    type: String,
    default: "create",
  },
  state: {
    type: Object,
    default: {},
  },
});

const url = "/ways";

const redirect = { name: "wayAll" };

const rules = {
  name: { required },
};

let state = reactive({
  name: null,
  description: null,
  organizations: [],
  delete: [],
});

if (Object.keys(props.state).length != 0) {
  state = reactive(props.state);
  state.delete = [];
}

const v = useVuelidate(rules, state);

let selectOrg = null;

const displayOrg = ref(false);
const displaySettings = ref(false);

const ReorderOrg = (event) => {
  state.organizations = event.value;
};

const ReorderEmp = (event) => {
  event.value.forEach((s, index) => {
    s.stepNumber = index;
  });
  selectOrg.steps = event.value;
};

const AddOrg = (org) => {
  const addedOrg = JSON.parse(JSON.stringify(org));
  addedOrg.steps = [];
  state.organizations.push(addedOrg);
};

const AddStep = (user) => {
  const organizationId = selectOrg.id;
  const steps = selectOrg.steps;
  const stepNumber = steps.length;
  const step = { user, organizationId, stepNumber };
  steps.push(step);
};

const SelecteOrg = (org) => {
  selectOrg = org;
};

const DeleteOrg = (org, index) => {
  org.steps.forEach((s) => {
    state.delete.push(s);
  });

  state.organizations.splice(index, 1);
};

const DeleteStep = (step, index) => {
  state.delete.push(step);
  selectOrg.steps.splice(index, 1);
};

const Disabled = (org) => {
  const index = state.organizations.findIndex((o) => o.id == org.id);
  const disabled = index != -1 ? true : false;
  return disabled;
};

const object = computed(() => {
  const steps = [];

  state.organizations.forEach((org) => {
    org.steps.forEach((s, index) => {
      steps.push({
        id: s.id,
        userId: s.user.id,
        organizationId: s.organizationId,
        stepNumber: index,
        description: s.description,
      });
    });
  });

  const organizations = state.organizations.map((o) => o.id);

  const deleteSteps = state.delete.map((d) => d.id);

  const way = {
    id: state.id,
    name: state.name,
    description: state.description,
    steps,
    deleteSteps,
    organizations,
  };
  return way;
});
</script>

<style scoped>
.p-datatable {
  overflow-y: auto;
}

.emp {
  width: 100%;
  flex: 1 0;
}
</style>
