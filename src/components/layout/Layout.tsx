import React from 'react'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-instagram-light">
      {/* <Header /> */}
      <main className="flex-1 container max-w-4xl mx-auto py-6 px-4 sm:px-6">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout