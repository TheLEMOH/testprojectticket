<template>
  <form>
    <Password v-model="password" placeholder="Введите пароль" weakLabel="Простой" mediumLabel="Средний" strongLabel="Сложный" promptLabel="Введите пароль" autocomplete="off" @input="emit('change', $event)">
      <template #footer>
        <Divider />
        <p class="mt-2">Правила</p>
        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
          <li>Минимум одна строчная буква</li>
          <li>Минимум одна заглавная буква или цифра</li>
          <li>Минимум 6 символов</li>
        </ul>
      </template>
    </Password>
  </form>
</template>

<script setup>
import { ref } from "vue";
const password = ref(null);

const emit = defineEmits(["change"]);
</script>
