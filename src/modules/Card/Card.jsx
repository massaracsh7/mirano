import { useDispatch } from 'react-redux';
import style from './Card.module.scss';
import { addItemToCart } from '../../redux/cartSlice';

export const Card = ({ id, img, title, dateDelivery, price }) => {
  const dispatch = useDispatch();

  const handlerAddToCart = () => {
    dispatch(addItemToCart(id, img, title, dateDelivery, price))
  }
  return (
  <article className={`goods__card ${style.card}`}>
    <img className={style.card__image} src={img} alt={title} />
    <div className={style.card__content}>
      <h3 className={style.card__title}>{title}</h3>
      <div className={style.card__footer}>
        <p className={style.card__dateDelivery}>{dateDelivery}</p>
        <button className={style.card__button} onClick={handlerAddToCart}>{price}&nbsp;₽</button>
      </div>
    </div>
  </article>
);
};