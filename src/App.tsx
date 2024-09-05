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
import { AppDispatch } from './redux/store';
import { Cart } from './modules/Cart/Cart';

export function App() {

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const initialCart = async () => {
      dispatch(registerCart());
      dispatch(fetchCart());
    };
    initialCart();
  }, [dispatch]);
  
  const goodsRef = useRef(null);
  const cartRef = useRef(null);

  return (
    <>

      <Header goodsRef={goodsRef} cartRef={cartRef}/>
      <main className='main'>
        <Hero />
        <Filter />
        <div ref={cartRef}><Cart /></div>
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
