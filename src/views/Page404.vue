<template>
  <div class="page-404"><b>Такой страницы не существует</b> <Button class="p-button-text" label="На главную" @click="Click"></Button></div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const Click = () => {
  router.push({ name: "home" });
};
</script>

<style>
.page-404 {
  background-color: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  gap: 1rem;
}
</style>
