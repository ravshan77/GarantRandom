import React from 'react';
import CommentItem from './CommentItem';
import { InstaPostComment } from '@/types';

interface CommentsListProps {
  comments: InstaPostComment[];
  isLoading: boolean;
}

const CommentsList: React.FC<CommentsListProps> = ({ comments, isLoading }) => {
  if (comments?.length === 0 && !isLoading) {
    return (
      <div className="py-8 text-center">
        <p className="text-instagram-gray">Hech qanday izohlar topilmadi.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-instagram-border overflow-hidden">
      <div className="divide-y divide-instagram-border h-80 overflow-y-auto overflow-x-hidden">
        {comments?.map((comment) => {
          return (<CommentItem key={comment.id} comment={comment} />)}
        )}
      </div>
    </div>
  );
};

export default CommentsList;