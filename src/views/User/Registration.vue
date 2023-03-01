<template>
    <Form :organizations="orgs" :roles="roles" :typePage="'create'"></Form>
</template>

<script async setup>
import Form from "../../components/Forms/Registration.vue"

import { Get } from "../../scripts/fetch"

const orgs = await Get('/organizations')
const roles = await Get('/roles')

</script>