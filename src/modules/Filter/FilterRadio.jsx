import style from './Filter.module.scss';

export const FilterRadio = ({ data, handlerType, type }) => {
  return (
    <>
      <input
        className={style.filter__radio}
        type="radio"
        name="type"
        value={data.value}
        id={data.value}
        onChange={handlerType}
        checked={type === data.value}
      />
      <label
        className={`${style.filter__label} ${style[`filter__label_${data.value}`]}`}
        htmlFor={data.value}
      >
        {data.title}
      </label>
    </>
  );
}
