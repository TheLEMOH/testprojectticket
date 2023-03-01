<template>
  <Dialog header="Информация о пути" class="way-info" :visible="true" :maximizable="true" :modal="true" @update:visible="UpdateVisible" :style="{ width: '800px', background: 'transparent' }">
    <div class="way-info-body">
      <Card>
        <template #title> Шаг номер 1</template>
        <template #content>
          <p><b>Сотрудник</b> - Малимонов Максим Игоревич</p>
          <p><b>Описание работы</b> - Малимонов Максим Игоревич</p>
        </template>
      </Card>
    </div>
  </Dialog>
</template>

<script setup>
import { Get } from "../../../scripts/fetch";

const props = defineProps({
  wayId: String,
});

const way = await Get(`/ways/${props.wayId}`);
</script>

<style>
.way-info-body p {
  padding: 0;
  margin: 0;
}
</style>
