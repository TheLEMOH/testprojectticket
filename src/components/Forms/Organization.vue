<template>
  <Form :url="url" :invalid="v.$invalid" :object="state" :redirect="redirect" :typePage="typePage">
    <template #main>
      <h5>Данные об Организации</h5>
      <div class="flex-form-column">
        <InputText v-model="state.shortName" placeholder="Сокращенное наименование *"></InputText>
        <InputText v-model="state.name" placeholder="Наименование *"></InputText>
        <InputText v-model="state.address" placeholder="Адрес *"></InputText>
      </div>

      <Divider></Divider>

      <h5>Система</h5>

      <div class="field-checkbox">
        <Checkbox v-model="state.isHead" inputId="head" name="head" :binary="true" />
        <label for="head">Головная организация</label>
      </div>

      <Divider></Divider>
    </template>
  </Form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Form from "./Form.vue";

const url = "/organizations";
const redirect = { name: "organizationAll" };

const rules = {
  shortName: { required },
  name: { required },
  address: { required },
};

const props = defineProps({
  organizations: Array,
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
  shortName: null,
  name: null,
  address: null,
  isHead: false,
});

if (Object.keys(props.state).length != 0) {
  state = reactive(props.state);
}

const v = useVuelidate(rules, state);
</script>

<style></style>
