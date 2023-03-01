<template><Table :url="url" v-if="!loading"></Table></template>

<script setup>

import Table from "../../components/Tables/Ticket.vue"
import { useStore } from "vuex";
import { computed, watch, ref } from "vue";

const store = useStore()

const user = computed(() => store.getters.client)

const loading = ref(true)
let url = null

if (user.value) {
    const id = user.value.id
    url = `/mytickets/${id}`
    loading.value = false
}

watch(user, (value) => {
    const id = value.id
    url = `/mytickets/${id}`
    loading.value = false
});


</script>