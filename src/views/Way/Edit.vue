<template>
    <Form :organizations="orgs" :employees="employees" :state="way" :typePage="'edit'"></Form>
</template>

<script setup>
import Form from "../../components/Forms/Way.vue"

import { useRoute } from 'vue-router'
import { Get } from "../../scripts/fetch"

const route = useRoute()
const id = route.params.id

const orgs = await Get(`/organizations`)
const employees = await Get(`/users/employees`)
const way = await Get(`/ways/${id}`)

</script>