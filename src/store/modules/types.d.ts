export type Blog = {
    uid: string;
    blogContent: {
        blogText: string;
        createdAt: string;
        createdBy: string;
    };
}

export type UserData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export type State = {
    activeUserUid: string;
    blogs: Array<Blog>;
    myBlogs: Array<Blog>
    authFormLoading: boolean;
    loading: boolean;
}