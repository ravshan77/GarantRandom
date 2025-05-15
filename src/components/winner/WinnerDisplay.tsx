import { Label } from '../ui/label';
import { api } from '@/services/api';
import { Switch } from '../ui/switch';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useToast } from '../ui/use-toast';
import { FindRandomComment } from '@/types';
import { createConfetti } from '@/lib/utils';
import { Avatar, AvatarFallback } from '../ui/avatar';

interface WinnerDisplayProps {
  isSelecting: boolean;
  winner: FindRandomComment | null;
}

const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ winner, isSelecting }) => {
  const { toast } = useToast();

  useEffect(() => {
    if (winner && !isSelecting) {
      // Launch confetti when winner is displayed
      createConfetti();
    }
  }, [winner, isSelecting]);

  if (isSelecting) {
    return (
      <div className="p-8 bg-white rounded-lg border border-instagram-border text-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="inline-block mb-4" >
          <Trophy size={48} className="text-instagram-primary" />
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">G'olibni aniqlash...</h3>
        <p className="text-instagram-gray">Iltimos kuting, g'olib tanlanmoqda</p>
      </div>
    );
  }

  if (!winner) {
    return null;
  }

  
  const containerClass = "p-4 bg-gradient-to-r from-instagram-blue via-instagram-primary to-instagram-accent bg-opacity-20 rounded-lg shadow-md animate-winner-glow" 

  const handleBlockUser = async () => {
    if (!winner.comment_id) return;
    
    try { 
      const resoult = await api.blockUserComment(winner.instagram_user_id, winner.comment_id);
      toast({ description: resoult.resoult, variant: "default" });
    } catch (error) {
      toast({ title: "Xatolik", description: "Ishtirokchi bloklashda xatolik yuz berdi", variant: "destructive" });
    }
  }

  return (
    <div className="bg-white rounded-lg border border-instagram-border overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-instagram-secondary to-instagram-primary text-white text-center">
        <Trophy size={24} className="inline-block mr-2" />
        <h3 className="text-lg font-semibold inline-block">Tabriklaymiz! G'olib aniqlandi</h3>
      </div>
      
      <div className="p-4">
        <motion.div className={containerClass} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="flex items-start gap-3">
            <Avatar className={"ring-2 ring-instagram-primary"}>
              {/* <AvatarImage src={"https://github.com/shadcn.png"} alt={winner.username} /> */}
              <AvatarFallback>{winner.username?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-semibold text-instagram-dark text-white text-sm">{winner.username}</span>
                <span className="bg-instagram-primary text-white px-2 py-0.5 rounded-full text-sm"> G'olib </span>
                {/* <div className="flex items-center space-x-2">
                  <Switch onCheckedChange={handleBlockUser} />
                  <Label className='text-white text-xs'>Bloklash</Label>
                </div> */}
              </div>
              
              <p className="text-instagram-dark mt-1 text-white text-sm">{winner.select_comment}</p>
              <div className="flex items-center justify-end space-x-2">
                <Switch onCheckedChange={handleBlockUser} />
                <Label className='text-white text-xs'>Bloklash</Label>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WinnerDisplay;