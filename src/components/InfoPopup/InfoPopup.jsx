import React, { useCallback } from 'react';
import useEscapeKeyHandler from '../../hooks/useEscapeKeyHandler.js';
import './InfoPopup.css';

function InfoPopup({ onClose, isInfoPopup }) {
  const { isOpen, successful, text } = isInfoPopup;
  // Обработчик для предотвращения закрытия попапа при клике на его область
  const handleClickOverlay = useCallback((e) => {
    e.stopPropagation();
  }, []);
  // Обработчик закрытия попапа при клике на кнопку закрытия
  const handleButtonCloseClick = useCallback(() => {
    onClose();
  }, [onClose]);
  // Класс для индикации успешности/неудачи в статусе попапа
  const statusClass = successful
    ? 'info-popup__content_success'
    : 'info-popup__content_fail';
  // Обработка нажатия клавиши "Escape"
  useEscapeKeyHandler(onClose, isOpen);

  return (
    <div
      className={`info-popup ${isOpen
        ? 'info-popup_opened'
        : ''}`}
      onClick={onClose}
    >
      {/* Область попапа с подложкой */}
      <div className="info-popup__overlay" onClick={handleClickOverlay}>
        <div className={`info-popup__content ${statusClass}`}></div>
        <h2 className="info-popup__title">{text}</h2>
        {/* Кнопка закрытия попапа */}
        <button
          type="button"
          className="info-popup__close-button"
          onClick={handleButtonCloseClick}
        ></button>
      </div>
    </div>
  );
}

export default InfoPopup
