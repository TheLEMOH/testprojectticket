<template>
    <div class="statistic">
        <Card v-for="s in statistic" style="width: 20rem;">
            <template #title>
                {{ s.name }}
            </template>
            <template #content>
                <div class="statistic-field">
                    <span> Всего заявок: </span> <strong>{{ s.all }}</strong>
                </div>
                <div class="statistic-field">
                    <span> Открытых заявок: </span> <strong>{{ s.open }}</strong>
                </div>
                <div class="statistic-field">
                    <span> Закрытых заявок: </span> <strong>{{ s.close }}</strong>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { Get } from '../scripts/fetch';
import { reactive } from 'vue';

const url = '/statistic'

const statistic = reactive(await Get(url))

</script>

<style>
.statistic {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
}

.statistic-field {
    display: flex;
    padding: 0.5rem;
    transition: all 0.2s;
}

.statistic-field:hover {
    cursor: pointer;
    background: var(--primary-500);
    color: white;
}

.statistic-field span {
    width: 150px;
}
</style>