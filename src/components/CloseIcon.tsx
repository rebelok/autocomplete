import React from 'react';

interface CloseIconProps {
  onClick: () => void;
  className: string;
}

const CloseIcon: React.FC<CloseIconProps> = ({ onClick, className }) => (
  <svg
    className={className}
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    onClick={onClick}
    width="16"
    height="16"
    stroke="currentColor"
    fill="currentColor"
  >
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

export default CloseIcon;
