import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import './Input.scss';

import CloseIcon from './CloseIcon';

interface InputProps {
  name: string;
  value: string;
  onFocus: () => void;
  onMouseDown: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChange: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, name, onChange, onFocus, onMouseDown, onKeyDown }: InputProps, inputRef) => {
    const [isClearable, setIsClearable] = useState(!!value);

    const handleChange = (newValue: string) => {
      onChange(newValue);

      const hasValue = newValue !== '';

      if (hasValue !== isClearable) {
        setIsClearable(hasValue);
      }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (value === newValue) {
        return;
      }

      handleChange(newValue);
    };

    const handleClear = () => {
      handleChange('');
    };

    return (
      <div className="input-wrapper">
        <input
          ref={inputRef}
          name={name}
          value={value}
          onChange={handleInputChange}
          onFocus={onFocus}
          onMouseDown={onMouseDown}
          onKeyDown={onKeyDown}
          className="input"
          type="text"
          autoCapitalize="none"
          autoComplete="off"
          spellCheck="false"
        />
        {isClearable ? (
          <CloseIcon
            className="input__clear-icon"
            onClick={handleClear}
          />
        ) : null}
      </div>
    );
  }
);

export default Input;
