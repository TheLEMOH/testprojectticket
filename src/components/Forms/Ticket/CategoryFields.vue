<template>
  <div class="category-fields">
    <template v-if="typePage == 'create'">
      <div class="category-field" v-for="field in props.ticket.category.fields" :key="field.id">
        <label :for="`category-field-id-${field.id}`" class="category-field-name">{{ field.name }}</label>
        <component
          v-model="state[field.id]"
          class="p-inputtext-sm"
          :inputId="`category-field-id-${field.id}`"
          :name="`category-field-id-${field.id}`"
          :is="field.type"
          :placeholder="field.name"
          :options="field.list"
          optionLabel="name"
          binary
          optionValue="name"
          @change="Change"
        ></component>
      </div>
    </template>

    <template v-if="typePage == 'display'">
      <div class="category-field" v-for="field in props.ticket.category.fields" :key="field.id">
        <span class="category-field-name">{{ field.name }}</span>
        {{ props.ticket.fields[field.id] }}
      </div>
    </template>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";

const emits = defineEmits(["change"]);

const props = defineProps({
  typePage: {
    type: String,
    default: "create",
  },
  ticket: {
    type: Object,
    default: {},
  },
});

const state = reactive({});

const Change = () => {
  emits("change", state);
};
</script>

<style>
.category-field {
  display: flex;
  margin-bottom: 1rem;
}

.category-field-name {
  min-width: 160px;
  font-weight: bold;
}
</style>
