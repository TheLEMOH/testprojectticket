<template>
  <Form :state="folder" :typePage="'edit'"></Form>
</template>

<script setup>
import Form from "../../components/Forms/Folder.vue";

import { useRoute } from "vue-router";

import { Get } from "../../scripts/fetch";

const route = useRoute();

const id = route.params.id;

const folder = await Get(`/folders/${id}`);
</script>
