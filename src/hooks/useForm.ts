
import { ChangeEventHandler } from 'react';
import { useState } from 'react';

type Tvalues = {
  [name: string]: string;
}

export function useForm(inputValues: Tvalues) {
    const [values, setValues] = useState(inputValues);
  
    const handleChange = (event: ChangeEventHandler) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
  }