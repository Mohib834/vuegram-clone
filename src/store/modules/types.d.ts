export type Blog = {
  uid: string;
  blogId?: string;
  blogContent: {
    blogImage: string;
    blogTitle: string;
    blogText: string;
    createdAt: string;
    createdBy: {
      name: string;
      photo?: File | null;
    };
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
  photo?: File | null;
  occupation?: string;
  bio?: string;
  setupCompleted?: boolean;
};

export type State = {
  activeUserUid: string | null;
  blogs: Array<Blog>;
  myBlogs: Array<Blog>;
  blog: Blog;
  loading: boolean;
  uploadProgress: number;
  showNav: boolean;
  snackbar: {
    toggle: boolean;
    message: string;
    color: string;
  };
  user: Omit<UserData, "password">;
};
