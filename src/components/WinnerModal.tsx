import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { InstaPostComment } from "@/types";
import ReactConfetti from "react-confetti";
import { Button } from "./ui/button";

interface Props {
    handleClose: () => void;
    open: boolean;
    winner: InstaPostComment
}

export function AlertWinnerDialog({ handleClose, open, winner }: Props) {

  return (
    <AlertDialog open={open} onOpenChange={() => handleClose()}>
      <AlertDialogContent className="min-w-[1500px] h-[800px]" onEscapeKeyDown={(e) => e.preventDefault()}>
        <AlertDialogHeader className="h-[700px]" >
          <AlertDialogTitle className="text-3xl text-center">🏆 GʻOLIB! 🏆</AlertDialogTitle>
          <AlertDialogDescription>
            <h1 className="text-6xl font-extrabold text-center mt-24">{winner.instagram_user_name}</h1>
            <h1 className="text-5xl text-center mt-40">{winner.text}</h1>
        <ReactConfetti width={1500} height={800} recycle={false} numberOfPieces={300} gravity={0.13} />
          </AlertDialogDescription>
        </AlertDialogHeader>
          <div className="flex justify-center items-center w-full h-12">
            <Button type="button" variant={"outline"} onClick={handleClose} className="w-80 h-12">Davom etish</Button>
          </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
