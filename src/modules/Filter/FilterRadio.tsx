import style from './Filter.module.scss';

interface FilterRadioProps {
  data: {
    value: string;
    title: string;
  };
  handlerType: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

export const FilterRadio: React.FC<FilterRadioProps> = ({ data, handlerType, type }) => {
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
};
