import './cart.scss';
import { API_URL } from "../../const";

export const CartItem = ({ photoUrl, name, price }) => (
  <>
    <img className="cart__img"
      src={`${API_URL}${photoUrl}`}
      alt={name} />
    <h4 className="cart__item-title">{name}</h4>
    <div className="cart__counter">
      <button className="cart__counter-btn">-</button>
      <input className="cart__counter-input" type="number" max="99" min="0"
        defaultValue="1" />
      <button className="cart__counter-btn">+</button></div>
    <p className="cart__price">{price}&nbsp;₽</p>

  </>
)