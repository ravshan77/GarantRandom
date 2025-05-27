import { useState } from 'react';
import { api } from '@/services/api';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { InstaPost, InstaPostComment } from '@/types';
import { Dialog, DialogContent } from "@/components/ui/dialog"



interface Props {
  instaPost: InstaPost | null
  open: boolean
  onClose: () => void
  loadComments: () => Promise<void>
}

export const RandomizerDialog = ({ instaPost, open, onClose, loadComments }: Props) => {
  const [displayText, setDisplayText] = useState<InstaPostComment | "---------">("---------");
  const [isWinner, setIsWinner] = useState<InstaPostComment | null>(null);
  const [title, setTitle] = useState("Izohlarni random aniqlash");

  const comments = instaPost?.comments ?? [] 

  const addWinner = async (win_comment: InstaPostComment) => {
    try {
      await api.addWinner({comment_id: win_comment?.id, instagram_user_id: win_comment?.instagram_user_id, post_id: Number(instaPost?.id)});
      loadComments()
    } catch (error) {
      toast({ title: "Xatolik", description: "Izohlarni yuklashda xatolik yuz berdi", variant: "destructive" });
    }
  }

  const startEffect = () => {
    setDisplayText("---------");
    setIsWinner(null);
    setTitle("G'olib aniqlanmoqda ...");

    const startTime = performance.now();
    const fastDuration = 5000;
    const slowDuration = 2000;
    const totalDuration = 10000;

    const updateUsername = (timeNow: number) => {
      const elapsed = timeNow - startTime;

      if (elapsed >= totalDuration) {
        const winner = comments[Math.floor(Math.random() * comments.length)];
        setDisplayText(winner);
        addWinner(winner)
        setIsWinner(winner);
        setTitle('🏆 Tabriklaymiz!');
        return;
      }

      const random = comments[Math.floor(Math.random() * comments.length)];
      setDisplayText(random);

      let nextDelay = 40;
      if (elapsed > fastDuration) {
        const progress = (elapsed - fastDuration) / slowDuration;
        nextDelay = 40 + progress * 400;
      }

      setTimeout(() => {
        requestAnimationFrame(updateUsername);
      }, nextDelay);
    };

    requestAnimationFrame(updateUsername);
  };

  const display_user_text = typeof displayText === "string" ? displayText : displayText?.instagram_user_name


  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="bg-gradient-to-br min-w-[1600px] h-[800px] from-yellow-100 to-yellow-50 shadow-2xl rounded-2xl p-8 max-w-2xl">
        <Button className='absolute right-0 bg-transparent text-red-500 text-xl hover:bg-transparent' onClick={onClose}>X</Button>
        <div  className="h-[500px] text-center space-y-4">
          <h2 className="text-5xl mt-20 h-[120px] font-extrabold text-yellow-600 drop-shadow-md"> {title} </h2>
          <h2 className="text-6xl h-[120px] font-bold text-yellow-950">{display_user_text}</h2>
          <h2 className="text-4xl h-[120px] italic text-gray-600 mt-28">{isWinner?.text}</h2>
          <div className="text-lg text-gray-500">{ isWinner ? "🎊 Siz g‘olib bo‘ldingiz!" : ""} </div>
        </div>

        <div className='flex justify-center items-center h-60'>
          <Button onClick={startEffect} disabled={title === "G'olib aniqlanmoqda ..."} type='button' className="h-1/4 w-1/6 font-semibold cursor-pointer px-6 py-2 text-xl bg-yellow-600 hover:bg-yellow-700" >
            Boshlash
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}