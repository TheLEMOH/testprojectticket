<template>
  <Form :url="url" :object="state" :invalid="v.$invalid" :redirect="redirect" :typePage="typePage">
    <template #main>
      <h5>ФИО</h5>
      <div class="flex-form-column">
        <InputText v-model="state.surname" placeholder="Фамилия *"></InputText>
        <InputText v-model="state.name" placeholder="Имя *"></InputText>
        <InputText v-model="state.patronymic" placeholder="Отчество *"></InputText>
      </div>

      <Divider></Divider>

      <h5>Дополнительные данные</h5>
      <div class="flex-form-column">
        <Dropdown v-model="state.organizationId" :options="props.organizations" optionLabel="name" optionValue="id" :filter="true" placeholder="Организация *" @change="SetAddress"> </Dropdown>
        <InputText v-model="state.subdivision" placeholder="Подразделение *"></InputText>
        <InputText v-model="state.position" placeholder="Должность *"></InputText>
        <InputText v-model="state.address" placeholder="Адрес *"></InputText>
        <InputText v-model="state.cabinet" placeholder="Кабинет *"></InputText>
      </div>

      <Divider></Divider>

      <h5>Контактные данные</h5>
      <div class="flex-form-column">
        <InputMask v-model="state.phone" placeholder="Личный телефон" mask="+7(999) 999 99 99"> </InputMask>
        <InputMask v-model="state.phoneWork" placeholder="Рабочий телефон" mask="+7(999) 999 99 99"> </InputMask>
        <InputText v-model="state.email" placeholder="Почта *"></InputText>
      </div>

      <Divider></Divider>

      <h5>Пароль</h5>
      <Button class="p-button-warning p-button-raised" label="Сменить пароль" @click="display = true" />

      <Divider></Divider>

      <h5>Система</h5>
      <div class="flex-form-column">
        <Dropdown placeholder="Область работ"></Dropdown>
        <Dropdown placeholder="Роль" v-model="state.roleId" :options="props.roles" optionLabel="name" optionValue="id" :filter="true"></Dropdown>
      </div>

      <div class="flex-form">
        <div class="field-checkbox">
          <Checkbox v-model="state.isEmployee" inputId="emp1" name="emp" :binary="true" />
          <label for="emp1">Является исполнителем</label>
        </div>
      </div>

      <Divider></Divider>

      <h5>Папки</h5>

      <MultiSelect v-model="state.foldersId" :options="folders" optionLabel="name" optionValue="id" placeholder="Выберите папки" filter></MultiSelect>

      <Divider></Divider>

      <Dialog header="Смена пароля" v-model:visible="display" :maximizable="true" :modal="true">
        <PasswordComponent @change="InputPass"></PasswordComponent>
        <template #footer>
          <Button class="p-button-text" label="Закрыть" @click="display = false" />
          <Button class="p-button-raised" label="Сменить пароль" :disabled="vPass.password.$invalid" @click="ChangePass" />
        </template>
      </Dialog>
    </template>
  </Form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { required, minLength, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Form from "./Form.vue";
import PasswordComponent from "./Password/PasswordComponent.vue";
import { Put } from "../../scripts/fetch";
const url = "/users";
const redirect = { name: "userAll" };

const rules = {
  surname: { required },
  name: { required },
  patronymic: { required },
  organizationId: { required },
  subdivision: { required },
  position: { required },
  address: { required },
  cabinet: { required },
  email: { required },
};

const regexPass = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

const rolePass = helpers.regex(regexPass);

const rulesPass = {
  password: { required, rolePass },
};

const props = defineProps({
  organizations: Array,
  folders: Array,
  roles: Array,
  typePage: {
    type: String,
    default: "create",
  },
  state: {
    type: Object,
    default: {},
  },
});

const display = ref(false);
const password = ref(null);

let state = reactive({
  name: null,
  surname: null,
  patronymic: null,
  organizationId: null,
  roleId: null,
  subdivision: null,
  position: null,
  address: null,
  cabinet: null,
  phone: null,
  phoneWork: null,
  email: null,
  isEmployee: false,
  foldersId: null,
});

if (Object.keys(props.state).length != 0) {
  state = reactive(props.state);
}

const v = useVuelidate(rules, state);
const vPass = useVuelidate(rulesPass, { password });

const SetAddress = (event) => {
  const id = event.value;
  const org = props.organizations.find((org) => org.id == id);
  state.address = org.address;
};

const InputPass = (event) => {
  password.value = event.target.value;
};

const ChangePass = async () => {
  await Put(url, { id: state.id, password: password.value });
};
</script>

<style></style>
