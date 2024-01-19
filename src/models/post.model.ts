export interface IOwner {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface IPost {
  id: string;
  image: string;
  likes: number;
  tags: string[];
  text: string;
  publishDate: string;
  owner: IOwner;
}

export interface IPaginatedPosts {
  data: IPost[];
  total: number;
  page: number;
  limit: number;
}
