import { useState, useCallback } from 'react';

function useFormValidator() {
    // State for form values, errors, and validity
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    // Handle input change and validation
    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;

        // Update form values
        setValues((prevValues) => ({ ...prevValues, [name]: value }));

        // Update validation errors
        setErrors((prevErrors) => ({ ...prevErrors, [name]: event.target.validationMessage }));

        // Update overall form validity based on the nearest form's validity
        setIsValid(event.target.closest('form').checkValidity());
    }, []);

    // Reset form values, errors, and validity
    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        []
    );

    // Return form-related properties and functions
    return {
        values,
        errors,
        isValid,
        handleInputChange,
        resetForm,
    };
}

export default useFormValidator;
