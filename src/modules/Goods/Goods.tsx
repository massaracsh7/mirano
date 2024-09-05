import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Card } from "../Card/Card";
import style from './Goods.module.scss';
import { useEffect } from "react";
import { fetchGoods } from "../../redux/goodsSlice";
import { API_URL } from "../../const";
import { calculateDeliveryTime } from "../../utils";
import { Product } from "../../types";
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader";

export const Goods: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: goods,
    status: goodsStatus,
    error,
    type,
    priceRange: { minPrice, maxPrice },
    search,
    category,
  } = useSelector((state: RootState) => state.goods);

  useEffect(() => {
    if (goodsStatus === 'idle') {
      const queryParams: Record<string, string> = {};
      if (search) {
        queryParams.search = search;
      } else {
        if (type) queryParams.type = type;
        if (minPrice) queryParams.minPrice = minPrice;
        if (maxPrice) queryParams.maxPrice = maxPrice;
        if (category) queryParams.category = category;
      }
      dispatch(fetchGoods(queryParams));
    }
  }, [dispatch, type, goodsStatus, minPrice, maxPrice, search, category]);

  let content = null;

  if (goodsStatus === 'loading') {
    content = (
      <ul className={style.goods__list}>
        <SkeletonLoader count={6} />
      </ul>
    );
  }

  if (goodsStatus === 'success') {
    content = goods.length === 0
      ? 'По вашему запросу ничего не найдено'
      : (
        <ul className={style.goods__list}>
          {goods.map((item: Product) => (
            <li key={item.id} className={style.goods__item}>
              <Card
                className={style.goods__card}
                id={item.id}
                img={`${API_URL}${item.photoUrl}`}
                title={item.name}
                dateDelivery={calculateDeliveryTime()}
                price={item.price}
              />
            </li>
          ))}
        </ul>
      );
  }

  if (goodsStatus === 'failed') {
    content = <p>{error}</p>;
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
      </div>
    </section>
  );
};
