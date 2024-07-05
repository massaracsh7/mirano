import { Choices } from '../Сhoices/Choices';
import style from './Filter.module.scss';
import { useState } from 'react';

export const Filter = () => {
  const [openFilter, setOpenFilter] = useState(null);

  const handlerFilter = (filter) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };
  return (
    <section className={style.filter}>
      <h2 className="visually-hidden"></h2>
      <div className="container">
        <form className={style.filter__form}>
          <fieldset className={style.filter__group}>
            <input className={style.filter__radio} type="radio" name="type" defaultValue="bouquets" id="flower" defaultChecked />
            <label className={`${style.filter__label} ${style.filter__label_flower}`} htmlFor="flower">Цветы</label>

            <input className={style.filter__radio} type="radio" name="type" defaultValue="toys" id="toys" />
            <label className={`${style.filter__label} ${style.filter__label_toys}`} htmlFor="toys">Игрушки</label>

            <input className={style.filter__radio} type="radio" name="type" defaultValue="postcards" id="postcard" />
            <label className={`${style.filter__label} ${style.filter__label_postcard}`} htmlFor="postcard">Открытки</label>
          </fieldset>
          <fieldset className={`${style.filter__group} ${style.filter__group_choices}`}>
            <Choices buttonLabel="Цена" isOpen={openFilter === 'price'}
              onToggle={() => handlerFilter('price')}>
              <div className={`${style.choices__box} ${style.filter__choices_box}`}>
                <fieldset className={style.filter__price}>
                  <input className={style.filter__input_price} type="text" name="minPrice" placeholder="от" />
                  <input className={style.filter__input_price} type="text" name="maxPrice" placeholder="до" />
                </fieldset>
              </div>
            </Choices>

            <Choices buttonLabel="Тип товара" className={style.filter__choices_type} isOpen={openFilter === 'type'}
              onToggle={() => handlerFilter('type')}>
              <div className={`${style.choices__box} ${style.filter__choices_box}`}>
                <ul className={style.filter__type_list}>
                  <li className={style.filter__type_item}>
                    <button className={style.filter__type_button} type="button">Монобукеты</button>
                  </li>
                  <li className={style.filter__type_item}>
                    <button className={style.filter__type_button} type="button">Авторские букеты</button>
                  </li>
                  <li className={style.filter__type_item}>
                    <button className={style.filter__type_button} type="button">Цветы в коробке</button>
                  </li>
                  <li className={style.filter__type_item}>
                    <button className={style.filter__type_button} type="button">Цветы в корзине</button>
                  </li>
                  <li className={style.filter__type_item}>
                    <button className={style.filter__type_button} type="button">Букеты из сухоцветов</button>
                  </li>
                </ul>
              </div>
            </Choices>
          </fieldset>
        </form>
      </div>
    </section>
  );
};