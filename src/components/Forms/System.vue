<template>
  <Form :url="url" :object="state" :redirect="{ name: 'system' }">
    <template #main>
      <div class="flex-form-column">
        <h5>Статус при создании заявки</h5>
        <Dropdown placeholder="Выберите статус" v-model="state.openId" :options="statuses" optionLabel="name" optionValue="id" filter> </Dropdown>
        <h5>Статус при закрытии заявки</h5>
        <Dropdown placeholder="Выберите статус" v-model="state.closeId" :options="statuses" optionLabel="name" optionValue="id" filter> </Dropdown>
        <h5>Статус при отклонении заявки</h5>
        <Dropdown placeholder="Выберите статус" v-model="state.rejectId" :options="statuses" optionLabel="name" optionValue="id" filter> </Dropdown>
      </div>
      <h5>Разрешенные почтовые сервисы</h5>
      <div class="flex-form">
        <Button class="p-button-raised" label="Настроить" @click="displayEmails = true"></Button>
      </div>

      <Dialog header="Разрешенные почтовые сервисы" v-model:visible="displayEmails" :style="{ width: '30vw' }" :modal="true">
        <div class="flex-form-between">
          <h5>Сервисы</h5>
          <Button class="p-button-sm p-button-raised" icon="pi pi-plus" @click="AddEmail()"></Button>
        </div>
        <Table :items="state.emails">
          <template #columns>
            <Column field="name" header="Наименование">
              <template #body="{ data }">
                <InputText v-model="data.name" placeholder="@..."></InputText>
              </template>
            </Column>
            <Column header="Управление">
              <template #body="{ data, index }">
                <Button class="p-button-sm p-button-raised p-button-danger" icon="pi pi-times" @click="DeleteEmail(index)" />
              </template>
            </Column>
          </template>
        </Table>
        <template #footer>
          <Button class="p-button-raised" label="Закрыть" icon="pi pi-check" @click="displayEmails = false" />
        </template>
      </Dialog>
    </template>
  </Form>
</template>

<script setup>
import { reactive, ref } from "vue";
import Form from "./Form.vue";
import Table from "../Tables/TableForm.vue";
const url = "/system";

const props = defineProps({
  statuses: Object,
  state: {
    type: Object,
    default: {},
  },
});

let state = reactive({
  openId: null,
  closeId: null,
  emails: [],
});

if (Object.keys(props.state).length != 0) {
  state = reactive(props.state);
}

const AddEmail = () => {
  state.emails.push({ name: null });
};

const DeleteEmail = (index) => {
  state.emails.splice(index, 1);
};

const displayEmails = ref(false);
</script>
