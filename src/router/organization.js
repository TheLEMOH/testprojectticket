export default [
    {
        path: '/organization/create',
        name: 'organizationCreate',
        component: () => import('../views/Organization/Create.vue'),
        meta: {
            layout: 'Standard',
            name: 'Создание организации',
        }
    }, {
        path: '/organization/:id',
        name: 'organizationEdit',
        component: () => import('../views/Organization/Edit.vue'),
        meta: {
            layout: 'Standard',
            name: 'Редактирование организации',
        }
    }, {
        path: '/organization/all',
        name: 'organizationAll',
        component: () => import('../views/Organization/Table.vue'),
        meta: {
            layout: 'Standard',
            name: 'Все организации',
        }
    }, {
        path: '/organization/filter',
        name: 'organizationFilter',
        component: () => import('../views/Organization/Filter.vue'),
        meta: {
            layout: 'Standard',
            name: 'Фильтрация',
        }
    },]