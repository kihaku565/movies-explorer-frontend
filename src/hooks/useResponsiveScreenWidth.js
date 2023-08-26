import { useEffect, useCallback, useState } from 'react';

function useResponsiveScreenWidth() {
  // Функция для получения текущей ширины окна
  const getWindowWidth = useCallback(() => window.innerWidth, []);
  // Состояние для хранения ширины экрана
  const [screenWidth, setScreenWidth] = useState(getWindowWidth);

  // Callback для обработки изменения ширины экрана
  const handleScreenWidthChange = useCallback(() => {
    setScreenWidth(getWindowWidth());
  }, [getWindowWidth]);

  useEffect(() => {
    let resizeTimer;

    // Callback-функция для обработки события изменения размера окна
    const handleResizeEvent = () => {
      // Если resizeTimer не установлен, устанавливаем его и выполняем коллбэк через 1 секунду
      resizeTimer = resizeTimer
        ? resizeTimer
        : setTimeout(() => {
          resizeTimer = null;
          handleScreenWidthChange();
        }, 1000); // 1 кадр в секунду
    };

    // Добавляем обработчик события изменения размера окна
    window.addEventListener('resize', handleResizeEvent);

    // Удаляем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResizeEvent);
    };
  }, [handleScreenWidthChange]);

  // Возвращаем текущую ширину экрана
  return screenWidth;
}

export default useResponsiveScreenWidth;
