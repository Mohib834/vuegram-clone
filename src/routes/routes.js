import Registration from '@/pages/registration.vue';
import Dashboard from '@/pages/dashboard.vue';

export const routes = [
    { path: '/registration', component: Registration, name: 'registration' },
    { path: '/dashboard', component: Dashboard, name: 'dashboard' }
]