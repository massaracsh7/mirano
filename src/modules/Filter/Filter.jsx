import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePriceRange, changeSearch, changeType } from '../../redux/goodsSlice';
import style from './Filter.module.scss';
import { debounce } from '../../utils';
import { Choices } from '../Choices/Choices';
import { FilterRadio } from './FilterRadio';

const filterTypes = [
  { value: 'bouquets', title: 'Цветы' },
  { value: 'toys', title: 'Игрушки' },
  { value: 'postcards', title: 'Открытки' },
]

export const Filter = () => {
  const { type } = useSelector((state) => state.goods);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [openFilter, setOpenFilter] = useState(null);

  const dispatch = useDispatch();

  const handlerFilter = (filter) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const handlerType = (event) => {
    const type = event.target.value;
    dispatch(changeType(type));
    setMinPrice('');
    setMaxPrice('');
    dispatch(changePriceRange({ minPrice: '', maxPrice: '' }));
    dispatch(changeSearch(''));
    setOpenFilter(null);
  };

  const debouncedChangePriceRange = useRef(
    debounce((updatedPriceRange) => {
      dispatch(changePriceRange(updatedPriceRange));
    }, 500)
  ).current;

  const handleMinPriceChange = (event) => {
    const newMinPrice = event.target.value;
    setMinPrice(newMinPrice);
    debouncedChangePriceRange({ minPrice: newMinPrice, maxPrice });
  };

  const handleMaxPriceChange = (event) => {
    const newMaxPrice = event.target.value;
    setMaxPrice(newMaxPrice);
    debouncedChangePriceRange({ minPrice, maxPrice: newMaxPrice });
  };

  useEffect(() => {
    if (!type) {
      setOpenFilter(null);
    }
  }, [type])

  return (
    <section className={style.filter}>
      <h2 className="visually-hidden">Фильтр</h2>
      <div className="container">
        <form className={style.filter__form}>
          <fieldset className={style.filter__group}>
            {filterTypes.map((item) => (
              <FilterRadio key={item.value} handlerType={handlerType} data={item} type={type}/>
            ))}
          </fieldset>

          <fieldset className={`${style.filter__group} ${style.filter__group_choices}`}>
            <Choices
              buttonLabel="Цена"
              isOpen={openFilter === 'price'}
              onToggle={() => handlerFilter('price')}
            >
              <div className={`${style.choices__box} ${style.filter__choices_box}`}>
                <fieldset className={style.filter__price}>
                  <input
                    className={style.filter__input_price}
                    type="text"
                    name="minPrice"
                    placeholder="от"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                  />
                  <input
                    className={style.filter__input_price}
                    type="text"
                    name="maxPrice"
                    placeholder="до"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                  />
                </fieldset>
              </div>
            </Choices>

            <Choices
              buttonLabel="Тип товара"
              className={style.filter__choices_type}
              isOpen={openFilter === 'type'}
              onToggle={() => handlerFilter('type')}
            >
              <div className={`${style.choices__box} ${style.filter__choices_box}`}>
                <ul className={style.filter__type_list}>
                  <li className={style.filter__type_item}>
                    <button className={style.filter__type_button} type="button">
                      Монобукеты
                    </button>
                  </li>
                  <li className={style.filter__type_item}>
                    <button className={style.filter__type_button} type="button">
                      Авторские букеты
                    </button>
                  </li>
                  <li className={style.filter__type_item}>
                    <button className={style.filter__type_button} type="button">
                      Цветы в коробке
                    </button>
                  </li>
                  <li className={style.filter__type_item}>
                    <button className={style.filter__type_button} type="button">
                      Цветы в корзине
                    </button>
                  </li>
                  <li className={style.filter__type_item}>
                    <button className={style.filter__type_button} type="button">
                      Букеты из сухоцветов
                    </button>
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