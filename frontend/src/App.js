// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './component/navbar';
import { Shop } from './pages/shop/Shop';
import { Cart } from './pages/cart/Cart';
import { ShopcontextProvider } from './context/shop-context';

function App() {
  return (
    <div className="App">
      <ShopcontextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </ShopcontextProvider>
    </div>
  );
}

export default App;
