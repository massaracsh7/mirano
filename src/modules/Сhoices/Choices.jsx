import style from './Choices.module.scss';

export const Choices = ({ children, buttonLabel, className }) => {
  //const [isOpen, setIsOpen] = useState(false);

  //const toggleOpen = () => {
  //  setIsOpen(!isOpen);
  //};

  return (
    <div className={`${style.filter__choices} ${style.choices} ${className}`}>
      <button className={`${style.filter__select} ${style.choices__btn}`} type="button">
        {buttonLabel}
      </button>
        {children}
    </div>
  );
};