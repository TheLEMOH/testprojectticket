<template>
  <div class="steps">
    <Card style="width: 50rem">
      <template #content>
        <Steps :model="items"></Steps>
      </template>
    </Card>
    <router-view v-slot="{ Component }" @prevPage="PrevPage" @nextPage="NextPage">
      <Suspense>
        <template #default>
          <component :is="Component" />
        </template>
      </Suspense>
    </router-view>
  </div>
</template>

<script setup>
import Steps from "primevue/steps";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const items = [
  {
    label: "Старт",
    to: { name: "init" },
  },
  {
    label: "Организация",
    to: { name: "initOrganization" },
  },
  {
    label: "Почта",
    to: { name: "initEmail" },
  },
  {
    label: "Пользователь",
    to: { name: "initUser" },
  },
  {
    label: "Завершение",
    to: { name: "initEnd" },
  },
];

const PrevPage = () => {
  const index = route.meta.index;
  router.push(items[index - 1].to);
};

const NextPage = () => {
  const index = route.meta.index;
  router.push(items[index + 1].to);
};
</script>

<style>
.steps p {
  margin: 0;
}

.steps-button {
  display: flex;
  justify-content: end;
  width: 50rem;
}

.steps {
  padding: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
}
</style>
