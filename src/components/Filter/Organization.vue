<template>
    <Filter :search="state" redirect="organizationAll">
        <template #title>Фильтр организаций</template>
        <template #content>
            <InputText v-model="state.shortName" placeholder="Сокращение"></InputText>
            <InputText v-model="state.name" placeholder="Наименование"></InputText>
            <InputText v-model="state.address" placeholder="Адресс"></InputText>
            <div class="field-checkbox">
                <Checkbox v-model="state.isHead" inputId="emp1" name="emp" :binary="true" />
                <label for="emp1">Головная организация</label>
            </div>
        </template>
</Filter>
</template>

<script setup>
import { reactive } from 'vue';

import Filter from './Filter.vue';

const state = reactive({})

</script>

<style></style>