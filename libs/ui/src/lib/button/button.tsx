import React, { FC } from 'react';

import './button.scss';

/* eslint-disable-next-line */
interface Props {
  color?: ButtonColor;
  onClick: () => void;
  label?: string;
}

export const Button: FC<Props> = ({
  color = 'primary',
  onClick,
  label,
  children
}) => {
  return (
    <button onClick={onClick} className={color}>
      {label || children}
    </button>
  );
};

export default Button;

export type ButtonColor = 'primary' | 'secondary' | 'tertiary';
