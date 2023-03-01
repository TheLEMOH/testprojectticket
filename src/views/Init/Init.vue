<template>
  <Card style="width: 50rem">
    <template #title>Старт инициализации приложения</template>

    <template #content>
      <p>Инструкция для пользователя:</p>
      <p>1. Создайте головную организацию, которую вы хотите использовать.</p>
      <p>2. Добавьте разрешенную почту для входа в систему.</p>
      <p>3. Заведите пользователя, чтобы иметь доступ к системе.</p>
      <p>4. Задайте системные настройки, для создания заявок</p>
    </template>
  </Card>

  <div class="steps-button">
    <Button class="p-button-raised" label="Далее" @click="emits('nextPage')"></Button>
  </div>
</template>

<script setup>

const emits = defineEmits(["prevPage", "nextPage"]);
</script>
