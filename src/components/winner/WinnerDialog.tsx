import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { TrophyIcon } from "lucide-react"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FindRandomComment } from "@/types"


interface WinnerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  winner: FindRandomComment | null
}

export const WinnerDialog: React.FC<WinnerDialogProps> = ({ open, onOpenChange, winner }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-yellow-100 to-yellow-50 shadow-2xl rounded-2xl p-8 max-w-2xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="text-center flex flex-col items-center space-y-4"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
            transition={{ duration: 1.2, ease: "easeInOut", repeat: 2 }}
          >
            <TrophyIcon className="text-yellow-500 w-16 h-16 drop-shadow-lg" />
          </motion.div>

          <h2 className="text-3xl font-extrabold text-yellow-600 drop-shadow-md">
            🎉 Tabriklaymiz! 🎉
          </h2>

          {/* <Avatar className="w-20 h-20 border-4 border-yellow-400 shadow-lg">
            <AvatarFallback className="text-2xl font-bold bg-yellow-300 text-white">
              {winner?.username.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar> */}

          <p className="text-4xl font-bold text-yellow-950">{winner?.username}</p>

          <p className="text-lg italic text-gray-600">"{winner?.select_comment}"</p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-sm text-gray-500 mt-4"
          >
            🎊 Siz g‘olib bo‘ldingiz!
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
