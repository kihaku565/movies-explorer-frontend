import { useState, useCallback } from 'react';
import isEmail from 'validator/es/lib/isEmail';

function useFormValidator() {
  // Состояния для значений формы, ошибок и валидности
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Обработчик изменения ввода и валидации
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;

    // Обновление значений формы
    setValues((prevValues) => ({ ...prevValues, [name]: value }));

    // Проверка валидности электронной почты
    if (name === 'email') {
      const emailIsValid = isEmail(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: emailIsValid
          ? ''
          : 'Введите корректный адрес электронной почты',
      }));
    } else {
      // Обновление ошибок валидации для других полей
      setErrors((prevErrors) => ({ ...prevErrors, [name]: event.target.validationMessage }));
    }

    // Обновление общей валидности формы на основе валидности ближайшей формы
    setIsValid(event.target.closest('form').checkValidity());
  }, []);

  // Сброс значений формы, ошибок и валидности
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  // Возвращение свойств и функций, связанных с формой
  return {
    values,
    errors,
    isValid,
    setIsValid,
    handleInputChange,
    resetForm,
  };
}

export default useFormValidator;
