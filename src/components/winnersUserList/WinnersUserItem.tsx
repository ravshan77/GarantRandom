import React from 'react';
import { Userlist } from '@/types';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface WinnersUserItemProps {
  user: Userlist;
}

const WinnersUserItem: React.FC<WinnersUserItemProps> = ({ user }) => {
  const { comment_text, username } = user;

  return (
    <motion.div className={"p-4 hover:bg-gray-50 border-b border-instagram-border"} initial={true} animate={true}>
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarFallback>{username?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 justify-between">
            <span className="font-semibold text-instagram-dark">{username}</span>
            <div className="flex items-center space-x-2">
            <Trophy size={20} className="inline-block mr-2" />
            </div>
          </div>
          <p className="text-instagram-dark mt-1">{comment_text}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WinnersUserItem;