import { useDispatch, useSelector } from "react-redux";
import { Card } from "../Card/Card";
import { Cart } from "../Cart/Cart";
import style from './Goods.module.scss';
import { useEffect } from "react";
import { fetchGoods } from "../../redux/goodsSlice";
import { API_URL } from "../../const";
import { Preload } from "../Preload/Preload";


export const Goods = () => {
  const dispatch = useDispatch();
  const {
    items: goods,
    status: goodsStatus,
    error,
    type,
    priceRange: { minPrice, maxPrice },
    search,
    category,
  } = useSelector((state) => state.goods);


  useEffect(() => {
    if (goodsStatus === 'idle') {
      const queryParams = {};
      if (search) { queryParams.search = search;}
      else {
        if (type) queryParams.type = type;
        if (minPrice) queryParams.minPrice = parseInt(minPrice);
        if (maxPrice) queryParams.maxPrice = parseInt(maxPrice);
        if (category) queryParams.category = category;
      }
      dispatch(fetchGoods(queryParams));
    }
  }, [dispatch, type, goodsStatus, minPrice, maxPrice, search, category]);

  const calculateDeliveryTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const deliveryHour = currentHour < 18 ? currentHour + 3 : 9;
    const deliveryTime = `${deliveryHour}:00`;
    if (currentHour >= 18) {
      return `Завтра ${deliveryTime}`;
    } else {
      return `Сегодня ${deliveryTime}`;
    }
  };


  let content = null;

  if (goodsStatus === 'loading') {
    content = <Preload />;
  }

  if (goodsStatus === 'success') {
    content = goods.length === 0 ? 'По вашему запросу ничего не найдено' : (
      <ul className={style.goods__list}>
        {goods.map((item) => (
          <li key={item.id} className={style.goods__item}>
            <Card
              className="goods__card"
              id={item.id}
              img={`${API_URL}${item.photoUrl}`}
              title={item.name}
              dateDelivery={calculateDeliveryTime()}
              price={item.price}
            />
          </li>
        ))}
      </ul>)
  }

  if (goodsStatus === 'error') {
    content = <p>{error}</p>
  }

  const getTitle = () => {
    switch (type) {
      case 'bouquets':
        return 'Цветы';
      case 'toys':
        return 'Игрушки';
      case 'postcards':
        return 'Открытки';
      default:
        return `Товары ${search}`;
    }
  };

  return (
    <section className={style.goods}>
      <div className={`container ${style.goods__container}`}>
        <div className={style.goods__box}>
          <h2 className={style.goods__title}>{getTitle()}</h2>
          {content}
        </div>

        <Cart />
      </div>
    </section>
  );
};