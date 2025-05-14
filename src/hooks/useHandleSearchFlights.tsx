import { useState, useCallback, FormEvent } from 'react';

import { FormData } from '@/types/flight';

const initialData = {
  origin: '',
  destination: '',
  departureDate: '',
};

interface FormErrors {
  [key: string]: boolean;
}
export const useHandleSearchFlights = (
  saveFormData: (formData: FormData) => void
) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setError] = useState<FormErrors>({});

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      let newErrors = errors;
      for (let key of Object.keys(formData)) {
        newErrors = { ...newErrors, [key]: !formData[key as keyof FormData] };
      }

      setError(newErrors);

      if (
        !(newErrors.origin || newErrors.destination || newErrors.departureDate)
      ) {
        saveFormData(formData as FormData);
      }
    },
    [formData, saveFormData]
  );

  const handleInputChange = useCallback(
    (value: string, name: keyof FormData) => {
      setError({ ...errors, [name]: false });
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleInputClear = useCallback(() => {
    setFormData(initialData);
    saveFormData(formData as FormData);
  }, []);

  return {
    handleInputChange,
    handleSubmit,
    handleInputClear,
    formData,
    errors,
  };
};
