
import { ChangeEventHandler, useState } from 'react';

type Tvalues = {
  [name: string]: string;
}

export function useForm(inputValues: Tvalues) {
    const [values, setValues] = useState(inputValues);
  
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
  }