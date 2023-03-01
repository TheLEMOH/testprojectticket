<template>
    <div class="home">
        <h2>Открыть новую заявку</h2>
        <p>Оставьте как можно больше информации, чтобы мы могли помочь Вам как можно скорее.</p>
        <Button class="p-button-success p-button-raised" label="Открыть заявку" @click="ToCreate"></Button>
        <h2>Проверить состояние Заявки</h2>
        <p>Мы храним все архивы и историю Ваших прошлых и текущих заявок включая ответы сотрудников.</p>
        <Button class="p-button-primary p-button-raised" label="Проверить свои заявки" @click="ToOpen"></Button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const ToCreate = () => {
    router.push({ name: 'ticketCreate' })
}

const ToOpen = () => {
    router.push({ name: 'ticketMy' })
}


</script>   

<style>
.home {
    width: 400px;
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 1rem;
}
</style>