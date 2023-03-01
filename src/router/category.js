export default [{
    path: '/category/create',
    name: 'categoryCreate',
    component: () => import('../views/Category/Create.vue'),
    meta: {
        layout: 'Standard',
        name: 'Создание категории',
    }
}, {
    path: '/category/:id',
    name: 'categoryEdit',
    component: () => import('../views/Category/Edit.vue'),
    meta: {
        layout: 'Standard',
        name: 'Редактирование категории',
    }
}, {
    path: '/category/filter',
    name: 'categoryFilter',
    component: () => import('../views/Category/Filter.vue'),
    meta: {
        layout: 'Standard',
        name: 'Фильтрация',
    }
}, {
    path: '/category/all',
    name: 'categoryAll',
    component: () => import('../views/Category/Table.vue'),
    meta: {
        layout: 'Standard',
        name: 'Все категории',
    }
}]