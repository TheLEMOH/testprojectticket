<template>
    <Form :categories="categories" :typePage="'create'"></Form>
</template>

<script setup>
import Form from "../../components/Forms/Area.vue"

import { Get } from "../../scripts/fetch"

const categories = await Get('/categories')

</script>