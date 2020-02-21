export type Blog = {
  uid: string;
  blogId?: string;
  blogContent: {
    blogImage: string;
    blogTitle: string;
    blogText: string;
    createdAt: string;
    createdBy: string;
    comments?: Array<{
      text: string;
      by: string;
      createdAt: string;
    }>;
  };
};

export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type State = {
  activeUserUid: string;
  blogs: Array<Blog>;
  myBlogs: Array<Blog>;
  blog: Blog;
  authFormLoading: boolean;
  loading: boolean;
  showNav: boolean;
};
