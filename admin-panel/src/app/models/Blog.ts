export interface Blog {
  id: string;
  title: string;
  content: string;
  shortDescription: string;
  createdAt: string;
  category: Category;
  author: Author;
  image: Image;
}

export interface Category {
  categoryId: string;
  name: string;
}

export interface Author {
  authorId: string;
  username: string;
  picture: string;
}

export interface Image {
  imageUrl: string;
  publicId: string;
}

export interface BlogParams {
  pageNumber: number;
  pageSize: number;
}
