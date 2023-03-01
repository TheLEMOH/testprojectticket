<template>
  <Form :url="url" :object="state" :invalid="v.$invalid" :redirect="redirect" :typePage="typePage">
    <template #main>
      <h5>Регистрация пользователя</h5>

      <Divider></Divider>

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
        <InputText v-model="state.email" placeholder="Почта *" autocomplete="off"></InputText>
      </div>

      <Divider></Divider>

      <h5>Пароль</h5>
      <PasswordComponent @change="InputPass"></PasswordComponent>

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
    </template>
  </Form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Form from "./Form.vue";
import PasswordComponent from "./Password/PasswordComponent.vue";

const url = "/users";
const redirect = { name: "userAll" };

const regexPass = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

const rolePass = helpers.regex(regexPass);

const rules = {
  password: { required, rolePass },
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

const props = defineProps({
  organizations: Array,
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

let state = reactive({
  password: null,
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
});

if (Object.keys(props.state).length != 0) {
  state = reactive(props.state);
}

const v = useVuelidate(rules, state);

const SetAddress = (event) => {
  const id = event.value;
  const org = props.organizations.find((org) => org.id == id);
  state.address = org.address;
};

const InputPass = (event) => {
  state.password = event.target.value;
};
</script>

<style></style>
