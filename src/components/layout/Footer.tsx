const Footer = () => {
  return (
    <footer className="border-t border-instagram-border bg-white py-3">
      <div className="container flex flex-col items-center justify-center gap-2 text-center text-sm text-instagram-gray">
        {/* <div className="flex items-center gap-1">
          <span>Made with</span>
          <Heart className="h-4 w-4 text-instagram-primary" fill="currentColor" />
          <span>by Instagram Lottery</span>
        </div> */}
        <p>© {new Date().getFullYear()} GarantRandom. Barcha huquqlar himoyalangan.</p>
      </div>
    </footer>
  )
}

export default Footer