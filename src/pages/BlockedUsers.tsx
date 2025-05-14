import { Userlist } from "@/types";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { extractPostIdFromUrl } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import BlockedUsersList from "@/components/blockedUserList/BlockedUsersList";


const BlockedUsers = () => {
  const [isLoading, setIsLoading] = useState(false)  
  const [userList, setUserList] = useState<Userlist[]>([]);
  
  const { shortcode } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();


  const fetchBlockedUser = async () => {
    try {
      setIsLoading(true);

      const postId = extractPostIdFromUrl(`https://www.instagram.com/p/${shortcode}`);
      if (!postId) {
      toast({ title: "Xatolik", description: "Post ID ni aniqlashda xatolik yuz berdi", variant: "destructive" });
      return;
      }
      
      const result = await api.blockedUsersList(String(shortcode));
      setUserList(result.result)          
    } catch (error) {
      toast({ title: "Xatolik", description: "Ro'yxatni yuklashda xatolik yuz berdi", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockedUser()
  },[shortcode])


  return (
    <>
      {isLoading && <LoadingOverlay />}

      <div className="space-y-8">      
        {shortcode ? <section>
            <div className="w-full max-w-md mx-auto border border-gray-300 rounded-md bg-white">
            <iframe src={`https://www.instagram.com/p/${shortcode}/embed`} className="w-full" height="550" />
            </div>
        </section> : null}  

        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Shu post buyicha bloklangan ishtirokchilar</h1>
          <Button onClick={() => navigate(-1)} disabled={isLoading} className="rounded-2 h-10" variant="instagram"> Ortga </Button>
        </section>
        
        <section>
          <div>
            <BlockedUsersList users={userList} fetchBlockedUser={fetchBlockedUser} />
          </div>
        </section>

      </div>
    </>
  )
}

export default BlockedUsers