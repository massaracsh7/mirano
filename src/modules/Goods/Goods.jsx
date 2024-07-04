import { goodsArray } from "../../goodsArray";
import { Card } from "../Card/Card";
import { Cart } from "../Cart/Cart";
import style from './Goods.module.scss';

export const Goods = () => (
  <section className={style.goods}>
    <div className={`container ${style.goods__container}`}>
      <div className={style.goods__box}>
        <h2 className={style.goods__title}>Цветы</h2>

        <ul className={style.goods__list}>
          {goodsArray.map((item) => (
            <li key={item.id} className={style.goods__item}>
              <Card {...item} />
            </li>
          ))}
        </ul>
      </div>

      <Cart />
    </div>
  </section>
);
