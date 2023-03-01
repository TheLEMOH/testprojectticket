<template>
  <Form :categories="categories" :state="area" :typePage="'edit'"></Form>
</template>

<script setup>
import Form from "../../components/Forms/Area.vue";

import { useRoute } from "vue-router";

import { Get } from "../../scripts/fetch";

const route = useRoute();
const id = route.params.id;

const categories = await Get("/categories");

const area = await Get(`/areas/${id}`);
</script>
