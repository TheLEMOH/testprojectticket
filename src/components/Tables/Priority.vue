<template>
    <Table :items="props.items" :global="global" :paginator="true">
        <template #columns>
            <Column field="name" header="Наименование"></Column>
            <Column field="type" header="Тип приоритета"></Column>
        </template>
    </Table>
</template>


<script setup>
import Table from "./Table.vue";

const global = ['id', 'name']

const props = defineProps({
    items: Array
})

</script>


<style>

</style>