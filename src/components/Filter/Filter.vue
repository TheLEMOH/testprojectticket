<template>
    <Card class="filter-menu" style="width: 25rem;">
        <template #title>
            <slot name="title"></slot>
        </template>
        <template #content>
            <slot name="content"></slot>
        </template>
        <template #footer>
            <Button class="p-button-raised" label="Найти" @click="Search"></Button>
        </template>
</Card>
</template>

<script setup>

import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
    search: Object,
    redirect: String,
})

const Search = () => {
    const filter = Object.fromEntries(Object.entries(props.search).filter(([_, v]) => v != null && v != ''));
    router.push({ name: props.redirect, query: filter })
}
</script>

<style>
.filter-menu {
    margin-top: 1rem;
}
</style>