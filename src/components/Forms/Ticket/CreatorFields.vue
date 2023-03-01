<template>
  <div class="creator-info" v-if="creator">
    <div class="info-field">
      <span>ФИО</span>
      {{ creatorFullName }}
    </div>

    <div class="info-field">
      <span>Организация</span>
      {{ props.creator.organization.name }}
    </div>

    <div class="info-field">
      <span>Подразделение</span>
      {{ props.creator.subdivision }}
    </div>

    <div class="info-field">
      <span>Должность</span>
      {{ props.creator.position }}
    </div>

    <div class="info-field">
      <span>Кабинет </span>
      {{ props.creator.cabinet }}
    </div>

    <div class="info-field">
      <span>Адресс </span>
      {{ props.creator.address }}
    </div>

    <div class="info-field">
      <span>Телефон </span>
      {{ props.creator.phone }}
    </div>

    <div class="info-field">
      <span>Телефон рабочий</span>
      {{ props.creator.phoneWork }}
    </div>

    <div class="info-field">
      <span>Почта</span>
      {{ props.creator.email }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";

const props = defineProps({
  creator: Object,
});

const creatorFullName = computed(() => {
  return `${props.creator.surname} ${props.creator.name} ${props.creator.patronymic} `;
});
</script>
