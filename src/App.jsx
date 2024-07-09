import { useDispatch } from 'react-redux';
import { Filter } from './modules/Filter/Filter';
import { Footer } from './modules/Footer/Footer';
import { Goods } from './modules/Goods/Goods';
import { Header } from './modules/Header/Header';
import { Hero } from './modules/Hero/Hero';
import { Order } from './modules/Order/Order';
import { Subscribe } from './modules/Subscribe/Subscribe';
import { useEffect } from 'react';
import { registerCart } from './redux/cartSlice';

export function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const initialCart = async () => {
      await dispatch(registerCart);
    };
    initialCart();
  })

  return (
    <>

      <Header />
      <main>
        <Hero />
        <Filter />
        <Goods />
        <Subscribe />
      </main>

      <Footer />

      <Order />
    </>
  )
}

export default App
