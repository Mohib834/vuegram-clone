import Authentication from '@/pages/authentication.vue';
import Posts from '@/pages/posts.vue';
import MyPosts from '@/pages/myPosts.vue';
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
        path: '/posts',
        component: Posts,
        name: 'posts',
        meta: { requireAuth: true }
    },
    {
        path: '/myposts',
        component: MyPosts,
        name: 'myposts',
        meta: { requireAuth: true }
    }
]