<template>
  <Dialog header="Информация о пути" class="way-info" :visible="display" :maximizable="true" :modal="true" @update:visible="UpdateVisible" :style="{ width: '800px', background: 'transparent' }">
    <div class="way-info-body">
      <template v-if="steps.length != 0">
        <div class="way-info-step" v-for="step in steps" :key="step.id">
          <b>Шаг номер</b>: {{ step.stepNumber }}
          <p><b>Сотрудник</b> - {{ step.user.surname }} {{ step.user.name }} {{ step.user.patronymic }}</p>
          <p><b>Описание работы</b> - {{ step.description }}</p>
          <Divider></Divider>
        </div>
      </template>
      <template v-else> Для данного пути шаги отсутствуют </template>
    </div>
  </Dialog>
</template>

<script setup>
import { reactive } from "vue";
import { Get } from "../../../scripts/fetch";

const props = defineProps({
  ticket: Object,
  display: Boolean,
});

const emit = defineEmits(["close"]);
const organizationId = props.ticket.creator.organizationId;
const wayId = props.ticket.wayId;

const searchParams = { organizationId, wayId };

const steps = reactive(await Get(`/steps`, { searchParams }));

const UpdateVisible = () => {
  emit("close");
};
</script>

<style>
.way-info-body p {
  padding: 0;
  margin: 0;
}

.way-info-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
