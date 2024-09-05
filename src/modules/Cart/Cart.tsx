import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Cart.module.scss';
import { selectTotalPrice, toggleCart } from '../../redux/cartSlice';
import { toggleModal } from '../../redux/modalSlice';
import { calculateDeliveryTime } from '../../utils';
import { AppDispatch, RootState } from '../../redux/store';
import { CartItem } from '../CartItem/CartItem';

export const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.cart.isOpen); 
  const items = useSelector((state: RootState) => state.cart.items); 
  const totalPrice = useSelector(selectTotalPrice);
  const cartRef = useRef<HTMLDivElement>(null);
  const handlerCartClose = () => {
    dispatch(toggleCart());
  };

  const handlerModalOpen = () => {
    dispatch(toggleModal());
  };

  useEffect(() => {
    if (!isOpen && cartRef.current) {
      cartRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <section className={`${styles.cart} ${styles.cart_open}`} ref={cartRef}>
      <div className={styles.cart__container}>
        <div className={styles.cart__header}>
          <h3 className={styles.cart__title}>Ваш заказ</h3>

          <button className={styles.cart__close} onClick={handlerCartClose}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="5"
                y="5.70715"
                width="1"
                height="25"
                transform="rotate(-45 5 5.70715)"
                fill="#D17D2F"
              />
              <rect
                x="22.6777"
                y="5"
                width="1"
                height="25"
                transform="rotate(45 22.6777 5)"
                fill="#D17D2F"
              />
            </svg>
          </button>
        </div>

        <p className={styles.cart__dateDelivery}>{calculateDeliveryTime()}</p>

        <ul className={styles.cart__list}>
          {items.map((item) => ( 
            <li key={item.id} className={styles.cart__item}>
              <CartItem {...item} />
            </li>
          ))}
        </ul>

        <div className={styles.cart__footer}>
          <button
            className={styles.cart__orderbtn}
            onClick={handlerModalOpen}
            disabled={!items.length}
          >
            Оформить
          </button>
          <p className={`${styles.cart__price} ${styles.cart__priceTotal}`}>
            {totalPrice}&nbsp;₽
          </p>
        </div>
      </div>
    </section>
  );
};
