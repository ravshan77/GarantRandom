export interface InstaPostComment {
  text: string;
  date: string
  id: number
  instagram_user_id: number
  instagram_user_name: string
  is_selected: number
}

export interface InstaPost {
  id: number;
  shortcode: string,
  url: string,
  caption: string,
  date: string,
  likes: number,
  is_video: boolean,
  media_url: string,
  comments: InstaPostComment[],
}

export interface FindRandomComment {
  comment_count: number
  comment_id: number
  instagram_user_id: number
  other_comments: string[]
  post_id: number
  select_comment: string
  username: string
}


export interface BlockUserComment {
  comment_count: number
  username: string
}

export interface ResponseType<T> {
  resoult: T,
  status: boolean
}

export interface Userlist {
  id: number,
  username: string,
  comment_id: number,
  comment_text: string,
  date: string
}