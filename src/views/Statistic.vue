<template>
  <div class="statistic">
    <template v-for="folder in statistic">
      <Card v-for="data in folder.data" style="width: 25rem">
        <template #title>
          {{ data.name }}
        </template>
        <template #content>
          <div class="statistic-field" @click="Redirect(data.filter)">
            <span> Всего заявок: </span> <strong>{{ data.all }}</strong>
          </div>
          <div class="statistic-field" @click="Redirect(data.filterOpenDay)">
            <span> Открытых заявок: </span> <strong>{{ data.open }}</strong>
          </div>
          <div class="statistic-field" @click="Redirect(data.filter)">
            <span> Закрытых заявок: </span> <strong>{{ data.close }}</strong>
          </div>
        </template>
      </Card>
      <Divider></Divider>
    </template>
  </div>
</template>

<script setup>
import { Get } from "../scripts/fetch";
import { reactive, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const url = "/statistic";

const router = useRouter();

let statistic = [];

const store = useStore();
const client = computed(() => store.getters.client);
const userId = computed(() => (client.value ? client.value.id : null));

if (userId) {
  const searchParams = { userId: userId.value };
  statistic = reactive(await Get(url, { searchParams }));
}

const Redirect = (filter) => {
  router.push({ name: "ticketTableFilter", query: filter });
};

watch(userId, async () => {
  statistic = reactive(await Get(url, { searchParams }));
});
</script>

<style>
.statistic {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}

.statistic-field {
  display: flex;
  padding: 0.2rem;
  border-radius: 6px;
}

.statistic-field:hover {
  cursor: pointer;
  background: var(--primary-500);
  color: white;
}

.statistic-field span {
  width: 150px;
}

.statistic .p-card-content {
  gap: 0 !important;
}
</style>
