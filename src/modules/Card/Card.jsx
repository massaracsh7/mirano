export const Card = (item) => (
  <article className="goods__card card"><img className="card__image"
    src={item.img}
    alt={item.title} />
    <div className="card__content">
      <h3 className="card__title">={item.img}
      </h3>
      <div className="card__footer">
        <p className="card__date-delivery">={item.dateDelivery}</p><button
          className="card__button">{item.price}nbsp;₽</button>
      </div>
    </div>
  </article>
)