import { useState } from "react";

const useFormValidation = () => {
    const [errors, setErrors] = useState([]);
    const [alert, setAlert] = useState({ alertToggle: false, message: "" });

    const validateFields = (fields) => {
        const newErrors = [];

        fields.forEach(({ fieldKey, fieldValue, fieldType, length, error }) => {
            let errorMsg = "";

            if (!fieldValue) {
                errorMsg = `${fieldKey} is required`;
            } else {
                switch (fieldType) {
                    case "text":
                        if (fieldValue.length > length) {
                            errorMsg = error;
                        }
                        break;
                    case "number":
                        if (isNaN(fieldValue)) {
                            errorMsg = `${fieldKey} should be a number`;
                        }
                        break;
                    // Add more case statements for other types as needed
                    default:
                        break;
                }
            }

            if (errorMsg) {
                newErrors.push({ fieldKey, errorMsg });
            }
        });

        setErrors(newErrors);

        if (newErrors.length > 0) {
            setAlert({
                alertToggle: true,
                message: "Please correct the highlighted errors.",
            });
        }

        return newErrors.length === 0;
    };

    return { errors, alert, setAlert, validateFields };
};

export default useFormValidation;
