import React from 'react';

interface HighlightingProps {
  text: string;
  highlighted: string;
}

const Highlighting: React.FC<HighlightingProps> = ({ text, highlighted }) => {
  if (!highlighted.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${highlighted})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts
        .filter(String)
        .map((part, index) =>
          regex.test(part) ? <mark key={index}>{part}</mark> : <span key={index}>{part}</span>
        )}
    </>
  );
};

export default Highlighting;
