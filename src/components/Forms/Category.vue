<template>
  <Form :url="url" :object="state" :invalid="v.$invalid" :redirect="redirect" :typePage="typePage">
    <template #main>
      <h5>Данные о категории</h5>
      <div class="flex-form-column">
        <InputText v-model="state.name" placeholder="Наименование *"></InputText>
      </div>

      <Textarea v-model="state.description" placeholder="Описание" rows="5"></Textarea>

      <Divider></Divider>

      <h5>Система</h5>

      <div class="flex-form-column">
        <Dropdown v-model="state.priorityId" :options="props.priorities" optionLabel="name" optionValue="id" :filter="true" placeholder="Приоритет *"></Dropdown>
        <Dropdown v-model="state.wayId" :options="props.ways" optionLabel="name" optionValue="id" :filter="true" placeholder="Путь *"></Dropdown>
      </div>

      <div class="field-checkbox">
        <Checkbox v-model="state.disabledEditor" inputId="editor" name="editor" binary />
        <label for="editor">Отключить текстовый редактор</label>
      </div>

      <Divider></Divider>

      <div class="flex-form-between">
        <h5>Дополнительные поля</h5>
        <Button class="p-button-sm p-button-raised" icon="pi pi-plus" @click="OpenCreate()"></Button>
      </div>

      <Table :items="state.fields">
        <template #columns>
          <Column field="id" header="Идентификатор"></Column>
          <Column field="name" header="Наименование"></Column>
          <Column field="type" header="Тип"></Column>
          <Column header=" ">
            <template #body="{ data, index }">
              <Button class="p-button-sm p-button-raised" icon="pi pi-pencil" @click="[SelectField(data), OpenEdit()]" />
              <Button class="p-button-sm p-button-danger p-button-raised" icon="pi pi-times" @click="[DeleteField(index)]" />
            </template>
          </Column>
        </template>
      </Table>

      <Dialog header="Настройка поля" v-model:visible="displaySettings" :modal="true" :maximizable="true">
        <h5>Данные поля</h5>

        <div class="flex-form">
          <InputText placeholder="Идентификатор поля" v-model="selectedField.id"></InputText>
          <InputText placeholder="Наименование поля" v-model="selectedField.name"></InputText>
          <Dropdown placeholder="Тип поля" v-model="selectedField.type" :options="types" optionLabel="label" optionValue="value"> </Dropdown>
        </div>
        <div class="field-checkbox">
          <Checkbox v-model="selectedField.required" inputId="required" name="required" binary />
          <label for="required">Обязательное поле</label>
        </div>

        <p>Заполните таблицу для поля типа "Выбор"</p>
        <div class="flex-form-between">
          <h5>Список</h5>
          <Button class="p-button-sm p-button-raised" icon="pi pi-plus" :disabled="selectedField.type != 'Dropdown'" @click="AddValue" />
        </div>

        <Table :items="selectedField.list" :search="false" :editMode="'cell'" @edit-cell="EditCell">
          <template #columns>
            <Column field="id" header="Идентификатор">
              <template #editor="{ data, field }">
                <InputText v-model="data[field]" autofocus />
              </template>
            </Column>
            <Column field="name" header="Наименование">
              <template #editor="{ data, field }">
                <InputText v-model="data[field]" autofocus />
              </template>
            </Column>
            <Column header=" ">
              <template #body="{ data, index }">
                <Button class="p-button-sm p-button-danger p-button-raised" icon="pi pi-times" @click="DeleteValue(index)" />
              </template>
            </Column>
          </template>
        </Table>

        <template #footer>
          <Button label="Добавить" class="p-button-raised" @click="[AddField(), Close()]" :disabled="DisableAddButton()" v-if="typeModal == 'create'" />
          <Button label="Закрыть" class="p-button-raised" @click="[Close()]" :disabled="DisableAddButton()" v-if="typeModal == 'edit'" />
        </template>
      </Dialog>
    </template>
  </Form>
</template>

<script setup>
import Form from "./Form.vue";
import Table from "../Tables/TableForm.vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { ref, reactive } from "vue";

let displaySettings = ref(false);

const props = defineProps({
  typePage: {
    type: String,
    default: "create",
  },
  state: {
    type: Object,
    default: {},
  },
  ways: Array,
  priorities: Array,
});

const url = "/categories";
const redirect = { name: "categoryAll" };

const rules = {
  name: { required },
  wayId: { required },
  priorityId: { required },
};

let state = reactive({
  name: null,
  wayId: null,
  priorityId: null,
  description: null,
  disabledEditor: false,
  fields: [],
});

if (Object.keys(props.state).length != 0) {
  state = reactive(props.state);
}

const v = useVuelidate(rules, state);

let selectedField = ref({
  id: null,
  name: null,
  type: null,
  required: false,
  list: [],
});

const typeModal = ref(null);

const types = [
  {
    label: "Текст",
    value: "InputText",
  },
  {
    label: "Выбор",
    value: "Dropdown",
  },
  {
    label: "Флажок",
    value: "Checkbox",
  },
];

/* Редактирования полей */

const AddField = () => {
  const f = JSON.parse(JSON.stringify(selectedField.value));
  state.fields.push(f);
};

const SelectField = (field) => {
  selectedField.value = field;
};

const DeleteField = (index) => {
  state.fields.splice(index, 1);
};

/* Редактирование списка */

const AddValue = () => {
  selectedField.value.list.push({
    id: "Новое поле",
    name: "Новое поле",
  });
};

const DeleteValue = (index) => {
  selectedField.value.list.splice(index, 1);
};

const EditCell = (event) => {
  let { data, newValue, field } = event;
  data[field] = newValue;
};

/* Модальное окно */

const OpenCreate = () => {
  displaySettings.value = true;
  typeModal.value = "create";
  selectedField.value = {
    id: null,
    name: null,
    type: null,
    list: [],
  };
};

const OpenEdit = () => {
  displaySettings.value = true;
  typeModal.value = "edit";
};

const Close = () => {
  displaySettings.value = false;
};

/* Управление формой */

const DisableAddButton = () => {
  const cId = selectedField.value.id == null || selectedField.value.id == "";
  const cName = selectedField.value.name == null || selectedField.value.name == "";
  const cType = selectedField.value.type == null || selectedField.value.type == "";
  const cList = selectedField.value.type == "Dropdown" && selectedField.value.list.length == 0;

  if (cId || cName || cType || cList) {
    return true;
  } else {
    return false;
  }
};
</script>

<style scoped>
.p-datatable {
  height: 300px;
  overflow-y: auto;
}
</style>
