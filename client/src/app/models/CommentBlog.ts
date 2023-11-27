export interface Comment {
  commentId: string;
  blogId: string;
  userId: string;
  username: string;
  fullName: string;
  Email: string;
  avatar: string;
  Comment: string;
  createdAt: string;
}
export interface BlogComment {
  comments: Comment[];
}
export interface BlogCommentParams {
  pageNumber: number;
  pageSize: number;
}
