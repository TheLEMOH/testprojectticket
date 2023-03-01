<template>
  <div class="ticket-info">
    <div class="info-field">
      <span>Дата создания</span>
      {{ new Date(props.state.createdAt).toLocaleString("ru") }}
    </div>
    <div class="info-field">
      <span>Срок сдачи</span>
      <span>В разработке...</span>
    </div>
    <div class="info-field">
      <span>Последний ответ</span>
      <span>В разработке...</span>
    </div>
    <div class="info-field">
      <span>Статус</span>
      {{ props.state.status.name }}
    </div>
    <div class="info-field">
      <span>Приоритет</span>
      <Badge :value="props.state.priority.name" :severity="props.state.priority.type"></Badge>
    </div>
    <div class="info-field" v-if="props.state.executor">
      <span>Назначена</span>
      {{ props.state.executor.surname }} {{ props.state.executor.name }}
      {{ props.state.executor.patronymic }}
    </div>

    <div class="info-field" v-if="props.state.category">
      <span>Категория</span>
      {{ props.state.category.name }}
    </div>

    <div class="info-field" v-if="props.state.way">
      <span>Путь</span>
      <span class="way-info-span">{{ props.state.way.name }} ({{ props.state.stepNumber }})</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  state: {
    type: Object,
    default: {},
  },
});
</script>

<style>
.way-info-span {
  text-decoration: underline;
  color: var(--blue-500);
}

.way-info-span:hover {
  color: var(--blue-300);
  cursor: pointer;
}
</style>
