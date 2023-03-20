<template>
  <Form :organizations="orgs" :typePage="'create'"></Form>
</template>

<script async setup>
import Form from "../../components/Forms/Registration.vue";

import { Get } from "../../scripts/fetch";

const orgs = await Get("/organizations");
</script>
