import styles from './Cart.module.scss';
import { API_URL } from "../../const";
import { useDispatch } from 'react-redux';
import { useState, ChangeEvent } from 'react';
import { addItemToCart } from '../../redux/cartSlice';
import { debounce } from '../../utils';
import { AppDispatch } from '../../redux/store';

interface CartItemProps {
  id: string;
  photoUrl: string;
  name: string;
  price: number;
  quantity: number;
}

export const CartItem: React.FC<CartItemProps> = ({ id, photoUrl, name, price, quantity }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputQuantity, setInputQuantity] = useState<number>(quantity);

  const debounceInputChange = debounce((newQuantity: number) => {
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
  }, 500);

  const handlerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    setInputQuantity(newQuantity);
    debounceInputChange(newQuantity);
  };

  const handlerDecrement = () => {
    const newQuantity = inputQuantity - 1;
    setInputQuantity(newQuantity);
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
  };

  const handlerIncrement = () => {
    const newQuantity = inputQuantity + 1;
    setInputQuantity(newQuantity);
    dispatch(addItemToCart({ productId: id, quantity: newQuantity }));
  };

  return (
    <>
      <img
        className={styles.cart__img}
        src={`${API_URL}${photoUrl}`}
        alt={name}
      />
      <h4 className={styles.cart__itemtitle}>{name}</h4>
      <div className={styles.cart__counter}>
        <button className={styles.cart__counterbtn} onClick={handlerDecrement}>-</button>
        <input
          className={styles.cart__counterinput}
          type="number"
          max="99"
          min="0"
          value={inputQuantity}
          onChange={handlerInputChange}
        />
        <button className={styles.cart__counterbtn} onClick={handlerIncrement}>+</button>
      </div>
      <p className={styles.cart__price}>{price * inputQuantity}&nbsp;₽</p>
    </>
  );
};
