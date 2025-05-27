import { api } from '@/services/api';
import Confetti from 'react-confetti';
import { toast } from './ui/use-toast';
import { useWindowSize } from 'react-use';
import { InstaPost, InstaPostComment } from '@/types';
import React, { useState, useEffect, useRef } from 'react';

interface RouletteProps {
  comments: InstaPostComment[];
  onClose: () => void;
  instaPost:InstaPost; 
  open: boolean;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const RouletteModal: React.FC<RouletteProps> = ({ comments, onClose, open, instaPost }) => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<InstaPostComment | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [offset, setOffset] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const visibleItems = 10;
  const centerIndex = Math.floor(visibleItems / 2);

  const getLoopedIndex = (index: number) => {
    const total = comments.length;
    return ((index % total) + total) % total;
  };

  const spinWheel = () => {
    if (isSpinning || comments.length === 0) return;

    setIsSpinning(true);
    setShowConfetti(false);
    setWinner(null);

    const duration = 5000 + Math.random() * 3000;
    const totalSteps = comments.length * 4 + Math.floor(Math.random() * comments.length);
    startTimeRef.current = performance.now();
    animateSpin(offset, offset + totalSteps, duration);
  };
  

  const addWinner = async (win_comment: InstaPostComment) => {
    try {
      await api.addWinner({comment_id: win_comment?.id, instagram_user_id: win_comment?.instagram_user_id, post_id: instaPost?.id});
    } catch (error) {
      toast({ title: "Xatolik", description: "Izohlarni yuklashda xatolik yuz berdi", variant: "destructive" });
    }
  }

  // G'olibni aniqlashda markazdagi comment tanlanadi:
  const animateSpin = (startOffset: number, endOffset: number, duration: number) => {
    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
  
      const elapsed = time - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const newOffset = startOffset + (endOffset - startOffset) * easedProgress;
  
      setOffset(newOffset);
  
      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        const finalIndex = getLoopedIndex(Math.round(endOffset));
  
        // G‘olibni 2 soniyadan keyin ko‘rsatish
        setTimeout(() => {
          setWinner(comments[finalIndex]);
          setShowConfetti(true);
          addWinner(comments[finalIndex])
        }, 300);
      }
    };
  
    requestRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);


  useEffect(() => {
    if (open) {
      spinWheel();
    }
  }, [open]);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {showConfetti && <Confetti width={windowWidth} height={windowHeight} recycle={false} numberOfPieces={500} gravity={0.2} />}

      <div className="bg-white rounded-xl shadow-xl overflow-hidden" style={{ width: '1500px', height: '950px' }}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-end items-center mb-4">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>

          <div className="relative flex-1 flex flex-col items-center justify-between overflow-hidden">
            {/* Left and right arrows */}
            <div className="absolute top-[335px] right-[80px] transform -translate-y-1/2 z-30">
              <div className="w-0 h-0 border-t-[20px] border-b-[20px] border-r-[30px] border-t-transparent border-b-transparent border-r-gray-700" />
            </div>

            {/* O‘ngga qaratilgan strelka */}
            <div className="absolute top-[335px] left-[80px] transform -translate-y-1/2 z-30">
              <div className="w-0 h-0 border-t-[20px] border-b-[20px] border-l-[30px] border-t-transparent border-b-transparent border-l-gray-700" />
            </div>


            {/* Items */}
            <div className="relative w-full h-[750px] overflow-hidden flex flex-col items-center justify-centerr" ref={containerRef} >
              {Array.from({ length: visibleItems }).map((_, i) => {
                const indexOffset = Math.floor(offset) + i - centerIndex;
                const realIndex = getLoopedIndex(indexOffset);
                const comment = comments[realIndex];

                const distance = Math.abs(i - centerIndex);
                const scale = 1 - distance * 0;
                const opacity = 1 - distance * 0;
                const blur = distance * 0.4;

                return (
                  <div
                    key={i}
                    className="absolute w-3/4 h-[65px] text-center p-3 rounded-md shadow-md border"
                    style={{
                      top: `${(i - centerIndex) * 70 + 300}px`,
                      transform: `scale(${scale})`,
                      opacity,
                      filter: `blur(${blur}px)`,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <p className="font-semibold p-0">{comment?.instagram_user_name}</p>
                    <p className="text-sm text-gray-600 truncate p-0">{comment?.text}</p>
                  </div>
                );
              })}
            </div>

            {/* Winner display */}
            { winner && (
              <div className="mt-4 w-full h-[150px] text-center px-10 py-4 bg-green-100 rounded-xl shadow-lg border-2 border-green-500 z-40">
                <h3 className="text-2xl font-extrabold text-green-700 mb-2">🎉 GʻOLIB! 🎉</h3>
                <p className="text-3xl font-bold text-gray-800">{winner?.instagram_user_name}</p>
                <p className="text-xl italic text-gray-600 mt-2 truncate">"{winner?.text}"</p>
              </div>
            )}

            { (!winner && isSpinning) ? <div className="mt-4 w-full h-[150px] flex items-center justify-center text-center px-10 py-4 bg-green-100 rounded-xl shadow-lg border-2 border-green-500 z-40">
                <p className="text-3xl font-bold text-gray-800">Tanlanayabti ...</p>
              </div> : null
            }


          </div>
        </div>
      </div>
    </div>
  );
};

export default RouletteModal;
