<template>
  <div class="standard">
    <Sidebar></Sidebar>
    <div class="page">
      <Suspense>
        <Header></Header>
      </Suspense>
      <div class="content">
        <router-view v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <Suspense>
              <template #default>
                <component :is="Component" :key="fullPath" />
              </template>
              <template #fallback>
                <ProgressBar mode="indeterminate" style="height: 1rem; width: 100%" />
              </template>
            </Suspense>
          </Transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Header from "../components/Header/Header.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

const fullPath = computed(() => route.fullPath);
</script>

<style>
.standard {
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-columns: 13rem auto;
}

.page {
  overflow-x: auto;
  z-index: 0;
}

.content {
  display: flex;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.loading {
  padding: 1rem;
  margin: 1rem;
  border-radius: 10px;
  background: #fff;
}

@media (max-width: 960px) {
  .standard {
    grid-template-columns: auto;
    grid-template-rows: 45px auto;
  }
}
</style>
