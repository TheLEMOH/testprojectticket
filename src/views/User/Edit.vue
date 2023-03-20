<template>
  <Form :organizations="orgs" :state="user" :roles="roles" :areas="areas" :folders="folders" :typePage="'edit'"></Form>
</template>

<script setup>
import Form from "../../components/Forms/User.vue";

import { useRoute } from "vue-router";

import { Get } from "../../scripts/fetch";

const route = useRoute();
const id = route.params.id;

const user = await Get(`/users/${id}`);

const orgs = await Get("/organizations");
const roles = await Get("/roles");
const folders = await Get("/folders");
const areas = await Get("/areas");
</script>
