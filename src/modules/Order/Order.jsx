import { useSelector, useDispatch } from 'react-redux';
import {
  toggleModal,
  dateOrderData,
  submitOrder
} from '../../redux/modalSlice';
import styles from './Order.module.scss';

export const Order = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const orderId = useSelector((state) => state.modal.orderId);
  const formData = useSelector((state) => state.modal.data);

  if (!isModalOpen) return null;

  const handlerModalClose = () => {
    dispatch(toggleModal());
  };

  const handlerBackClick = (event) => {
    if (event.target === event.currentTarget) {
      handlerModalClose();
    }
  };

  const handlerChange = (e) => {
    const { name, value } = e.target;
    dispatch(dateOrderData({ field: name, value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(submitOrder());
  };

  if (orderId) {
    return (
      <div className={styles.order} onClick={handlerBackClick}>
        <div className={styles.order__wrapper}>
          <h2 className={styles.order__title}>Заказ оформлен!</h2>
          <p className={styles.order__id}>Ваш номер заказа: {orderId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.order} onClick={handlerBackClick}>
      <div className={styles.order__wrapper}>
        <h2 className={styles.order__title}>Оформить заказ</h2>
        <form className={styles.order__form} id="order" onSubmit={handleSubmit}>
          <fieldset className={styles.order__fieldset}>
            <legend className={styles.order__legend}>Данные заказчика</legend>
            <div className={styles.order__inputGroup}>
              <input
                className={styles.order__input}
                type="text"
                name="buyerName"
                value={formData.buyerName}
                onChange={handlerChange}
                placeholder="Имя"
              />
              <input
                className={styles.order__input}
                type="text"
                name="buyerPhone"
                value={formData.buyerPhone}
                onChange={handlerChange}
                placeholder="Телефон"
              />
            </div>
          </fieldset>
          <fieldset className={styles.order__fieldset}>
            <legend className={styles.order__legend}>Данные получателя</legend>
            <div className={styles.order__inputGroup}>
              <input
                className={styles.order__input}
                type="text"
                name="recipientName"
                value={formData.recipientName}
                onChange={handlerChange}
                placeholder="Имя"
              />
              <input
                className={styles.order__input}
                type="text"
                name="recipientPhone"
                value={formData.recipientPhone}
                onChange={handlerChange}
                placeholder="Телефон"
              />
            </div>
          </fieldset>
          <fieldset className={styles.order__fieldset}>
            <legend className={styles.order__legend}>Адрес</legend>
            <div className={styles.order__inputGroup}>
              <input
                className={styles.order__input}
                type="text"
                name="street"
                value={formData.street}
                onChange={handlerChange}
                placeholder="Улица"
              />
              <input
                className={`${styles.order__input} ${styles.order__input_min}`}
                type="text"
                name="house"
                value={formData.house}
                onChange={handlerChange}
                placeholder="Дом"
              />
              <input
                className={`${styles.order__input} ${styles.order__input_min}`}
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handlerChange}
                placeholder="Квартира"
              />
            </div>
          </fieldset>
          <fieldset className={styles.order__fieldset}>
            <div className={styles.order__payment}>
              <label className={styles.order__label_radio}>
                <input
                  className={styles.order__radio}
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={formData.paymentMethod === 'online'}
                  onChange={handlerChange}
                />
                Оплата онлайн
              </label>
            </div>
            <div className={styles.order__delivery}>
              <label htmlFor="delivery">Доставка {formData.deliveryDate}</label>
              <input type="hidden" name="delivery-date" value={formData.deliveryDate} />
              <div className={styles.order__select_wrapper}>
                <select
                  className={styles.order__select}
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handlerChange}
                  id="delivery"
                >
                  <option value="9-12">с 9:00 до 12:00</option>
                  <option value="12-15">с 12:00 до 15:00</option>
                  <option value="15-18">с 15:00 до 18:00</option>
                  <option value="18-21">с 18:00 до 21:00</option>
                </select>
              </div>
            </div>
          </fieldset>
        </form>
        <div className={styles.order__footer}>
          <p className={styles.order__total}>92100&nbsp;₽</p>
          <button className={styles.order__button} type="submit" form="order">Заказать</button>
        </div>
      </div>
      <button className={styles.order__close} type="button" onClick={handlerModalClose}>×</button>
    </div>
  );
};
