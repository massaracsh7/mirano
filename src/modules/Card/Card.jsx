import style from './Card.module.scss';

export const Card = ({ img, title, dateDelivery, price }) => (
  <article className={`goods__card ${style.card}`}>
    <img className={style.card__image} src={img} alt={title} />
    <div className={style.card__content}>
      <h3 className={style.card__title}>{title}</h3>
      <div className={style.card__footer}>
        <p className={style.card__dateDelivery}>{dateDelivery}</p>
        <button className={style.card__button}>{price}&nbsp;₽</button>
      </div>
    </div>
  </article>
);
