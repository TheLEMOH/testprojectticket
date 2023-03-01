<template>
    <Form :organizations="orgs" :employees="employees" :typePage="'create'"></Form>
</template>

<script setup>
import Form from "../../components/Forms/Way.vue"

import { Get } from "../../scripts/fetch"

const orgs = await Get('/organizations')
const employees = await Get(`/users/employees`)
</script>