import { Link } from 'react-router-dom'
import GarantLogo from '../../assets/garantLogo.svg'

const Header = () => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-instagram-border bg-white backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={GarantLogo} className="h-6 w-6 text-instagram-primary" alt='logo' />
          <span className="text-lg font-semibold">GarantRandom</span>
        </Link>
      </div>
    </header>
  )
}

export default Header