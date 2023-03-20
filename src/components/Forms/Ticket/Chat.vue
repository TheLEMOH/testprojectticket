<template>
  <Dialog header="Сообщения" class="chat" :visible="props.display" :maximizable="true" :modal="true" @update:visible="UpdateVisible" :style="{ width: '800px' }">
    <div class="chat-body">
      <div v-for="message in messages" :key="message.id" :class="['message', `message-type-${message.type}`]">
        <div class="head-message">
          <span class="head-date">{{ new Date(message.createdAt).toLocaleString("ru") }}</span>
          <span> {{ message.creator.name }}</span>
        </div>
        <div class="message-text" v-html="message.text"></div>
      </div>
      <div class="no-message" v-if="messages.length == 0">Нет сообщений</div>
    </div>

    <div class="chat-action">
      <TabMenu :model="menu" v-model:activeIndex="activeIndex" />
    </div>
    <div class="chat-input">
      <template v-if="activeIndex == 2">
        <Dropdown
          placeholder="Сотрудники"
          v-model="executorId"
          :filter="true"
          :options="employees"
          :optionLabel="
            (option) => {
              return `${option.surname} ${option.name} ${option.patronymic}`;
            }
          "
          optionValue="id"
        >
          <template #option="slotProps">
            <span>{{ slotProps.option.surname }} {{ slotProps.option.name }} {{ slotProps.option.patronymic }}</span>
          </template>
        </Dropdown>
      </template>
      <template v-if="activeIndex == 3">
        <Dropdown placeholder="Статусы" v-model="statusId" :filter="true" :options="statuses" optionLabel="name" optionValue="id"> </Dropdown>
      </template>
      <Editor v-model="text" placeholder="Введите сообщение" editorStyle="height:100px" />
      <Button class="p-button-raised" label="Отправить" @click="SendMessage" :disabled="!text"></Button>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { Get, Post } from "../../../scripts/fetch";
import { useStore } from "vuex";

const store = useStore();

const role = computed(() => store.getters.clientRole);

const props = defineProps({
  display: Boolean,
  ticketId: String,
  creatorId: String,
});

const emit = defineEmits(["close", "refresh"]);

const menu = ref([
  {
    label: "Ответ",
    type: "answer",
    visible: () => role.value > 0,
  },
  {
    label: "Заметка",
    type: "note",
    visible: () => role.value > 1,
  },
  {
    label: "Переназначить",
    type: "reasign",
    visible: () => role.value > 1,
  },
  {
    label: "Сменить статус",
    type: "status",
    visible: () => role.value > 1,
  },
]);

const activeIndex = ref(0);

const employees = await Get(`/users/employees`);
const statuses = await Get("/statuses");
const messages = ref(await Get(`/messages/${props.ticketId}`));

const text = ref(null);
const executorId = ref(null);
const statusId = ref(null);

const UpdateVisible = () => {
  emit("close");
};

const SendMessage = async () => {
  const type = menu.value[activeIndex.value].type;

  const m = {
    ticketId: props.ticketId,
    creatorId: props.creatorId,
    text: text.value,
    type: type,
    executorId: executorId.value,
    statusId: statusId.value,
  };

  const res = await Post(`/messages`, m);

  if (res.ok) {
    messages.value = await Get(`/messages/${props.ticketId}`);
    if (type != "answer") emit("refresh");
  }
};
</script>

<style>
.chat-body {
  height: 40vh;
  border: 1px solid #ced4da;
  border-radius: 10px;
  overflow-y: scroll;
  margin-bottom: 1rem;
}

.chat-action {
  margin-bottom: 1rem;
}

.head-date {
  font-weight: bold;
  margin-right: 1rem;
}

.chat-input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chat-input input {
  flex-grow: 1;
}

.message {
  margin: 1rem;
  padding: 0.5rem;
  border-radius: 10px;
}

.message-text * {
  margin: 0;
}

.message-type-answer {
  border: 2px solid var(--primary-500);
}

.message-type-note {
  border: 2px solid var(--orange-500);
}

.message-type-reasign {
  border: 2px solid var(--yellow-500);
}

.message-type-status {
  border: 2px solid var(--teal-500);
}

.no-message {
  padding: 1rem;
}
</style>
