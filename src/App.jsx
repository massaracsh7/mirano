import { useDispatch } from 'react-redux';
import { Filter } from './modules/Filter/Filter';
import { Footer } from './modules/Footer/Footer';
import { Goods } from './modules/Goods/Goods';
import { Header } from './modules/Header/Header';
import { Hero } from './modules/Hero/Hero';
import { Order } from './modules/Order/Order';
import { Subscribe } from './modules/Subscribe/Subscribe';
import { useEffect, useRef } from 'react';
import { registerCart, fetchCart } from './redux/cartSlice';

export function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const initialCart = async () => {
      await dispatch(registerCart());
      await dispatch(fetchCart());
    };
    initialCart();
  }, [dispatch]);
  
  const goodsRef = useRef(null);

  return (
    <>

      <Header goodsRef={goodsRef} />
      <main>
        <Hero />
        <Filter />
        
        <div ref={goodsRef}>
          <Goods />
        </div>
        <Subscribe />
      </main>

      <Footer />

      <Order />
    </>
  )
}

export default App
