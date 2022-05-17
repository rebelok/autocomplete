import cx from 'classnames';
import React, { KeyboardEvent, MouseEvent, useCallback } from 'react';

import './ListBox.scss';

import { Movie } from '../types/Movie';
import Highlighting from './Highlighting';

interface ListBoxProps {
  items: Movie[] | null;
  highlighted: string;
  focusedItemIndex: number;
  selectedItemId: number;
  isOpen: boolean;
  onFocusChange: (newFocusedItem: number) => void;
  onItemSelect: (newSelectedItem: number) => void;
}

const ListBox = React.forwardRef<HTMLUListElement, ListBoxProps>(
  (
    { items, highlighted, focusedItemIndex, isOpen, selectedItemId, onFocusChange, onItemSelect },
    ref
  ) => {
    const handleOptionMouseOver = useCallback(
      (index: number) => () => {
        onFocusChange(index);
      },
      [onFocusChange]
    );

    const handleOptionClick = useCallback(
      (event: MouseEvent<HTMLLIElement>) => {
        const selectedItem = Number(event.currentTarget.getAttribute('data-id'));

        if (selectedItem) {
          onItemSelect(selectedItem);
        }
      },
      [onItemSelect]
    );

    const handleKeyPress = useCallback(
      (event: KeyboardEvent<HTMLLIElement>) => {
        const selectedItem = Number(event.currentTarget.getAttribute('data-id'));
        if (event.key === 'Enter' && selectedItem) {
          onItemSelect(selectedItem);
        }
      },
      [onItemSelect]
    );

    if (!isOpen || !items) {
      return null;
    }

    if (!items.length) {
      return (
        <ul
          className={cx('list-box')}
          ref={ref}
          role="listbox"
        >
          <li
            className="list-box__item list-box__item--empty"
            tabIndex={-1}
            role="option"
            aria-selected={false}
          >
            No suggestions
          </li>
        </ul>
      );
    }

    return (
      <ul
        className={cx('list-box')}
        ref={ref}
        role="listbox"
      >
        {items.map(({ id, title, release_date: releaseDate }, index) => (
          <li
            key={id}
            id={`movie${index}`}
            className={cx('list-box__item', {
              'list-box__item--hovered': focusedItemIndex === index,
              'list-box__item--selected': selectedItemId === id,
            })}
            onMouseOver={handleOptionMouseOver(index)}
            onFocus={handleOptionMouseOver(index)}
            onClick={handleOptionClick}
            onKeyPress={handleKeyPress}
            data-id={id}
            tabIndex={-1}
            role="option"
            aria-selected={selectedItemId === id}
          >
            <Highlighting
              highlighted={highlighted}
              text={title}
            />{' '}
            ({releaseDate || 'Unknown'})
          </li>
        ))}
      </ul>
    );
  }
);

export default ListBox;
