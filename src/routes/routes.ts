import Authentication from '@/pages/authentication.vue';
import Blogs from '@/pages/blogs.vue';
import MyBlogs from '@/pages/myblogs.vue';
import Register from '../components/Register/Register.vue';
import SignIn from '../components/SignIn/SignIn.vue';


export const routes = [
    {
        path: '/registration',
        component: Authentication,
        meta: { requireAuth: false },
        children: [
            { path: '', component: Register, name: 'registration' },
            { path: '/signin', component: SignIn, name: 'signin' }
        ]
    },
    {
        path: '/blogs',
        component: Blogs,
        name: 'blogs',
        meta: { requireAuth: true }
    },
    {
        path: '/myblogs',
        component: MyBlogs,
        name: 'myblogs',
        meta: { requireAuth: true }
    }
]