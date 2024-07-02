export const CartItem = () => (
  <>
    <li className="cart__item"><img className="cart__img"
      src="https://dull-rose-pawpaw.glitch.me/img/39.jpg"
      alt="Букет из роз Grand Avalanche (101 шт)" />
      <h4 className="cart__item-title">Букет из роз Grand Avalanche (101
        шт)</h4>
      <div className="cart__counter"><button
        className="cart__counter-btn">-</button><input
          className="cart__counter-input" type="number" max="99" min="0"
          defaultValue="1" /><button className="cart__counter-btn">+</button></div>
      <p className="cart__price">14800&nbsp;₽</p>
    </li>
    <li className="cart__item"><img className="cart__img"
      src="https://dull-rose-pawpaw.glitch.me/img/38.jpg"
      alt="Букет из тюльпан Dolche vita (51 шт)" />
      <h4 className="cart__item-title">Букет из тюльпан Dolche vita (51
        шт)</h4>
      <div className="cart__counter"><button
        className="cart__counter-btn">-</button><input
          className="cart__counter-input" type="number" max="99" min="0"
          defaultValue="2" /><button className="cart__counter-btn">+</button></div>
      <p className="cart__price">13400&nbsp;₽</p>
    </li>
    <li className="cart__item"><img className="cart__img"
      src="https://dull-rose-pawpaw.glitch.me/img/41.jpg"
      alt="Букет из роз Grand Mirabel (101 шт)" />
      <h4 className="cart__item-title">Букет из роз Grand Mirabel (101 шт)
      </h4>
      <div className="cart__counter"><button
        className="cart__counter-btn">-</button><input
          className="cart__counter-input" type="number" max="99" min="0"
          defaultValue="3" /><button className="cart__counter-btn">+</button></div>
      <p className="cart__price">63900&nbsp;₽</p>
    </li>
  </>
)