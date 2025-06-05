import { FindRandomComment, InstaPost, InstaPostComment } from "@/types";
import { createContext, useContext, useState, ReactNode } from "react";

interface PostUrlContextType {
  postUrl: string;
  setPostUrl: (value: string) => void;
  totalCount: number, 
  setTotalCount: React.Dispatch<React.SetStateAction<number>>, 
  isUrlValid: boolean, 
  setIsUrlValid:  React.Dispatch<React.SetStateAction<boolean>>, 
  comments: InstaPostComment[], 
  setComments:  React.Dispatch<React.SetStateAction<InstaPostComment[]>>, 
  instaPost: InstaPost | null, 
  setInstaPost:  React.Dispatch<React.SetStateAction<InstaPost | null>>, 
  winner: FindRandomComment | null, 
  setWinner: React.Dispatch<React.SetStateAction<FindRandomComment | null>>, 
  currentPostId: string | null, 
  setCurrentPostId: React.Dispatch<React.SetStateAction<string | null>>
}

const PostUrlContext = createContext<PostUrlContextType | undefined>(undefined);

export const PostUrlProvider = ({ children }: { children: ReactNode }) => {
  const [postUrl, setPostUrl] = useState<string>("");
  const [totalCount, setTotalCount] = useState(0);
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [comments, setComments] = useState<InstaPostComment[]>([]);
  const [instaPost, setInstaPost] = useState<InstaPost | null>(null);
  const [winner, setWinner] = useState<FindRandomComment | null>(null);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);

  return (
    <PostUrlContext.Provider value={{ postUrl, setPostUrl, totalCount, setTotalCount, isUrlValid, setIsUrlValid, comments, setComments, instaPost, setInstaPost, winner, setWinner, currentPostId, setCurrentPostId }}>
      {children}
    </PostUrlContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(PostUrlContext);
  if (!context) throw new Error("usePost context must be used within TextProvider");
  return context;
};
