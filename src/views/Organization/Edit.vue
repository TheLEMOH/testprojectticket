<template>
    <Form :state="organization" :typePage="'edit'"></Form>
</template>

<script setup>
import Form from "../../components/Forms/Organization.vue"

import { useRoute } from 'vue-router'

import { Get } from "../../scripts/fetch"

const route = useRoute()
const id = route.params.id

const organization = await Get(`/organizations/${id}`)

</script>