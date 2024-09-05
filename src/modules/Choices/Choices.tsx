import style from './Choices.module.scss';
import { ReactNode } from 'react';

interface ChoicesProps {
  children: ReactNode;
  buttonLabel: string;
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const Choices: React.FC<ChoicesProps> = ({ children, buttonLabel, className = '', isOpen, onToggle }) => {
  return (
    <div className={`${style.filter__choices} ${style.choices} ${className}`}>
      <button
        className={`${style.choices__btn} ${isOpen ? style.openArrow : ''}`}
        type="button"
        onClick={onToggle}
      >
        {buttonLabel}
      </button>
      {isOpen && children}
    </div>
  );
};
