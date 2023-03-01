export default [{
    path: '/ticket/create',
    name: 'ticketCreate',
    component: () => import('../views/Ticket/Create.vue'),
    meta: {
        layout: 'Standard',
        name: 'Создание заявки',
    }

}, {
    path: '/ticket/all',
    name: 'ticketTableFilter',
    component: () => import('../views/Ticket/TableFilter.vue'),
    meta: {
        layout: 'Standard',
        name: 'Заявки',
    }
}, {
    path: '/ticket/:id',
    name: 'ticketEdit',
    component: () => import('../views/Ticket/Edit.vue'),
    meta: {
        layout: 'Standard',
        name: 'Просмотр заявки',
    }
}, {
    path: '/ticket/open',
    name: 'ticketOpen',
    component: () => import('../views/Ticket/TableOpen.vue'),
    meta: {
        layout: 'Standard',
        name: 'Открытые заявки',
    }
}, {
    path: '/ticket/my',
    name: 'ticketMy',
    component: () => import('../views/Ticket/TableMy.vue'),
    meta: {
        layout: 'Standard',
        name: 'Мои заявки',
    }
}, {
    path: '/ticket/close',
    name: 'ticketClose',
    component: () => import('../views/Ticket/TableClose.vue'),
    meta: {
        layout: 'Standard',
        name: 'Закрытые заявки',
    }
},
{
    path: '/ticket/filter',
    name: 'ticketFilter',
    component: () => import('../views/Ticket/Filter.vue'),
    meta: {
        layout: 'Standard',
        name: 'Фильтрация',
    }
}]