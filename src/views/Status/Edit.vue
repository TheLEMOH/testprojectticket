<template>
    <Form :state="status" :typePage="'edit'"></Form>
</template>

<script setup>
import Form from "../../components/Forms/Status.vue"

import { Get } from "../../scripts/fetch";

import { useRoute } from "vue-router";

const route = useRoute()

const id = route.params.id

const status = await Get(`/statuses/${id}`)
</script>