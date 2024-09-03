import { useDispatch } from 'react-redux';
import { useState } from 'react';
import style from './Card.module.scss';
import { addItemToCart } from '../../redux/cartSlice';
import { AppDispatch } from '../../redux/store'; // Import AppDispatch type

interface CardProps {
  className?: string; 
  id: number;
  img: string;
  title: string;
  dateDelivery: string;
  price: number;
}

export const Card: React.FC<CardProps> = ({ id, img, title, dateDelivery, price }) => {
  const dispatch = useDispatch < AppDispatch > ();
  const [isHover, setIsHover] = useState(false);

  const handlerAddToCart = () => {
    dispatch(addItemToCart({ productId: id, quantity: 1 }));
  };

  return (
    <article className={`goods__card ${style.card}`}>
      <img className={style.card__image} src={img} alt={title} />
      <div className={style.card__content}>
        <h3 className={style.card__title}>{title}</h3>
        <div className={style.card__footer}>
          <p className={style.card__dateDelivery}>{dateDelivery}</p>
          <button
            className={style.card__button}
            onClick={handlerAddToCart}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {isHover ? 'в корзину' : `${price} ₽`}
          </button>
        </div>
      </div>
    </article>
  );
};
