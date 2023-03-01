<template>
  <Card style="width: 50rem">
    <template #title>Создание организации</template>
    <template #content>
      <template v-if="!exist">
        <p>Добавьте первую организацию. Данная организация будет является головной по-умолчанию. После настройки системы это можно изменить в меню организаций.</p>
        <InputText v-model="state.shortName" placeholder="Сокращенное наименование *"></InputText>
        <InputText v-model="state.name" placeholder="Наименование *"></InputText>
        <InputText v-model="state.address" placeholder="Адрес *"></InputText>
      </template>
      <template v-else> Организация добавлена </template>
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
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const organization = await Get("/init/organizations");

const exist = computed(() => {
  if (organization.length > 0) return true;
  else return false;
});

const rules = {
  shortName: { required },
  name: { required },
  address: { required },
};

let state = reactive({
  shortName: null,
  name: null,
  address: null,
  isHead: true,
});

const NextPage = async () => {
  if (!exist.value) {
    const res = await Post("/init/organizations", state);

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
