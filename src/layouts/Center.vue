<template>
    <div class="center">
        <router-view v-slot="{ Component }">
            <Suspense>
                <Transition name="fade" mode="out-in">
                    <template #default>
                        <component :is="Component" />
                    </template>
                </Transition>
            </Suspense>
        </router-view>
    </div>
</template>

<script setup>
</script>

<style>
.center {
    display: flex;
    justify-content: center;
    padding: 1rem;
}
</style>