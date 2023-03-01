<template>
    <Form :state="ticket" :typePage="'display'"></Form>
</template>

<script setup>
import Form from "../../components/Forms/Ticket.vue"

import { useRoute } from 'vue-router'

import { Get } from "../../scripts/fetch"

const route = useRoute()

const id = route.params.id

const ticket = await Get(`/tickets/${id}`)


</script>