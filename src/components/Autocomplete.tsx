import React, { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';

import './Autocomplete.scss';

import useSearch from '../service/useSearch';
import { Direction } from '../types/Direction';
import { KeyCode } from '../types/KeyCode';
import { Movie } from '../types/Movie';
import Input from './Input';
import ListBox from './ListBox';

const Autocomplete = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1);
  const [selectedItemId, setSelectedItemId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestionList, setSuggestionList] = useState<Movie[] | null>(null);
  const search = useSearch();

  const setResults = (results: Movie[]) => {
    setSuggestionList(results);
    setFocusedItemIndex(-1);
  };

  useEffect(() => {
    if (searchTerm) {
      search(searchTerm, setResults);
    }
  }, [searchTerm]);

  const selectNewValue = (newSelectedItem: number) => {
    const selectedMovie = suggestionList?.find(movie => movie.id === newSelectedItem);

    if (!selectedMovie) {
      return;
    }

    setSearchTerm(selectedMovie.title);
    setSelectedItemId(newSelectedItem);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputChange = (newValue: string) => {
    if (searchTerm !== newValue) {
      setSearchTerm(newValue);
      setSelectedItemId(0);
    }

    if (newValue !== '') {
      setIsOpen(true);
    } else {
      setSuggestionList(null);
      setIsOpen(false);
    }
  };

  const handleInputMouseDown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  const ensureInView = (element: HTMLElement) => {
    const container = listBoxRef.current!;

    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;

    const elementTop = element.offsetTop;
    const elementBottom = elementTop + element.clientHeight;

    // Check if out of view
    if (elementTop < containerTop) {
      container.scrollTop -= containerTop - elementTop;
    } else if (elementBottom > containerBottom) {
      container.scrollTop += elementBottom - containerBottom;
    }
  };

  const scrollToIndex = (index: number) => {
    const focusedElement = document.getElementById(`movie${index}`);

    if (focusedElement) {
      ensureInView(focusedElement);
    }
  };

  const getNewFocusIndex = (difference: number, direction: Direction): number => {
    if (!suggestionList) {
      return -1;
    }

    if (focusedItemIndex === -1) {
      return 0;
    }

    if (difference === 0) {
      return direction === Direction.Previous ? 0 : suggestionList.length - 1;
    }

    if (direction === Direction.Previous && focusedItemIndex === 0) {
      return suggestionList.length - 1;
    }

    if (direction === Direction.Next && focusedItemIndex === suggestionList.length - 1) {
      return 0;
    }

    if (direction === Direction.Next) {
      return Math.min(focusedItemIndex + difference, suggestionList.length - 1);
    }

    return Math.max(focusedItemIndex + difference, 0);
  };

  const changeHighlightedIndex = (difference: number, direction: Direction) => {
    const newFocusIndex = getNewFocusIndex(difference, direction);
    setFocusedItemIndex(newFocusIndex);
    scrollToIndex(newFocusIndex);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case KeyCode.Home:
        if (isOpen) {
          event.preventDefault();
          changeHighlightedIndex(0, Direction.Previous);
        }
        break;

      case KeyCode.End:
        if (isOpen) {
          event.preventDefault();
          changeHighlightedIndex(0, Direction.Next);
        }
        break;

      case KeyCode.PageUp:
        if (isOpen) {
          event.preventDefault();
          changeHighlightedIndex(-10, Direction.Previous);
        }
        break;

      case KeyCode.PageDown:
        if (isOpen) {
          event.preventDefault();
          changeHighlightedIndex(10, Direction.Next);
        }
        break;

      case KeyCode.ArrowDown:
        if (isOpen) {
          event.preventDefault();
          changeHighlightedIndex(1, Direction.Next);
        }
        break;

      case KeyCode.ArrowUp:
        if (isOpen) {
          event.preventDefault();
          changeHighlightedIndex(-1, Direction.Previous);
        }
        break;

      case KeyCode.Enter:
        if (focusedItemIndex !== -1 && isOpen && suggestionList) {
          const selectedMovie = suggestionList[focusedItemIndex];
          selectNewValue(selectedMovie.id);
          event.preventDefault();
        }
        break;

      case KeyCode.Escape:
        if (isOpen) {
          event.preventDefault();
          event.stopPropagation();
          setIsOpen(false);
        } else if (searchTerm) {
          event.preventDefault();
          event.stopPropagation();
          setSearchTerm('');
        }
        break;

      default:
    }
  };

  return (
    <div className="autocomplete">
      <Input
        ref={inputRef}
        name="search-term"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onMouseDown={handleInputMouseDown}
        onKeyDown={handleKeyDown}
      />
      <ListBox
        ref={listBoxRef}
        isOpen={isOpen}
        items={suggestionList}
        highlighted={searchTerm.trim()}
        focusedItemIndex={focusedItemIndex}
        selectedItemId={selectedItemId}
        onFocusChange={setFocusedItemIndex}
        onItemSelect={selectNewValue}
      />
    </div>
  );
};

export default Autocomplete;
