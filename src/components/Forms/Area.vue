<template>
  <Form :url="url" :object="state" :invalid="v.$invalid" :redirect="redirect" :typePage="typePage">
    <template #main>
      <h5>Данные об области</h5>

      <div class="flex-form-column">
        <InputText v-model="state.name" placeholder="Наименование"></InputText>
        <Textarea v-model="state.description" placeholder="Описание" rows="5"></Textarea>
      </div>

      <Divider></Divider>

      <div class="flex-form-between">
        <h5>Дерево категорий</h5>
        <Button class="p-button-sm p-button-raised" icon="pi pi-plus" :disabled="state.tree.length > 0" @click="AddArea()"></Button>
      </div>

      <TreeTable :value="state.tree" :filters="filters" filterMode="lenient" responsiveLayout="scroll">
        <template #header>
          <div class="search-header">
            <i></i>
            <div class="p-input-icon-left">
              <i class="pi pi-search"></i>
              <InputText v-model="filters['global']" placeholder="Поиск" />
            </div>
          </div>
        </template>
        <Column field="key" header="Уровень" :expander="true" style="min-width: 15rem"> </Column>
        <Column field="name" header="Наименование"> </Column>
        <Column field="type" header="Тип"></Column>
        <Column field="category" header="Категория">
          <template #body="{ node }">
            <Dropdown v-model="node.data.category" :options="props.categories" optionLabel="name" optionValue="id" disabled v-if="node.data.category" />
          </template>
        </Column>
        <Column header="Управление" style="min-width: 15rem">
          <template #body="{ node, column }">
            <Button class="p-button-raised p-button-sm" icon="pi pi-pencil" @click="[SelectNode(node), (displayNode = true)]" />
            <Button class="p-button-raised p-button-sm" icon="pi pi-plus" @click="AddNode(node)" :disabled="DisableAddButton(node)" />
            <Button class="p-button-raised p-button-sm p-button-danger" icon="pi pi-times" @click="DeleteNode(node, column)" />
          </template>
        </Column>
      </TreeTable>

      <Dialog header="Настройка узла" v-model:visible="displayNode" :modal="true" :maximizable="true" style="width: 300px">
        <div class="flex-form-column">
          <InputText v-model="selectedNode.data.name" placeholder="Наименования узла" />
          <Dropdown
            v-model="selectedNode.data.category"
            :options="props.categories"
            optionLabel="name"
            :showClear="true"
            optionValue="id"
            :filter="true"
            placeholder="Категория"
            @change="SetName($event)"
          />
        </div>
        <template #footer>
          <Button label="Закрыть" class="p-button-raised" icon="pi pi-times" @click="displayNode = false" />
        </template>
      </Dialog>
    </template>
  </Form>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Form from "./Form.vue";

const props = defineProps({
  typePage: {
    type: String,
    default: "create",
  },
  categories: Array,
  state: {
    type: Object,
    default: {},
  },
});

const filters = ref({});

const url = "/areas";
const redirect = { name: "areaAll" };

const displayNode = ref(false);
const selectedNode = ref(null);
const rules = {
  name: { required },
  tree: { required },
};

let state = reactive({
  name: null,
  description: null,
  tree: [],
});

if (Object.keys(props.state).length != 0) {
  state = reactive(props.state);
}

const v = useVuelidate(rules, state);

const AddArea = () => {
  const len = state.tree.length;
  const key = state.tree[len - 1] ? +state.tree[len - 1].key + 1 : 0;
  state.tree.push({
    key: `${key}`,
    data: {
      key: key,
      name: null,
      type: "Узел",
    },
    children: [],
  });
};

const CreateKey = (node) => {
  const parentKey = node.key;
  const childrensLen = node.children.length;
  const lastChildrenCode = node.children[childrensLen - 1] ? node.children[childrensLen - 1].key : parentKey;
  const split = lastChildrenCode.length != parentKey.length ? lastChildrenCode.split("-") : 0;
  const lastChar = +split[split.length - 1] + 1 || 0;
  return `${parentKey}-${+lastChar}`;
};

const SelectNode = (node) => {
  selectedNode.value = node;
};

const AddNode = (node) => {
  const key = CreateKey(node);

  node.children.push({
    key: key,
    data: {
      key: key,
      name: null,
      type: "Узел",
    },
    children: [],
  });
};

const DeleteNode = (node, column) => {
  if (node.key.length == 1) {
    const index = state.tree.findIndex((p) => p.key == node.key);

    state.tree.splice(index, 1);
  } else {
    const parent = FindParent(node);
    const index = parent.findIndex((p) => p.key == node.key);
    parent.splice(index, 1);
  }
};

const FindParent = (node) => {
  const key = node.key;
  const splits = key.split("-");
  const level = splits.length;
  let parent = state.tree;
  for (let i = 0; i < level - 1; i++) {
    parent = parent[splits[i]].children;
  }
  return parent;
};

const SetName = (categoryId) => {
  if (categoryId.value) {
    const category = props.categories.find((c) => c.id == categoryId.value);
    selectedNode.value.data.name = category.name;
    selectedNode.value.data.type = "Категория";
    selectedNode.value.data.children = [];
  } else {
    selectedNode.value.data.type = "Узел";
    selectedNode.value.data.name = null;
  }
};

const DisableAddButton = (node) => {
  if (node.data.category) return true;
  else return false;
};
</script>
