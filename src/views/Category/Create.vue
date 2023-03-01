<template>
    <Form :ways="ways" :priorities="priorities" :typePage="'create'"></Form>
</template>

<script setup>
import Form from "../../components/Forms/Category.vue"

import { Get } from "../../scripts/fetch"


const ways = await Get('/ways')
const priorities = await Get('/priorities')
</script>