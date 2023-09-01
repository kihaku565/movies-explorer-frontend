import { useEffect } from 'react';

function useEscapeKeyHandler(callback, isEscapeHandlingEnabled) {
  // Обработчик нажатия клавиши Esc
  const handleEscapeKeyPress = (event) => {
    if (event.key === 'Escape') {
      callback();
    }
  };

  useEffect(() => {
    // Добавляем или удаляем обработчик в зависимости от значения isEscapeHandlingEnabled
    isEscapeHandlingEnabled
      ? document.addEventListener('keyup', handleEscapeKeyPress)
      : document.removeEventListener('keyup', handleEscapeKeyPress);

    // Удаляем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener('keyup', handleEscapeKeyPress);
    };
  }, [isEscapeHandlingEnabled]);
}

export default useEscapeKeyHandler;
