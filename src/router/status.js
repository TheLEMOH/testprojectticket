export default [{
    path: '/status/create',
    name: 'statusCreate',
    component: () => import('../views/Status/Create.vue'),
    meta: {
        layout: 'Standard',
        name: 'Создание статуса',
    }
}, {
    path: '/status/:id',
    name: 'statusEdit',
    component: () => import('../views/Status/Edit.vue'),
    meta: {
        layout: 'Standard',
        name: 'Редактирование статуса',
    }
}, {
    path: '/status/all',
    name: 'statusAll',
    component: () => import('../views/Status/Table.vue'),
    meta: {
        layout: 'Standard',
        name: 'Все статусы',
    }
}, {
    path: '/status/filter',
    name: 'statusFilter',
    component: () => import('../views/Status/Filter.vue'),
    meta: {
        layout: 'Standard',
        name: 'Все статусы',
    }
}]