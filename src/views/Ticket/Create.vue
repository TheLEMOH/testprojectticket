<template>
    <Form :areas='areas' :typePage="'create'"></Form>
</template>

<script setup>
import Form from "../../components/Forms/Ticket.vue"

import { Get } from "../../scripts/fetch"


const areas = await Get('/areaswithnodes')

</script>