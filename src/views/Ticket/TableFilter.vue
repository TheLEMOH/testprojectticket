<template>
  <Table :url="url"> </Table>
</template>

<script setup>
import Table from "../../components/Tables/Ticket.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();

const query = computed(() => route.query);

const url = "/tickets/pages";
</script>
