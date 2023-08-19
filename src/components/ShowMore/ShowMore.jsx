import React from 'react';
import './ShowMore.css';

function ShowMore({ onShowMore, isVisible, isDisabled, buttonText }) {
  const buttonClassName = `show-more-button ${isDisabled ? ' show-more-button_disabled' : ''}`;

  const handleButtonClick = () => {
    if (!isDisabled) {
      onShowMore();
    }
  };

  return isVisible && (
    <button
      className={buttonClassName}
      type="button"
      onClick={handleButtonClick}
      disabled={isDisabled}
    >
      {buttonText}
    </button>
  );
};

export default ShowMore;
