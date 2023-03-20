<template>
  <Form :url="url" :invalid="v.$invalid" :object="state" :typePage="typePage" :redirect="redirect">
    <template #main>
      <template v-if="typePage == 'display'">
        <div class="user-ticket-info">
          <div class="user-column">
            <h5>Пользователь</h5>
            <CreatorField :creator="state.creator"></CreatorField>
          </div>
          <div class="ticket-column">
            <h5>Заявка</h5>
            <TickeyFields :state="state" @open-way="displayWay = true"></TickeyFields>
          </div>
        </div>
        <Divider></Divider>
      </template>

      <template v-if="typePage == 'create'">
        <h5>Выбрать категорию</h5>

        <CascadeSelect
          v-model="selectedCategory"
          :options="tree"
          :optionGroupChildren="['children', 'children', 'children', 'children', 'children']"
          optionLabel="data.name"
          optionGroupLabel="data.name"
          :showClear="true"
          optionValue="data"
          @change="GetCategory($event)"
          :loading="loading"
        >
        </CascadeSelect>

        <Divider></Divider>
      </template>

      <h5>Дополнительные поля</h5>

      <CategoryFields @change="ChangeAdditionalFields" :ticket="state" :typePage="typePage"></CategoryFields>

      <Divider></Divider>

      <template v-if="!state.category.disabledEditor">
        <Editor v-model="state.text" :readonly="typePage == 'display'" editorStyle="height: 250px" />

        <Divider></Divider>
      </template>

      <ConfirmDialog group="close">
        <template #message="slotProps">
          <Editor v-model="message" editorStyle="height: 250px" />
        </template>
      </ConfirmDialog>

      <template v-if="creator">
        <Chat :display="displayChat" :creatorId="`${creator.id}`" :ticketId="state.id" @close="CloseChat" @refresh="RefreshTicket()" v-if="typePage == 'display'"></Chat>
      </template>
      <template v-if="state.wayId">
        <WayInfo :ticket="state" :display="displayWay" @close="CloseWay"></WayInfo>
      </template>
    </template>

    <template #footer>
      <div class="ticket-control" v-if="typePage == 'display'">
        <div class="ticket-control-buttons">
          <Button class="p-button-raised" v-tooltip.top="'Открыть сообщения'" icon="pi pi-comments" @click="displayChat = true"></Button>
        </div>
        <template v-if="role > 1">
          <div class="ticket-control-buttons">
            <Button class="p-button-raised" v-tooltip.top="'Передать заявку назад'" icon="pi pi-angle-left" @click="PreviousStep"> </Button>
            <Button class="p-button-raised" v-tooltip.top="'Передать заявку вперед'" icon="pi pi-angle-right" @click="NextStep"></Button>
          </div>

          <div class="ticket-control-buttons">
            <Button class="p-button-danger p-button-raised" v-tooltip.top="'Отклонить заявку'" icon="pi pi-times" @click="RejectTicket"> </Button>
            <Button class="p-button-success p-button-raised" v-tooltip.top="'Закрыть заявку'" @click="CloseTicket" icon="pi pi-check"></Button>
          </div>
        </template>
      </div>
    </template>
  </Form>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { Get } from "../../scripts/fetch";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import { Put } from "../../scripts/fetch";

