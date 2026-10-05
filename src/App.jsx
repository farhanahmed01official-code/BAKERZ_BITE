import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import Footer from './components/Footer'
import Ticker from './components/Ticker'
import Toast from './components/Toast'
import WishlistToast from './components/WishlistToast'
import { useCart } from './context/CartContext'
import { useWishlist } from './context/WishlistContext'
import ChatBot from './components/ChatBot'
import Banner from './components/Banner'
import CategoryStrip from './components/CategoryStrip'

import Home from './pages/Home'
import Menu from './pages/Menu'
import Gallery from './pages/Gallery'
import Offers from './pages/Offers'
import Merchandise from './pages/Merchandise'
import Feedback from './pages/Feedback'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Sitemap from './pages/Sitemap'
import SearchResults from './pages/SearchResults'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Trending from './pages/Trending'
import Cakes from './pages/Cakes'
import IceCream from './pages/IceCream'
import Sweets from './pages/Sweets'
import Dairy from './pages/Dairy'
import Bakery from './pages/Bakery'
import Cookies from './pages/Cookies'

function App() {
  const { toasts: cartToasts, removeToast: removeCartToast } = useCart()
  const { toasts: wishToasts, removeToast: removeWishToast } = useWishlist()

  return (
    <>
      <Navbar />
      <SearchBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/merchandise" element={<Merchandise />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/cakes" element={<Cakes />} />
        <Route path="/ice-cream" element={<IceCream />} />
        <Route path="/sweets" element={<Sweets />} />
        <Route path="/dairy" element={<Dairy />} />
        <Route path="/bakery" element={<Bakery />} />
        <Route path="/cookies" element={<Cookies />} />
      </Routes>

      <Footer />
      <Ticker />

      <Toast toasts={cartToasts} removeToast={removeCartToast} />
      <WishlistToast toasts={wishToasts} removeToast={removeWishToast} />
      <ChatBot />
    </>
  )
}

export default App