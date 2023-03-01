<template>
  <div class="form">
    <header>
      <slot name="header"></slot>
    </header>

    <main>
      <slot name="main"></slot>
    </main>

    <footer>
      <slot name="footer">
        <template v-if="typePage == 'create'">
          <Button label="Создать" class="p-button-raised" @click="Post(props.url, props.object, props.redirect)" :disabled="props.invalid"></Button>
        </template>

        <template v-if="typePage == 'edit' && clientRole > 2">
          <Button label="Удалить" class="p-button-raised p-button-danger" @click="DeleteObject"></Button>
          <Button label="Сохранить" class="p-button-raised" @click="Put(props.url, props.object, props.redirect)" :disabled="props.invalid"></Button>
        </template>
      </slot>
    </footer>
  </div>
</template>

<script setup>
/* import { useRoute } from 'vue-router'*/
import { computed } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { Post, Put, Delete } from "../../scripts/fetch";
import { useStore } from "vuex";

const confirm = useConfirm();
const store = useStore();

const clientRole = computed(() => store.getters.clientRole);

const props = defineProps({
  form: Object,
  object: Object,
  url: String,
  redirect: Object,
  invalid: Boolean,
  typePage: {
    type: String,
    default: "create",
  },
});

const DeleteObject = () => {
  confirm.require({
    header: "Удаление",
    message: "Удалить объект?",
    acceptClass: "p-button-danger p-button-raised",
    acceptLabel: "Удалить",
    rejectLabel: "Отменить",
    accept: async () => {
      await Delete(props.url, props.object, props.redirect);
    },
  });
};
</script>

<style>
.form {
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 10px;
  width: 1000px;
  background: #fff;
}

.form .p-button {
  margin-left: 1rem;
}


</style>
