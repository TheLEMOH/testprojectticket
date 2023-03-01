import { Get } from "../scripts/fetch";
import router from "../router/index";

const LOCAL_NAME = "TOKEN_TICKET_SYSTEM";

const state = {
  client: null,
  accessToken: null,
  loadingLogin: false,
};

const actions = {
  async Login(ctx, values) {
    ctx.commit("UpdateLoading", true);

    const { email, password } = values;
    const buffer = window.btoa(`${email}:${password}`);

    const headers = new Headers();
    headers.set("Authorization", `${buffer}`);
    const data = await Get("/login", { headers });

    if (data) {
      localStorage.setItem(LOCAL_NAME, data.token);

      if (data.client.role.level > 1) router.push({ name: "statistic" });
      else router.push({ name: "home" });

      ctx.commit("UpdateClient", data.client);
      ctx.commit("UpdateAccessToken", data.token);
      ctx.dispatch("UpdateMessage", { header: "Успешно!", text: `Добро пожаловать, ${data.client.name}`, type: "success" });
    } else {
      ctx.dispatch("UpdateMessage", { header: "Ошибка", text: "Неверный логин или пароль", type: "error" });
    }

    ctx.commit("UpdateLoading", false);
  },

  async Refresh(ctx) {
    const accessToken = localStorage.getItem(LOCAL_NAME);
    const headers = new Headers();
    headers.set("Authorization", accessToken);
    const data = await Get("/refresh", { headers });

    if (!data) {
      localStorage.clear(LOCAL_NAME);
      ctx.commit("UpdateAccessToken", null);
    }

    ctx.commit("UpdateClient", data);
  },

  async Exit(ctx) {
    localStorage.clear(LOCAL_NAME);
    ctx.commit("UpdateClient", null);
    ctx.commit("UpdateAccessToken", null);

    router.push({ name: "login" });
  },
};

const mutations = {
  UpdateClient(state, client) {
    state.client = client;
  },
  UpdateAccessToken(state, accessToken) {
    state.accessToken = accessToken;
  },
  UpdateLoading(state, value) {
    state.loadingLogin = value;
  },
};

const getters = {
  client(state) {
    return state.client;
  },

  clientRole(state) {
    if (state.client) {
      return state.client.role.level;
    } else return null;
  },

  folders(state) {
    if (state.client) {
      return state.client.folders;
    } else return [];
  },

  loadingLogin(state) {
    return state.loadingLogin;
  },

  accessToken(state) {
    return state.accessToken;
  },
};

export default { state, actions, mutations, getters };
