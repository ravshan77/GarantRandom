import { api } from '@/services/api';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import GarantLogo from '../assets/garantLogo.svg'
import { usePost } from '@/context/PostUrlContext';
import React, { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
// import RouletteModal from '@/components/LotteryDrum';
import CommentsList from '@/components/comments/CommentsList';
// import WinnerDisplay from '@/components/winner/WinnerDisplay';
// import { WinnerDialog } from '@/components/winner/WinnerDialog';
// import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { isValidInstagramUrl, extractPostIdFromUrl } from '@/lib/utils';
// import WinnerDisplay from '@/components/winner/WinnerDisplay';
// import WinnerCelebration from '@/components/winner/WinnerCelebration';
// import { WinnerDialog } from '@/components/winner/WinnerDialog';
import { RandomizerDialog } from '@/components/LastModal/LastModal';


const HomePage: React.FC = () => {
  const { postUrl, setPostUrl, totalCount, setTotalCount, isUrlValid, setIsUrlValid, comments, setComments, instaPost, setInstaPost, setCurrentPostId } = usePost();
  const { toast } = useToast();
  const [isSelecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [isWinnerDialog, setIsWinnerDialog] = useState(false)
  // Validate URL as user types
  useEffect(() => {
    setIsUrlValid(isValidInstagramUrl(postUrl));
  }, [postUrl]);

  // useEffect(() => {
  //   if (winner?.instagram_user_id) { 
  //     const timer = setTimeout(() => {
  //       setIsWinnerDialog(true)
  //     }, 2300)
      
  //     return () => clearTimeout(timer)
  //   }
  //   }, [winner])
  
  // Load comments
  const handleLoadComments = async () => {
    if (!isUrlValid) return;
    
    try {
      setIsLoading(true);
      setComments([]);
      // setWinner(null);
      
      const postId = extractPostIdFromUrl(postUrl);
      if (!postId) {
        toast({ title: "Xatolik", description: "Post ID ni aniqlashda xatolik yuz berdi", variant: "destructive" });
        return;
      }
      
      setCurrentPostId(postId);
      const resoult = await api.getPostComments(postId);
      
      setInstaPost(resoult.resoult)
      setComments(resoult.resoult.comments);
      setTotalCount(resoult.resoult.comment_count_instagram);
      
      // toast({ title: "", description: `${resoult.resoult.comments.length} ta izoh yuklandi` });
    } catch (error) {
      setInstaPost(null)
      setComments([]);
      setTotalCount(0)
      toast({ title: "Xatolik", description: "Izohlarni yuklashda xatolik yuz berdi", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  // Select random winner
  // const handleSelectWinner = async () => {
  //   if (!currentPostId || comments.length === 0) return;
  //   try {
  //     setIsSelecting(true);
  //     setWinner(null);
      
  //     // Add some delay for UI effect
  //     const randomWinner = await api.selectRandomWinner(currentPostId);
  //     setWinner(randomWinner.resoult);
        
  //     // Scroll to winner
  //     setTimeout(() => {
  //       document.getElementById('winner-section')?.scrollIntoView({ behavior: 'smooth' });
  //     }, 500);

  //     // Then find and scroll to the comment
  //     setTimeout(() => {
  //       const winnerComment = document.getElementById(`comment-${randomWinner.resoult.comment_id}`);
  //       if (winnerComment) {
  //         winnerComment.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //         winnerComment.classList.add('highlight-winner'); // Add highlight class
  //       }
  //     }, 1000);

  //   } catch (error) {
  //     toast({ title: "Xatolik", description: "G'olibni aniqlashda xatolik yuz berdi", variant: "destructive"});
  //   } finally{  
  //     setIsSelecting(false);
  //   }
  // };

  const closeModal = () => {
    handleLoadComments()
    setShowModal(false)
  }

  return (
    <>
      {/* { isSelecting ? <LoadingOverlay /> : null} */}
      {/* { <WinnerDialog onOpenChange={setIsWinnerDialog} open={isWinnerDialog} winner={winner} /> } */}
      <div className="space-y-8">
        <section className="text-center max-w-3xl mx-auto">
          <img src={GarantLogo} className="h-12 w-12 text-instagram-primary mx-auto mb-4" alt='logo' />
          <h1 className="text-3xl font-bold mb-2">Instagram Yutuqli Izohlar</h1>
          <p className="text-instagram-gray mb-6">
            Instagram postdan tasodifiy izohni aniqlash
          </p>
        </section>
        
        <section className="bg-white p-3 rounded-lg border border-instagram-border shadow-sm">
          <div className="space-y-4">
            <div>
              <div className="flex mt-1.5">
                <Input onChange={(e) => setPostUrl(e.target.value)} value={postUrl} placeholder="https://www.instagram.com/p/..." type="text" className="rounded-r-none" id="post-url" />
                <Button onClick={handleLoadComments} disabled={!isUrlValid || isLoading} className="rounded-l-none h-10" variant="instagram"> Yuklash </Button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <RandomizerDialog instaPost={instaPost} onClose={closeModal} loadComments={handleLoadComments} open={showModal} />
        </section>

        {instaPost ? <section>
          <div className="w-full max-w-md mx-auto border border-gray-300 rounded-md bg-white">
            <iframe src={`${instaPost?.url}embed`} className="w-full" height="550" />
            </div>
        </section> : null}

        {/* {instaPost ? (
          <section>
            <div className="w-full max-w-md mx-auto border border-gray-300 rounded-md bg-white">
            { showModal && <RouletteModal instaPost={instaPost} comments={comments} open={showModal} onClose={closeModal} />}
            </div>
          </section>) : null} */}
        
        {/* {winner ? <section id="winner-section">
          <h2 className="text-xl font-semibold mb-4">G'olib</h2>
          <WinnerDisplay winner={winner} isSelecting={isSelecting} />
          <WinnerCelebration />
        </section> : null} */}
        
        {instaPost ? <div className='flex justify-center items-center'>
              {/* <Button onClick={() => setShowModal(true)} disabled={isSelecting || comments?.length === 0} variant="instagram" className='' size="sm">
                Tasodifiy g'olibni aniqlash
              </Button> */}

              {/* <Button onClick={handleSelectWinner} disabled={isSelecting || comments?.length === 0} variant="instagram" className='' size="sm">
                Tasodifiy g'olibni aniqlash
              </Button> */}

              <Button onClick={() => setShowModal(true)} disabled={isSelecting || comments?.length === 0} variant="instagram" className='' size="sm">
                Tasodifiy g'olibni aniqlash
              </Button>
        </div> : null}
        {comments?.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Izohlar ({totalCount})</h2>
            </div>
            <CommentsList comments={comments} isLoading={isLoading} />
          </section>
        )}

        {instaPost ? <section className='flex justify-end'>
          {/* <h1 className='mr-4' > <Link to={`/blocked-users/${instaPost?.shortcode}`} className='underline text-blue-500 text-lg'> Qora ro'yxat </Link> </h1> */}
          <h1 className='ml-4' > <Link to={`/winner-users/${instaPost?.shortcode}`} className='underline text-blue-500 text-lg'> G'oliblar </Link> </h1>
        </section> : null}
      </div>
    </>  
  );
};

export default HomePage;