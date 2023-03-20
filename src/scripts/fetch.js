import store from "../store/index.js";
import router from "../router/index";
const pre = "/api";

const GetToken = () => {
  const token = localStorage.getItem("TOKEN_TICKET_SYSTEM");
  return token;
};

const Get = async (url, options = {}) => {
  const headers = new Headers();
  const token = GetToken();
  headers.set("Authorization", token);

  const searchParams = new URLSearchParams(options.searchParams);
  const search = searchParams.toString();

  const res = await fetch(`${pre}${url}?${search}`, { headers: options.headers || headers });
  if (!res.ok) {
    router.push({ name: "404" });
    return null;
  }

  {
    const json = await res.json();
    return json;
  }
};

const Post = async (url, object, redirect) => {
  const headers = new Headers();
  const token = GetToken();
  headers.set("Authorization", token);
  headers.set("Content-Type", "application/json");

  const body = JSON.stringify(object);
  const res = await fetch(`${pre}${url}`, {
    method: "POST",
    headers: headers,
    body: body,
  });

  const answer = await res.json();

  if (!res.ok) {
    store.dispatch("UpdateMessage", { header: "Ошибка сохранения", text: answer.message, type: "error" });
    return res;
  } else {
    store.dispatch("UpdateMessage", { header: "Успех", text: answer.message, type: "success" });
    if (redirect) router.push(redirect);
    return res;
  }
};

const Put = async (url, object, redirect) => {
  const headers = new Headers();
  const token = GetToken();
  headers.set("Authorization", token);
  headers.set("Content-Type", "application/json");

  const body = JSON.stringify(object);
  const id = object.id;
  const putUrl = `${url}/${id}`;
  const res = await fetch(`${pre}${putUrl}`, {
    method: "PUT",
    headers: headers,
    body: body,
  });

  const answer = await res.json();

  if (!res.ok) {
    store.dispatch("UpdateMessage", { header: "Ошибка сохранения", text: answer.message, type: "error" });
    return null;
  } else {
    store.dispatch("UpdateMessage", { header: "Успех", text: answer.message, type: "success" });
    if (redirect) router.push(redirect);
    return res;
  }
};

const Delete = async (url, object, redirect) => {
  const headers = new Headers();
  const token = GetToken();
  headers.set("Authorization", token);
  headers.set("Content-Type", "application/json");

  const id = object.id;
  const delUrl = `${url}/${id}`;
  const res = await fetch(`${pre}${delUrl}`, { method: "DELETE", headers: headers });

  const answer = await res.json();

  if (!res.ok) {
    store.dispatch("UpdateMessage", { header: "Ошибка удаления", text: answer.message, type: "error" });
    return null;
  } else {
    store.dispatch("UpdateMessage", { header: "Успех", text: answer.message, type: "success" });
    if (redirect) router.push(redirect);
    return res;
  }
};

export { Get, Post, Put, Delete };
