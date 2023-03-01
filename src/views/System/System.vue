<template>
    <Form :state="system" :statuses="statuses" :typePage="'edit'"></Form>
</template>

<script setup>
import Form from "../../components/Forms/System.vue"

import { Get } from "../../scripts/fetch"

const statuses = await Get('/statuses')

const system = await Get('/system')


</script>