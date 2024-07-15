import './cart.scss';
import { API_URL } from "../../const";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addItemToCart } from '../../redux/cartSlice';
import { debounce } from '../../utils';

export const CartItem = ({ id, photoUrl, name, price, quantity }) => {
  const dispatch = useDispatch();
  const [inputQuantity, setInputQuantity] = useState(quantity);

 const debounceInputChange = debounce((newQuantity) => {
   dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
 }, 500);

  const handlerInputChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setInputQuantity(newQuantity);
    debounceInputChange(newQuantity);
  }

  const handlerDecrement = () => {
    console.log('-');
    const newQuantity = inputQuantity - 1;
    setInputQuantity(newQuantity);
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
  }

  const handlerIncrement = () => {
    console.log('+');
    const newQuantity = inputQuantity + 1;
    setInputQuantity(newQuantity);
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
  }
  return (
    <>
      <img className="cart__img"
        src={`${API_URL}${photoUrl}`}
        alt={name} />
      <h4 className="cart__item-title">{name}</h4>
      <div className="cart__counter">
        <button className="cart__counter-btn" onClick={handlerDecrement}>-</button>
        <input className="cart__counter-input" type="number" max="99" min="0"
          value={quantity} onChange={handlerInputChange} />
        <button className="cart__counter-btn" onClick={handlerIncrement}>+</button></div>
      <p className="cart__price">{price * quantity}&nbsp;₽</p>

    </>
  )
}