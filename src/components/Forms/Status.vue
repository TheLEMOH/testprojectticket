<template>
  <Form :url="url" :invalid="v.$invalid" :object="state" :redirect="redirect" :typePage="typePage">
    <template #main>
      <h5>Данные о статусе</h5>
      <p>
        "Наименование" необходимо для отображения в списках выбора. "Внутреннее наименование" оторабражается только исполнителям (Диспетчерам, исполнителям и администраторам). "Внешнее наименование" отображается остальным пользователем
        системы.
      </p>
      <h5>Наименование</h5>
      <div class="flex-form-column">
        <InputText v-model="state.name" placeholder="Наименование *"></InputText>
      </div>
      <h5>Внутреннее наименование</h5>
      <div class="flex-form-column">
        <InputText v-model="state.nameForInternalUsers" placeholder="Наименование *"></InputText>
      </div>

      <h5>Внешнее наименование</h5>
      <div class="flex-form-column">
        <InputText v-model="state.nameForExternalUsers" placeholder="Наименование *"></InputText>
      </div>
    </template>
  </Form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Form from "./Form.vue";

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

const url = "/statuses";
const redirect = { name: "statusAll" };

const rules = {
  name: { required },
  nameForInternalUsers: { required },
  nameForExternalUsers: { required },
};

let state = reactive({
  name: null,
  nameForInternalUsers: null,
  nameForExternalUsers: null,
});

if (Object.keys(props.state).length != 0) {
  state = reactive(props.state);
}

const v = useVuelidate(rules, state);
</script>

<style scoped></style>
