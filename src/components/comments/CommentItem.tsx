import React from 'react';
import { motion } from 'framer-motion';
import { InstaPostComment } from '@/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface CommentItemProps {
  comment: InstaPostComment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const { text, instagram_user_name, id } = comment;

  return (
    <motion.div 
      id={`comment-${id}`}
      className={"p-4 hover:bg-gray-50 border-b border-instagram-border"} 
      initial={true} 
      animate={true}
    >
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarFallback>{instagram_user_name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 justify-between">
            <span className="font-semibold text-instagram-dark">{instagram_user_name}</span>
          </div>
          <p className="text-instagram-dark mt-1">{text}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CommentItem;