import { required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import Form from "./Form.vue";
import Chat from "./Ticket/Chat.vue";
import CreatorField from "./Ticket/CreatorFields.vue";
import CategoryFields from "./Ticket/CategoryFields.vue";
import TickeyFields from "./Ticket/TicketFields.vue";
import WayInfo from "./Ticket/WayInfo.vue";

const confirm = useConfirm();
const store = useStore();
const router = useRouter();
const route = useRoute();

const url = "/tickets";
const redirect = { name: "ticketMy" };

const rules = {
  categoryId: { required },
  fields: { required },
};

const props = defineProps({
  areas: Object,
  typePage: {
    type: String,
    default: "create",
  },
  state: {
    type: Object,
    default: {},
  },
});

const creator = computed(() => store.getters.client);
const role = computed(() => store.getters.clientRole);

let loading = ref(false);

const tree = computed(() => {
  const t = [];
  if (props.areas)
    props.areas.forEach((area) => {
      t.push(...area.tree);
    });
  return t;
});

let state = reactive({
  categoryId: null,
  category: {},
  creator: null,
  executor: null,
  text: null,
  fields: null,
  organizationId: null,
  creatorId: creator.value.id,
});

const selectedCategory = ref(null);

const message = ref(null);
const displayChat = ref(false);
const displayWay = ref(false);

if (Object.keys(props.state).length != 0) {
  state = reactive(props.state);
}

const ChangeAdditionalFields = (event) => {
  state.fields = event;
};

const NextNode = (node, index) => {
  return null;
};

const CreateWay = () => {};

const GetCategory = async (event) => {
  const road = event.value.key.split("-");

  /*   let node = tree;
  road.forEach((r) => {
    node = NextNode(node, r);
  }); */

  console.log(event.value);

  loading.value = true;
  const categoryId = event.value.category;
  state.category = await Get(`/categories/${categoryId}`);
  state.categoryId = categoryId;
  loading.value = false;
};

const NextStep = (event) => {
  confirm.require({
    target: event.currentTarget,
    header: "Передача заявки",
    message: "Передать заявку следующему исполнителю?",
    acceptLabel: "Да",
    rejectLabel: "Нет",
    accept: async () => {
      const res = await Put(`/ticketnextstep`, {
        id: state.id,
        wayId: state.wayId,
        stepNumber: state.stepNumber,
        creatorId: creator.value.id,
        organizationId: state.organizationId,
      });

      if (res) {
        RefreshTicket();
      }
    },
  });
};

const PreviousStep = (event) => {
  confirm.require({
    target: event.currentTarget,
    header: "Передача заявки",
    message: "Передать заявку предыдущему исполнителю?",
    acceptLabel: "Да",
    rejectLabel: "Нет",
    accept: async () => {
      const res = await Put(`/ticketpreviousstep`, {
        id: state.id,
        wayId: state.wayId,
        stepNumber: state.stepNumber,
        creatorId: creator.value.id,
        organizationId: state.organizationId,
      });

      if (res) {
        RefreshTicket();
      }
    },
  });
};

const CloseTicket = () => {
  confirm.require({
    group: "close",
    header: "Закрыть заявку (Укажите причину)",
    acceptLabel: "Закрыть заявку",
    rejectLabel: "Нет",
    accept: async () => {
      await Put(
        `/ticketclose`,
        {
          id: state.id,
          text: message.value,
          type: "close",
          creatorId: creator.value.id,
        },
        { name: "ticketMy" }
      );
    },
  });
};

const RejectTicket = () => {
  confirm.require({
    group: "close",
    header: "Отменить заявку (Укажите причину)",
    acceptLabel: "Отменить заявку",
    rejectLabel: "Нет",
    accept: async () => {
      await Put(
        `/ticketclose`,
        {
          id: state.id,
          text: message.value,
          type: "reject",
          creatorId: creator.value.id,
        },
        { name: "ticketMy" }
      );
    },
  });
};

const CloseChat = () => {
  displayChat.value = false;
};

const CloseWay = () => {
  displayWay.value = false;
};

const RefreshTicket = async () => {
  router.go();
};

const v = useVuelidate(rules, state);
</script>

<style>
.creator-info {
  padding: 0rem;
}

.info-field {
  display: flex;
  margin: 0.3rem;

  white-space: normal !important;
}

.info-field span {
  min-width: 9rem;
  font-size: 1rem;
  font-weight: bold;
}

.user-ticket-info {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.user-column {
  width: 30rem;
}

.ticket-column {
  width: 30rem;
}

.ticket-control {
  display: flex;
}

.ticket-control-buttons {
  margin-left: 1rem;
}

.p-cascadeselect-label {
  width: 150px;
}
</style>
