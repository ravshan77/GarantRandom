import React from 'react';
import { Userlist } from '@/types';
import { Label } from '../ui/label';
import { api } from '@/services/api';
import { Switch } from '../ui/switch';
import { motion } from 'framer-motion';
import { useToast } from '../ui/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface BlockedUserItemProps {
  user: Userlist;
  fetchBlockedUser: () => Promise<void>
}

const BlockedUserItem: React.FC<BlockedUserItemProps> = ({ user, fetchBlockedUser }) => {
  const { toast } = useToast();
  const { comment_id, comment_text, id, username, date } = user;

  
  const handleBlockUser = async () => {
    if (!id) return;
    
    try { 
      const resoult = await api.blockUserComment(id, comment_id);
      fetchBlockedUser()
      toast({ description: resoult.resoult, variant: "default" });
    } catch (error) {
      toast({ title: "Xatolik", description: "Ishtirokchini bloklashda xatolik yuz berdi", variant: "destructive" });
    }
  }

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
              <Switch onCheckedChange={handleBlockUser} checked={true} />
              <Label className=''>Bloklash</Label>
            </div>
          </div>
          <p className="text-instagram-dark mt-1">{comment_text}</p>
          <p className='text-end text-sm p-0 m-0'>{date}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BlockedUserItem;