import './choices.scss'
import './filter.scss'

export const Choices = ({ children, buttonLabel, className }) => {
  return (
    <div className={`filter__choices choices ${className} `}>
      <button className="filter__select choices__btn" type="button">
        {buttonLabel}
    </button>
      <div className="choices__box filter__choices-box">{ children }</div>
  </div>  
  );
};