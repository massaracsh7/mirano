import { useDispatch, useSelector } from "react-redux";
import { Card } from "../Card/Card";
import { Cart } from "../Cart/Cart";
import style from './Goods.module.scss';
import { useEffect } from "react";
import { fetchGoods } from "../../redux/goodsSlice";
import { API_URL } from "../../const";

export const Goods = () => {
  const dispatch = useDispatch();
  const {
    items: goods,
    status: goodsStatus,
    error,
    type,
    priceRange: { minPrice, maxPrice },
  } = useSelector((state) => state.goods);


  useEffect(() => {
    if (goodsStatus === 'idle') {
      const queryParams = {};
      if (type) queryParams.type = type;
      if (minPrice) queryParams.minPrice = parseInt(minPrice);
      if (maxPrice) queryParams.maxPrice = parseInt(maxPrice);
      dispatch(fetchGoods(queryParams));
    }
  }, [dispatch, type, goodsStatus, minPrice, maxPrice]);

  let content = null;

  if (goodsStatus === 'loading') {
    content = <p>Loading...</p>
  }

  if (goodsStatus === 'success') {
    content = (
      <ul className={style.goods__list}>
        {goods.map((item) => (
          <li key={item.id} className={style.goods__item}>
            <Card
              className="goods__card"
              id={item.id}
              img={`${API_URL}${item.photoUrl}`}
              title={item.name}
              dateDelivery="14.00"
              price={item.price}
            />
          </li>
        ))}
      </ul>)
  }

  if (goodsStatus === 'error') {
    content = <p>{error}</p>
  }


  return (
    <section className={style.goods}>
      <div className={`container ${style.goods__container}`}>
        <div className={style.goods__box}>
          <h2 className={style.goods__title}>Цветы</h2>
          {content}
        </div>

        <Cart />
      </div>
    </section>
  );
};