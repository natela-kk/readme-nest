export interface PostVideo {
  name: string;
  link: string;
}

export interface PostText {
  name: string;
  announcement: string;
  text: string;
}

export interface PostQuote {
  text: string;
}

export interface PostPhoto {
  photo: string;
}

export interface PostLink {
  link: string;
  description?: string;
}
