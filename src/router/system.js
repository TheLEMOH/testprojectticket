export default [{
    path: '/system',
    name: 'system',
    component: () => import('../views/System/System.vue'),
    meta: {
        layout: 'Standard',
        name: 'Системные настройки',
    }
}]