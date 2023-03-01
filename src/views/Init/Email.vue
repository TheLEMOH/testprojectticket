<template>
  <Card style="width: 50rem">
    <template #title>Создание первой почты</template>
    <template #content>
      <template v-if="!exist">
        <p>Добавьте первый домен почты. Только с разрешенных доменов пользователи имеют право регистрироваться и заходит в систему. После настройки системы откроется меню почтовых доменов.</p>
        <InputText v-model="state.emails[0].name" placeholder="@..."></InputText
      ></template>
      <template v-else>Почта добавлена</template>
    </template>
  </Card>

  <div class="steps-button">
    <Button class="p-button-raised" label="Назад" @click="emits('prevPage')"></Button>
    <Button class="p-button-raised" label="Далее" @click="NextPage()" :disabled="!state.emails[0].name && !exist"></Button>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { Get, Put } from "../../scripts/fetch";

const system = await Get("/init/system");

let state = reactive(JSON.parse(JSON.stringify(system)));
state.emails.push({ name: null });

const exist = computed(() => {
  if (system.emails.length > 0) return true;
  else return false;
});

const NextPage = async () => {
  if (!exist.value) {
    const res = await Put("/init/system", state);

    if (res.ok) {
      emits("nextPage");
    }
  } else {
    emits("nextPage");
  }
};

const emits = defineEmits(["prevPage", "nextPage"]);
</script>
