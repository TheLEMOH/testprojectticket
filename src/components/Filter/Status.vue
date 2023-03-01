<template>
    <Filter :search="state" redirect="statusAll">
        <template #title>Фильтр статусов
        </template>
        <template #content>
            <InputText v-model="state.name" placeholder="Наименование"></InputText>
            <InputText v-model="state.nameForInternalUsers" placeholder="Внутреннее наименование"></InputText>
            <InputText v-model="state.nameForExternalUsers" placeholder="Внешнее наименование"></InputText>
        </template>
</Filter>
</template>

<script setup>
import { reactive } from 'vue';

import Filter from './Filter.vue';

const state = reactive({})

</script>

<style></style>