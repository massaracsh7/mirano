import style from './Choices.module.scss';

export const Choices = ({ children, buttonLabel, className, isOpen, onToggle }) => {

  return (
    <div className={`${style.filter__choices} ${style.choices} ${className}`}>
      <button className={`${style.choices__btn} ${isOpen ? style.openArrow : ''}`} type="button" onClick={onToggle}>
        {buttonLabel}
      </button>
      {isOpen && children}
    </div>
  );
};