import Authentication from '@/pages/authentication.vue';
import Dashboard from '@/pages/dashboard.vue';
import Register from '../components/Register/Register.vue';
import SignIn from '../components/SignIn/SignIn.vue';


export const routes = [
    {
        path: '/registration',
        component: Authentication,
        meta: { requireAuth: false },
        children: [
            { path: '', component: Register, name: 'registration' },
            { path: '/sigin', component: SignIn, name: 'signin' }
        ]
    },
    {
        path: '/dashboard',
        component: Dashboard,
        name: 'dashboard',
        meta: { requireAuth: true }
    },
]