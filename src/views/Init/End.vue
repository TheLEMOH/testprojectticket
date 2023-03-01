<template>
  <Card style="width: 50rem">
    <template #title>Статусы</template>
    <template #content>
      <template v-if="!exist">
        <p>Данные статусы сгенирированы системой. Начальную генерацию статусов можно задать на сервере по шаблону. Заполните статусы ниже.</p>
        <h5>Статус при создании заяки</h5>
        <Dropdown placeholder="Выберите статус" v-model="state.openId" :options="statuses" optionLabel="name" optionValue="id" filter> </Dropdown>
        <h5>Статус при закрытии заяки</h5>
        <Dropdown placeholder="Выберите статус" v-model="state.closeId" :options="statuses" optionLabel="name" optionValue="id" filter> </Dropdown>
        <h5>Статус при отклонении заяки</h5>
        <Dropdown placeholder="Выберите статус" v-model="state.rejectId" :options="statuses" optionLabel="name" optionValue="id" filter> </Dropdown>
        <Divider></Divider>
        <p>Нажмите "Далее", чтобы завершить начальную настройку программы.</p></template
      >
      <template v-else> Система инициализирована </template>
    </template>
  </Card>

  <div class="steps-button">
    <Button class="p-button-raised" label="Назад" @click="emits('prevPage')"></Button>
    <Button class="p-button-raised" label="Далее" @click="NextPage()" :disabled="v.$invalid"></Button>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { Get, Put } from "../../scripts/fetch";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useRouter } from "vue-router";

const rules = {
  openId: { required },
  closeId: { required },
  rejectId: { required },
};

const system = await Get("/init/system");
const statuses = await Get("/init/statuses");

const router = useRouter();

let state = reactive(JSON.parse(JSON.stringify(system)));

const emits = defineEmits(["prevPage", "nextPage"]);

const exist = computed(() => {
  return system.init;
});

const NextPage = async () => {
  if (!exist.value) {
    state.init = true;
    const res = await Put("/init/system", state);

    if (res.ok) {
      router.push({ name: "login" });
    }
  } else {
    router.push({ name: "login" });
  }
};

const v = useVuelidate(rules, state);
</script>
