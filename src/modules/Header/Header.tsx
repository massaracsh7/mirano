import { useEffect, useRef, useState } from 'react';
import { toggleCart } from '../../redux/cartSlice';
import { changeSearch, changeType } from '../../redux/goodsSlice';
import style from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from '../../utils';
import { AppDispatch, RootState } from '../../redux/store';

interface HeaderProps {
  goodsRef: React.RefObject<HTMLDivElement>;
  cartRef: React.RefObject<HTMLDivElement>;
}

export const Header: React.FC<HeaderProps> = ({ goodsRef, cartRef }) => {
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { type, items: goodsItems } = useSelector((state: RootState) => state.goods);
  const [search, setSearch] = useState < string > ('');
  
  const dispatch = useDispatch<AppDispatch>();

  const handlerCartToggle = () => {
    dispatch(toggleCart());
    if (cartRef.current) {
      cartRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    debouncedSearch(event.target.value);
  };

  const debouncedSearch = useRef(
    debounce((value: string) => {
      if (value.trim() !== '') {
        dispatch(changeSearch(value));
        dispatch(changeType(''));
      } else {
        dispatch(changeSearch(''));
      }
    }, 500)
  ).current;

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!type && goodsRef.current) {
      goodsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [goodsItems, goodsRef, type]);

  useEffect(() => {
    setSearch('');
  }, [type, goodsItems]);

  return (
    <header className={style.header}>
      <div className={`container ${style.header__container}`}>
        <form className={style.header__form} onSubmit={handleSearchSubmit}>
          <input
            className={style.header__input}
            type="search"
            name="search"
            placeholder="Букет из роз"
            value={search}
            onChange={handleSearchChange}
          />
          <button className={style.header__searchbutton} aria-label="начать поиск">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.3333 4.16663C13.3333 4.78496 13.9442 5.70829 14.5625 6.48329C15.3575 7.48329 16.3075 8.35579 17.3967 9.02163C18.2133 9.52079 19.2033 9.99996 20 9.99996M20 9.99996C19.2033 9.99996 18.2125 10.4791 17.3967 10.9783C16.3075 11.645 15.3575 12.5175 14.5625 13.5158C13.9442 14.2916 13.3333 15.2166 13.3333 15.8333M20 9.99996H4.76837e-07"
                stroke="white" />
            </svg>
          </button>
        </form>

        <img className={style.header__logo} src="/img/logo.svg" alt="Логотип Mirano Flower Boutique" />

        <button className={style.header__cartButton} onClick={handlerCartToggle}>{cartItems.length}</button>
      </div>
    </header>
  );
};
