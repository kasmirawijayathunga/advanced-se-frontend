'use client'

import { SelectChangeEvent } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { ChangeEvent, useEffect, useState } from 'react'
import { z } from 'zod';

// Define an interface for the object structure
interface InputObject {
  name: string;
  value: unknown;
  errormsg?: string;
  schema?: z.ZodType<any>;
}
interface InputTypes {
  [key: string]: any;
}

function useInputs(inputTemplate: InputObject[]) {
  const InitializeInputs = () => {

    // Create the object with specific types based on the inputTemplate
    const constructedObject: InputTypes = {};

    inputTemplate.forEach(({ name, value }) => {
      constructedObject[name] = value ?? '';
    });

    return constructedObject;
  };

  const [inputs, setInputs] = useState<InputTypes>(InitializeInputs());

  useEffect(()=>{
    // InitializeInputs().then(()=>setInitialized(true));
  },[])

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handleSelect = (e: SelectChangeEvent<unknown>) => {
    setInputs((prev) => ({ ...prev,
      [e.target.name as string]: e.target.value as string | number
    }));
  }

  const handleManualInput = (m_inputs:{}) => {
    setInputs((prev) => ({ ...prev,
      ...m_inputs
    }));
  };

  const validateInputs = (inputs: InputTypes, inputTemplate: InputObject[]) => {
    try {
      inputTemplate.forEach(({ name, schema }) => {
        if(schema !== undefined && schema !== null) {
          schema.parse(inputs[name]);
        }
      });
      return true;
    } catch (err:{ issues: {}[] } | any) {
      err?.issues?.forEach((item:{ message: string })=>enqueueSnackbar(item.message, { variant: 'warning' }));
      return false;
    }

  };

  return [
    inputs,
    { handleInput, handleSelect, handleManualInput, validateInputs }
  ] as const;
}

export default useInputs