<template>
  <Form :organizations="orgs" :roles="roles" :areas="areas" :typePage="'create'"></Form>
</template>

<script async setup>
import Form from "../../components/Forms/Registration.vue";

import { Get } from "../../scripts/fetch";

const orgs = await Get("/organizations");
const roles = await Get("/roles");
const areas = await Get("/areas");
</script>
