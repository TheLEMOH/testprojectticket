<template>
    <Table :url="url"></Table>
</template>

<script setup>
import Table from "../../components/Tables/Ticket.vue"
const url = '/closedtickets'

</script>