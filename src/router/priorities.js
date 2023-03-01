export default [{
    path: '/priority/all',
    name: 'priorityAll',
    component: () => import('../views/Priority/Table.vue'),
    meta: {
        layout: 'Standard',
        name: 'Все приоритеты',
    }
}]