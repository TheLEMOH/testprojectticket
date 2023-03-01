<template>
  <div class="login-page">
    <div class="login-form">
      <h2>Вход</h2>

      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-user"></i>
        </span>
        <InputText type="text" v-model="state.email" placeholder="Почта" />
      </div>

      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-lock"></i>
        </span>
        <InputText v-model="state.password" type="password" placeholder="Пароль" />
      </div>

      <footer>
        <Button class="p-button-text p-button-warning p-button-sm" label="Забыли пароль?" :disabled="loading"></Button>
        <Button class="p-button-text p-button-sm" label="Регистрация" :disabled="loading" @click="Registration"></Button>
        <Button class="p-button-raised" label="Войти" @click="Login()" :disabled="loading"></Button>
      </footer>
    </div>
    <ProgressBar mode="indeterminate" v-if="loading" />
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();

const router = useRouter();

const loading = computed(() => store.getters.loadingLogin);

const state = reactive({
  email: null,
  password: null,
});

const Login = () => {
  store.dispatch("Login", state);
};

const Registration = () => {
  router.push({ name: "registration" });
};
</script>

<style scoped>
.login-form {
  background-color: #fff;
  border-radius: 10px;
  padding: 2rem;
  width: 400px;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

.p-inputgroup {
  margin-bottom: 1rem;
}

footer {
  display: flex;
  justify-content: space-between;
}
</style>
