import { Filter } from './modules/Filter/Filter';
import { Footer } from './modules/Footer/Footer';
import { Goods } from './modules/Goods/Goods';
import { Header } from './modules/Header/Header';
import { Hero } from './modules/Hero/Hero';

export function App() {

  return (
    <>

      <Header />
      <main>
        <Hero />
        <Filter />
        <Goods />

        <section className="subscribe">
          <div className="container">
            <h2 className="subscribe__title">Подпишись на&nbsp;рассылку</h2>

            <form className="subscribe__form" action="#">
              <input className="subscribe__input" type="email" name="email"
                placeholder="E-mail" />

              <button className="subscribe__button"
                aria-label="подписаться на рассылку">
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0.166687 6.66667C0.78502 6.66667 1.70835 6.05583 2.48335 5.4375C3.48335 4.6425 4.35585 3.6925 5.02169 2.60333C5.52085 1.78667 6.00002 0.796667 6.00002 0M6.00002 0C6.00002 0.796667 6.47919 1.7875 6.97835 2.60333C7.64502 3.6925 8.51752 4.6425 9.51585 5.4375C10.2917 6.05583 11.2167 6.66667 11.8334 6.66667M6.00002 0V20"
                    stroke="white" />
                </svg>
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />

      <div className="order" style={{ display: 'none' }}>
        <div className="order__wrapper">
          <h2 className="order__title">Оформить заказ</h2>
          <form className="order__form" id="order">
            <fieldset className="order__fieldset">
              <legend className="order__legend">Данные заказчика</legend>
              <div className="order__input-group"><input className="order__input"
                type="text" name="name-buyer" placeholder="Имя" /><input
                  className="order__input" type="text" name="phone-buyer"
                  placeholder="Телефон" /></div>
            </fieldset>
            <fieldset className="order__fieldset">
              <legend className="order__legend">Данные получателя</legend>
              <div className="order__input-group"><input className="order__input"
                type="text" name="name-recipient" placeholder="Имя" /><input
                  className="order__input" type="text" name="phone-recipient"
                  placeholder="Телефон" /></div>
            </fieldset>
            <fieldset className="order__fieldset">
              <legend className="order__legend">Адрес</legend>
              <div className="order__input-group"><input className="order__input"
                type="text" name="street" placeholder="Улица" /><input
                  className="order__input order__input_min" type="text" name="house"
                  placeholder="Дом" /><input className="order__input order__input_min"
                    type="text" name="apartment" placeholder="Квартира" /></div>
            </fieldset>
            <fieldset className="order__fieldset">
              <div className="order__payment"><label className="order__label-radio"><input
                className="order__radio" type="radio" name="payment-online"
                value="true" defaultChecked="true" />Оплата онлайн</label></div>
              <div className="order__delivery"><label htmlFor="delivery">Доставка
                01.07</label><input type="hidden" name="delivery-date"
                  value="01.07" />
                <div className="order__select-wrapper"><select className="order__select"
                  name="delivery-time" id="delivery">
                  <option value="9-12">с 9:00 до 12:00</option>
                  <option value="12-15">с 12:00 до 15:00</option>
                  <option value="15-18">с 15:00 до 18:00</option>
                  <option value="18-21">с 18:00 до 21:00</option>
                </select></div>
              </div>
            </fieldset>
          </form>
          <div className="order__footer">
            <p className="order__total">92100&nbsp;₽</p><button className="order__button"
              type="submit" form="order">Заказать</button>
          </div>
        </div>
        <button className="order__close" type="button">×</button>
      </div>

      <div className="order" style={{ display: 'none' }}>
        <div className="order__wrapper">
          <h2 className="order__title">Заказ оформлен!</h2>
          <p className="order__id">Ваш номер заказа:
            971f365a-caa1-4cdb-9446-bad2eff047e1</p>
        </div>
      </div>

    </>
  )
}

export default App
