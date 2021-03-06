import Authentication from "@/pages/authentication.vue";
import Blogs from "@/pages/blogs.vue";
import MyBlogs from "@/pages/myblogs.vue";
import Register from "../components/Register/Register.vue";
import SignIn from "../components/SignIn/SignIn.vue";
import Blog from "@/pages/blog.vue";
import Setup from "@/pages/setup.vue";
import NotFound from "@/pages/notFound.vue";

export const routes = [
  {
    path: "/signup",
    component: Authentication,
    meta: { requireAuth: false },
    children: [
      { path: "", component: Register, name: "registration" },
      { path: "/signin", component: SignIn, name: "signin" }
    ]
  },
  {
    path: "/blogs",
    component: Blogs,
    name: "blogs"
  },
  {
    path: "/myblogs",
    component: MyBlogs,
    name: "myblogs",
    meta: { requireAuth: true }
  },
  {
    path: "/blog/:id",
    component: Blog
  },
  {
    path: "/setup",
    name: "setup",
    component: Setup,
    meta: { requireAuth: true }
  },
  {
    path: "/",
    redirect: "/blogs"
  },
  {
    path: "*",
    component: NotFound
  }
];
