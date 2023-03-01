<template>
  <Card style="width: 50rem">
    <template #title>Создание пользователя</template>
    <template #content>
      <template v-if="!exist">
        <p>Добавьте первого пользователя. Данный пользователь будет создан с правами администратора. Пользователя можно изменить в личном кабинете или в меню пользователей, после инициализации системы.</p>
        <h5>ФИО</h5>
        <div class="flex-form-column">
          <InputText v-model="state.surname" placeholder="Фамилия *"></InputText>
          <InputText v-model="state.name" placeholder="Имя *"></InputText>
          <InputText v-model="state.patronymic" placeholder="Отчество *"></InputText>
        </div>

        <Divider></Divider>

        <h5>Дополнительные данные</h5>
        <div class="flex-form-column">
          <Dropdown v-model="state.organizationId" :options="organizations" optionLabel="name" optionValue="id" :filter="true" placeholder="Организация *" @change="SetAddress"> </Dropdown>
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
        <PasswordComponent @change="InputPass"></PasswordComponent>
        <Divider></Divider>

        <h5>Система</h5>
        <div class="flex-form-column">
          <Dropdown placeholder="Роль" v-model="state.roleId" :options="roles" optionLabel="name" optionValue="id" :filter="true" :disabled="true"></Dropdown>
        </div>

        <div class="flex-form">
          <div class="field-checkbox">
            <Checkbox v-model="state.isEmployee" inputId="emp1" name="emp" :binary="true" :disabled="true" />
            <label for="emp1">Является исполнителем</label>
          </div>
        </div></template
      >
      <template v-else>Пользователь создан</template>
    </template>
  </Card>

  <div class="steps-button">
    <Button class="p-button-raised" label="Назад" @click="emits('prevPage')"></Button>
    <Button class="p-button-raised" label="Далее" @click="NextPage()" :disabled="v.$invalid && !exist"></Button>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { Get, Post } from "../../scripts/fetch";
import { required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import PasswordComponent from "../../components/Forms/Password/PasswordComponent.vue";

const regexPass = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

const rolePass = helpers.regex(regexPass);

const users = await Get("/init/users");
const organizations = await Get("/init/organizations");
const roles = await Get("/init/roles");

const admin = roles.find((r) => r.name == "Администратор");

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

let state = reactive({
  password: null,
  name: null,
  surname: null,
  patronymic: null,
  organizationId: null,
  roleId: admin.id,
  subdivision: null,
  position: null,
  address: null,
  cabinet: null,
  phone: null,
  phoneWork: null,
  email: null,
  isEmployee: true,
});

const SetAddress = (event) => {
  const id = event.value;
  const org = organizations.find((org) => org.id == id);
  state.address = org.address;
};

const InputPass = (event) => {
  state.password = event.target.value;
};

const exist = computed(() => {
  if (users.length > 0) return true;
  else return false;
});

const NextPage = async () => {
  if (!exist.value) {
    const res = await Post("/init/users", state);

    if (res.ok) {
      emits("nextPage");
    }
  } else {
    emits("nextPage");
  }
};

const emits = defineEmits(["prevPage", "nextPage"]);

const v = useVuelidate(rules, state);
</script>
