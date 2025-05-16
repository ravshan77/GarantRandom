import { Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import Layout from '@/components/layout/Layout'
import BlockedUsers from './pages/BlockedUsers'
import WinnerUsers from './pages/WinnerUsers'
import { PostUrlProvider } from './context/PostUrlContext'
import Informations from './pages/Informations'

function App() {
  return (
    <PostUrlProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Informations />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/blocked-users/:shortcode" element={<BlockedUsers />} />
          <Route path="/winner-users/:shortcode" element={<WinnerUsers />} />
        </Routes>
      </Layout>
    </PostUrlProvider>
  )
}

export default App