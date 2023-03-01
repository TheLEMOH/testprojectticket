<template>
    <Form :ways="ways" :priorities="priorities" :state="category" :typePage="'edit'"></Form>
</template>

<script setup>
import Form from "../../components/Forms/Category.vue"

import { useRoute } from 'vue-router'

import { Get } from "../../scripts/fetch"

const route = useRoute()
const id = route.params.id

const ways = await Get('/ways')
const priorities = await Get('/priorities')

const category = await Get(`/categories/${id}`)
</script>